// ---------- Persistent data & basic state ----------

const STORAGE_KEY = "imposter_word_game_v1";

function loadPersistent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { players: {} };
    const data = JSON.parse(raw);
    if (!data.players) data.players = {};
    return data;
  } catch (e) {
    console.error("Failed to load storage", e);
    return { players: {} };
  }
}

function savePersistent() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(persistent));
}

const persistent = loadPersistent();

const state = {
  screen: "splash",            // splash | setupPlayers | config | reveal | clueRound | voting | roundResult | impDeclare | packSelection | leaderboard | options | gameOver
  playersInGame: [],           // [{ name }]
  config: {
    totalRounds: 3,
    imposterClues: 1
  },
  selectedPackId: null,        // id from WORD_PACKS
  game: {
    currentRound: 1,
    subRound: 1,               // clue loops within this round
    imposterIndex: null,
    revealIndex: 0,
    startingPlayerIndex: null,
    currentCard: null,         // { id, word, clues }
    mainWord: "PINEAPPLE",     // placeholder, overwritten
    imposterClue: "FRUIT",     // placeholder, overwritten
    clueRevealed: false,
    voting: {
      voterIndex: 0,
      votes: [],               // { voterIndex, mode: 'continue' | 'accuse', targetIndex: number | null }
      pendingAccuserIndex: null,
      result: null             // { type: 'continue' | 'accuse' | 'impDeclare', ... }
    }
  },
  // Per-game stats (reset each game)
  session: null
};

const app = document.getElementById("app");

// ---------- Helpers ----------

function createEl(tag, opts = {}, children = []) {
  const el = document.createElement(tag);
  if (opts.className) el.className = opts.className;
  if (opts.text) el.textContent = opts.text;
  if (opts.html) el.innerHTML = opts.html;
  if (opts.attrs) {
    for (const [k, v] of Object.entries(opts.attrs)) {
      if (v === null || v === undefined) continue;
      el.setAttribute(k, v);
    }
  }
  if (opts.onClick) {
    el.addEventListener("click", opts.onClick);
  }
  children.forEach(child => {
    if (typeof child === "string") el.appendChild(document.createTextNode(child));
    else if (child) el.appendChild(child);
  });
  return el;
}

function getOrCreateStats(name) {
  if (!persistent.players[name]) {
    persistent.players[name] = {
      totalPoints: 0,
      gamesPlayed: 0,
      roundsPlayed: 0,
      imposterRounds: 0,
      imposterWins: 0,
      correctVotes: 0,
      totalVotes: 0
    };
  }
  return persistent.players[name];
}

function createEmptySession() {
  const n = state.playersInGame.length;
  return {
    points: new Array(n).fill(0),
    rounds: new Array(n).fill(0),
    imposterRounds: new Array(n).fill(0),
    imposterWins: new Array(n).fill(0),
    correctVotes: new Array(n).fill(0),
    totalVotes: new Array(n).fill(0)
  };
}

// Tiny badge demo for now
function getPlayerBadges(name) {
  const stats = getOrCreateStats(name);
  const badges = [];
  if (stats.totalVotes >= 10 && stats.correctVotes / stats.totalVotes >= 0.7) {
    badges.push("Imposter Sniper");
  }
  if (stats.imposterRounds >= 5 && stats.imposterWins / stats.imposterRounds >= 0.6) {
    badges.push("Master Impersonator");
  }
  if (!badges.length) {
    badges.push("No badges yet");
  }
  return badges;
}

function getSelectedPack() {
  if (!Array.isArray(WORD_PACKS) || WORD_PACKS.length === 0) return null;
  if (!state.selectedPackId) {
    // default to first pack
    return WORD_PACKS[0];
  }
  return WORD_PACKS.find(p => p.id === state.selectedPackId) || WORD_PACKS[0];
}

function pickRandomCardFromSelectedPack() {
  const pack = getSelectedPack();
  if (!pack || !pack.cards || pack.cards.length === 0) {
    return {
      id: "fallback",
      word: "PINEAPPLE",
      clues: ["fruit", "tropical"]
    };
  }
  const cards = pack.cards;
  const card = cards[Math.floor(Math.random() * cards.length)];
  return card;
}

function pickImposterClue(card) {
  if (!card || !Array.isArray(card.clues) || card.clues.length === 0) {
    return "";
  }
  if (state.config.imposterClues <= 0) {
    return ""; // no clue mode
  }
  const idx = Math.floor(Math.random() * card.clues.length);
  return card.clues[idx].toUpperCase();
}

// ---------- Screen router ----------

function render() {
  app.innerHTML = "";
  if (state.screen === "splash") renderSplash();
  else if (state.screen === "setupPlayers") renderSetupPlayers();
  else if (state.screen === "config") renderConfig();
  else if (state.screen === "reveal") renderReveal();
  else if (state.screen === "clueRound") renderClueRound();
  else if (state.screen === "voting") renderVoting();
  else if (state.screen === "roundResult") renderRoundResult();
  else if (state.screen === "impDeclare") renderImpDeclare();
  else if (state.screen === "packSelection") renderPackSelection();
  else if (state.screen === "leaderboard") renderLeaderboard();
  else if (state.screen === "options") renderOptions();
  else if (state.screen === "gameOver") renderGameOver();
}

// ---------- Splash screen ----------

function renderSplash() {
  const container = createEl("div", { className: "stack" });

  const card = createEl("div", { className: "card stack" });

  card.appendChild(
    createEl("h1", {
      className: "section-title",
      text: "Impostor Word Game"
    })
  );

  const pack = getSelectedPack();
  card.appendChild(
    createEl("p", {
      className: "hint",
      text: pack
        ? `Current pack: ${pack.label}`
        : "No packs found. Check cards.js."
    })
  );

  card.appendChild(
    createEl("button", {
      className: "primary",
      text: "Start Game",
      onClick: () => {
        state.screen = "setupPlayers";
        render();
      }
    })
  );

  card.appendChild(
    createEl("button", {
      className: "secondary",
      text: "Pack Selection",
      onClick: () => {
        state.screen = "packSelection";
        render();
      }
    })
  );

  card.appendChild(
    createEl("button", {
      className: "secondary",
      text: "Leaderboard (coming soon)",
      onClick: () => {
        state.screen = "leaderboard";
        render();
      }
    })
  );

  card.appendChild(
    createEl("button", {
      className: "secondary",
      text: "Options (coming soon)",
      onClick: () => {
        state.screen = "options";
        render();
      }
    })
  );

  container.appendChild(card);
  app.appendChild(container);
}

// ---------- Pack selection screen ----------

function renderPackSelection() {
  const container = createEl("div", { className: "stack" });

  const card = createEl("div", { className: "card stack" });
  card.appendChild(
    createEl("h1", {
      className: "section-title",
      text: "Select word pack"
    })
  );

  if (!Array.isArray(WORD_PACKS) || WORD_PACKS.length === 0) {
    card.appendChild(
      createEl("p", {
        className: "hint",
        text: "No word packs defined. Check cards.js."
      })
    );
  } else {
    WORD_PACKS.forEach(pack => {
      const isSelected = getSelectedPack() && getSelectedPack().id === pack.id;

      const row = createEl("div", { className: "card stack" });
      row.appendChild(
        createEl("strong", { text: pack.label })
      );
      if (pack.description) {
        row.appendChild(
          createEl("span", {
            className: "hint",
            text: pack.description
          })
        );
      }
      row.appendChild(
        createEl("span", {
          className: "hint",
          text: `Cards: ${pack.cards ? pack.cards.length : 0}`
        })
      );

      row.appendChild(
        createEl("button", {
          className: isSelected ? "primary" : "secondary",
          text: isSelected ? "Selected" : "Use this pack",
          onClick: () => {
            state.selectedPackId = pack.id;
            render();
          }
        })
      );

      card.appendChild(row);
    });
  }

  const footer = createEl("div", { className: "footer-area" });
  footer.appendChild(
    createEl("button", {
      className: "primary",
      text: "Back to title",
      onClick: () => {
        state.screen = "splash";
        render();
      }
    })
  );

  container.appendChild(card);
  container.appendChild(footer);
  app.appendChild(container);
}

// ---------- Placeholder: leaderboard & options ----------

function renderLeaderboard() {
  const container = createEl("div", { className: "stack" });
  const card = createEl("div", { className: "card stack" });

  card.appendChild(
    createEl("h1", {
      className: "section-title",
      text: "Leaderboard"
    })
  );

  card.appendChild(
    createEl("p", {
      className: "hint",
      text: "Coming soon: family rankings based on lifetime points and badges."
    })
  );

  const footer = createEl("div", { className: "footer-area" });
  footer.appendChild(
    createEl("button", {
      className: "primary",
      text: "Back to title",
      onClick: () => {
        state.screen = "splash";
        render();
      }
    })
  );

  container.appendChild(card);
  container.appendChild(footer);
  app.appendChild(container);
}

function renderOptions() {
  const container = createEl("div", { className: "stack" });
  const card = createEl("div", { className: "card stack" });

  card.appendChild(
    createEl("h1", {
      className: "section-title",
      text: "Options"
    })
  );

  card.appendChild(
    createEl("p", {
      className: "hint",
      text: "Future home for house rules, difficulty, and other tweaks."
    })
  );

  const footer = createEl("div", { className: "footer-area" });
  footer.appendChild(
    createEl("button", {
      className: "primary",
      text: "Back to title",
      onClick: () => {
        state.screen = "splash";
        render();
      }
    })
  );

  container.appendChild(card);
  container.appendChild(footer);
  app.appendChild(container);
}

// ---------- 1) Player setup ----------

function renderSetupPlayers() {
  const container = createEl("div", { className: "stack" });

  const titleCard = createEl("div", { className: "card" }, [
    createEl("h1", { className: "section-title", text: "Who is playing?" }),
    createEl("p", {
      className: "hint",
      text: "Tap existing names to add them in order, or add new players below."
    })
  ]);

  const knownNames = Object.keys(persistent.players).sort();
  if (knownNames.length) {
    const row = createEl("div", { className: "row" });
    knownNames.forEach(name => {
      const btn = createEl("button", {
        className: "secondary small",
        text: name,
        onClick: () => {
          state.playersInGame.push({ name });
          render();
        }
      });
      row.appendChild(btn);
    });
    titleCard.appendChild(createEl("div", { className: "spacer-sm" }));
    titleCard.appendChild(row);
  } else {
    titleCard.appendChild(
      createEl("p", {
        className: "hint",
        text: "No players saved yet. Add some names to get started."
      })
    );
  }

  const inputRow = createEl("div", { className: "input-row" });
  const nameInput = createEl("input", {
    attrs: { type: "text", placeholder: "New player name" }
  });
  const addBtn = createEl("button", {
    className: "primary small",
    text: "Add",
    onClick: () => {
      const name = nameInput.value.trim();
      if (!name) return;
      getOrCreateStats(name);
      savePersistent();
      state.playersInGame.push({ name });
      nameInput.value = "";
      render();
    }
  });
  inputRow.appendChild(nameInput);
  inputRow.appendChild(addBtn);
  titleCard.appendChild(createEl("div", { className: "spacer-sm" }));
  titleCard.appendChild(inputRow);

  const currentCard = createEl("div", { className: "card" });
  currentCard.appendChild(
    createEl("h2", { className: "section-title", text: "Play order" })
  );

  if (!state.playersInGame.length) {
    currentCard.appendChild(
      createEl("p", {
        className: "hint",
        text: "Tap names above or add new players. Order matters for passing the phone."
      })
    );
  } else {
    const row = createEl("div", { className: "row" });
    state.playersInGame.forEach((p, idx) => {
      const pill = createEl("div", { className: "player-pill" }, [
        document.createTextNode(`${idx + 1}. ${p.name}`),
        createEl("span", {
          className: "remove",
          text: "✕",
          onClick: () => {
            state.playersInGame.splice(idx, 1);
            render();
          }
        })
      ]);
      row.appendChild(pill);
    });
    currentCard.appendChild(row);
    currentCard.appendChild(
      createEl("p", {
        className: "hint",
        text: "Tap ✕ to remove someone from this game (they stay saved for later)."
      })
    );
  }

  const footer = createEl("div", { className: "footer-area" });
  const minPlayers = 3;
  const canContinue =
    state.playersInGame.length >= minPlayers &&
    state.playersInGame.length <= 12;

  footer.appendChild(
    createEl("button", {
      className: "secondary",
      text: "Back to title",
      onClick: () => {
        state.screen = "splash";
        render();
      }
    })
  );

  footer.appendChild(
    createEl("button", {
      className: "primary",
      text: "Next: Game options",
      onClick: () => {
        state.screen = "config";
        render();
      },
      attrs: { disabled: canContinue ? null : "disabled" }
    })
  );
  footer.appendChild(
    createEl("p", {
      className: "hint center",
      text: "You can have 3–12 players in a game."
    })
  );

  container.appendChild(titleCard);
  container.appendChild(currentCard);
  container.appendChild(footer);
  app.appendChild(container);
}

// ---------- 2) Game options ----------

function renderConfig() {
  const container = createEl("div", { className: "stack" });

  const card = createEl("div", { className: "card stack" });

  card.appendChild(
    createEl("h1", { className: "section-title", text: "Game options" })
  );

  // number of rounds
  const roundsRow = createEl("div", { className: "stack" }, [
    createEl("label", {
      text: "Number of rounds",
      className: "hint"
    })
  ]);

  const roundsInput = createEl("input", {
    attrs: {
      type: "number",
      min: "1",
      max: "20",
      value: String(state.config.totalRounds)
    }
  });
  roundsInput.addEventListener("input", () => {
    const n = parseInt(roundsInput.value, 10);
    if (!isNaN(n)) {
      state.config.totalRounds = Math.max(1, Math.min(20, n));
    }
  });
  roundsRow.appendChild(roundsInput);
  card.appendChild(roundsRow);

  // imposter clues (just a count selector for now)
  const clueRow = createEl("div", { className: "stack" }, [
    createEl("label", {
      text: "Impostor clues",
      className: "hint"
    })
  ]);
  const clueSelect = createEl("select");
  [0, 1, 2, 3].forEach(n => {
    const opt = createEl("option", {
      text: `${n} clue${n === 1 ? "" : "s"}`
    });
    opt.value = String(n);
    if (n === state.config.imposterClues) opt.selected = true;
    clueSelect.appendChild(opt);
  });
  clueSelect.addEventListener("change", () => {
    state.config.imposterClues = parseInt(clueSelect.value, 10);
  });
  clueRow.appendChild(clueSelect);
  card.appendChild(clueRow);

  card.appendChild(
    createEl("p", {
      className: "hint",
      text: "Time limits are off so conversation can flow naturally."
    })
  );

  const pack = getSelectedPack();
  if (pack) {
    card.appendChild(
      createEl("p", {
        className: "hint",
        text: `Using word pack: ${pack.label}`
      })
    );
  }

  const footer = createEl("div", { className: "footer-area" });
  footer.appendChild(
    createEl("button", {
      className: "secondary",
      text: "Back to players",
      onClick: () => {
        state.screen = "setupPlayers";
        render();
      }
    })
  );
  footer.appendChild(
    createEl("button", {
      className: "primary",
      text: "Start game",
      onClick: () => {
        startGame();
      }
    })
  );

  container.appendChild(card);
  container.appendChild(footer);
  app.appendChild(container);
}

function startGame() {
  // Reset per-game stats
  state.session = createEmptySession();

  // Initialize first round
  state.game.currentRound = 1;
  state.game.subRound = 1;

  const card = pickRandomCardFromSelectedPack();
  state.game.currentCard = card;
  state.game.mainWord = card.word.toUpperCase();

  const clue = pickImposterClue(card);
  state.game.imposterClue = clue;

  state.game.imposterIndex = Math.floor(
    Math.random() * state.playersInGame.length
  );
  state.game.revealIndex = 0;
  state.game.startingPlayerIndex = Math.floor(
    Math.random() * state.playersInGame.length
  );
  state.game.clueRevealed = false;
  state.game.voting = {
    voterIndex: 0,
    votes: [],
    pendingAccuserIndex: null,
    result: null
  };

  state.screen = "reveal";
  render();
}

// ---------- 3) Reveal screen (with long-press) ----------

function renderReveal() {
  const container = createEl("div", { className: "stack" });

  const header = createEl("div", {
    className: "round-indicator",
    text: `Round ${state.game.currentRound} of ${state.config.totalRounds}`
  });
  container.appendChild(header);

  const currentIdx = state.game.revealIndex;
  const player = state.playersInGame[currentIdx];

  const card = createEl("div", { className: "card" });

  // Big name + badges
  const badges = getPlayerBadges(player.name);
  const badgeEls = badges.map(label =>
    createEl("span", { className: "badge-chip" }, [
      createEl("span", { className: "badge-dot" }),
      createEl("span", { text: label })
    ])
  );

  const nameRow = createEl("div", { className: "big-name-button" }, [
    createEl("div", { className: "big-name-label", text: player.name }),
    createEl("div", { className: "badge-row" }, badgeEls)
  ]);
  card.appendChild(nameRow);

  // Word / clue
  const isImposter = currentIdx === state.game.imposterIndex;
  const label = isImposter ? "Your clue" : "Secret word";

  let realWord;
  if (isImposter) {
    if (state.config.imposterClues <= 0 || !state.game.imposterClue) {
      realWord = "NO CLUE";
    } else {
      realWord = state.game.imposterClue.toUpperCase();
    }
  } else {
    realWord = state.game.mainWord.toUpperCase();
  }

  const displayText = state.game.clueRevealed
    ? realWord
    : "Press and hold to reveal";

  const clueBox = createEl("div", { className: "clue-box" }, [
    createEl("div", { className: "clue-label", text: label }),
    createEl("div", { className: "clue-word", text: displayText })
  ]);
  card.appendChild(clueBox);

  if (isImposter && state.game.clueRevealed) {
  const impNote = createEl("div", { className: "imposter-tag" }, [
    createEl("span", {
      className: "imposter-icon",
      text: "🕵️"
    }),
    createEl("span", {
      text: " You are the Impostor"
    })
  ]);
  card.appendChild(impNote);
  }

  // Long-press detection (mouse + touch)
  let pressTimer = null;
  const PRESS_DURATION = 500; // ms

  function startPress() {
    if (state.game.clueRevealed) return;
    pressTimer = setTimeout(() => {
      state.game.clueRevealed = true;
      render();
    }, PRESS_DURATION);
  }

  function endPress() {
    if (pressTimer !== null) {
      clearTimeout(pressTimer);
      pressTimer = null;
    }
  }

  clueBox.addEventListener("mousedown", startPress);
  clueBox.addEventListener("touchstart", startPress);
  clueBox.addEventListener("mouseup", endPress);
  clueBox.addEventListener("mouseleave", endPress);
  clueBox.addEventListener("touchend", endPress);
  clueBox.addEventListener("touchcancel", endPress);

  card.appendChild(
    createEl("p", {
      className: "hint",
      text: state.game.clueRevealed
        ? "Once you’ve memorized it, tap the button below and pass the phone."
        : "Press and hold on the word area to reveal it. Then pass the phone."
    })
  );

  container.appendChild(card);

  const footer = createEl("div", { className: "footer-area" });

  const isLast = currentIdx === state.playersInGame.length - 1;
  if (isLast) {
    const starter = state.playersInGame[state.game.startingPlayerIndex];
    footer.appendChild(
      createEl("button", {
        className: "primary",
        text: `Start round with ${starter.name}`,
        onClick: () => {
          state.screen = "clueRound";
          render();
        }
      })
    );
  } else {
    footer.appendChild(
      createEl("button", {
        className: "primary",
        text: "Next player",
        onClick: () => {
          state.game.revealIndex += 1;
          state.game.clueRevealed = false;
          render();
        }
      })
    );
  }

  footer.appendChild(
    createEl("p", {
      className: "hint center",
      text: "Make sure only the current player can see the screen."
    })
  );

  container.appendChild(footer);
  app.appendChild(container);
}

// ---------- 4) Off-phone clue round screen ----------

function renderClueRound() {
  const container = createEl("div", { className: "stack" });

  const header = createEl("div", {
    className: "round-indicator",
    text: `Round ${state.game.currentRound} of ${state.config.totalRounds} — Clue loop ${state.game.subRound}`
  });
  container.appendChild(header);

  const card = createEl("div", { className: "card stack" });

  card.appendChild(
    createEl("h1", {
      className: "section-title",
      text: "Clue round in progress"
    })
  );

  card.appendChild(
    createEl("p", {
      className: "hint",
      text:
        "Play is now off-phone: players give one-word clues in order and talk it over. " +
        "When you're ready for everyone to vote (continue vs accuse), tap the button below. " +
        "If the Impostor declares they know the word, use the Impostor button instead."
    })
  );

  const footer = createEl("div", { className: "footer-area" });

  footer.appendChild(
    createEl("button", {
      className: "primary",
      text: "Begin voting",
      onClick: () => {
        startVoting();
      }
    })
  );

  footer.appendChild(
    createEl("button", {
      className: "secondary",
      text: "Impostor declares",
      onClick: () => {
        state.screen = "impDeclare";
        render();
      }
    })
  );

  footer.appendChild(
    createEl("p", {
      className: "hint center",
      text: "Voting and declarations are secret. Pass the phone to the right person."
    })
  );

  container.appendChild(card);
  container.appendChild(footer);
  app.appendChild(container);
}

// ---------- 5) Impostor declares flow ----------

function renderImpDeclare() {
  const container = createEl("div", { className: "stack" });
  const imp = state.playersInGame[state.game.imposterIndex];

  const header = createEl("div", {
    className: "round-indicator",
    text: `Round ${state.game.currentRound} of ${state.config.totalRounds}`
  });
  container.appendChild(header);

  const card = createEl("div", { className: "card stack" });

  card.appendChild(
    createEl("h1", {
      className: "section-title",
      text: "Impostor declaration"
    })
  );

  card.appendChild(
    createEl("p", {
      className: "hint",
      text:
        `Pass the phone to the Impostor (${imp.name}). They have declared a guess for the secret word aloud.` +
        " As a group, decide whether their spoken guess was correct."
    })
  );

  const correctBtn = createEl("button", {
    className: "primary",
    text: "Guess was correct",
    onClick: () => {
      handleImpostorDeclareOutcome(true);
    }
  });

  const wrongBtn = createEl("button", {
    className: "secondary",
    text: "Guess was wrong",
    onClick: () => {
      handleImpostorDeclareOutcome(false);
    }
  });

  card.appendChild(correctBtn);
  card.appendChild(wrongBtn);

  const footer = createEl("div", { className: "footer-area" });
  footer.appendChild(
    createEl("p", {
      className: "hint center",
      text: "Be honest! The fun depends on fair play."
    })
  );

  container.appendChild(card);
  container.appendChild(footer);
  app.appendChild(container);
}

function handleImpostorDeclareOutcome(correct) {
  applyScoringForImpostorDeclare(correct);
  state.game.voting.result = {
    type: "impDeclare",
    correct
  };
  state.screen = "roundResult";
  render();
}

// ---------- 6) Voting flow ----------

function startVoting() {
  state.game.voting = {
    voterIndex: 0,
    votes: [],
    pendingAccuserIndex: null,
    result: null
  };
  state.screen = "voting";
  render();
}

function renderVoting() {
  const vState = state.game.voting;
  const currentVoterIndex = vState.voterIndex;
  const currentVoter = state.playersInGame[currentVoterIndex];

  const container = createEl("div", { className: "stack" });

  const header = createEl("div", {
    className: "round-indicator",
    text: `Round ${state.game.currentRound} of ${state.config.totalRounds} — Vote ${currentVoterIndex + 1} of ${state.playersInGame.length}`
  });
  container.appendChild(header);

  const card = createEl("div", { className: "card stack" });

  if (vState.pendingAccuserIndex === null) {
    // Step 1: current voter chooses continue vs accuse
    card.appendChild(
      createEl("h1", {
        className: "section-title",
        text: `Pass to: ${currentVoter.name}`
      })
    );

    card.appendChild(
      createEl("p", {
        className: "hint",
        text: "Your vote is secret. Choose whether to continue the round or accuse someone of being the Impostor."
      })
    );

    const continueBtn = createEl("button", {
      className: "secondary",
      text: "Continue the round",
      onClick: () => {
        recordVote("continue", null);
      }
    });

    const accuseBtn = createEl("button", {
      className: "primary",
      text: "Accuse a player",
      onClick: () => {
        state.game.voting.pendingAccuserIndex = currentVoterIndex;
        render();
      }
    });

    card.appendChild(continueBtn);
    card.appendChild(accuseBtn);
  } else {
    // Step 2: choose a target to accuse
    const accuser = state.playersInGame[vState.pendingAccuserIndex];

    card.appendChild(
      createEl("h1", {
        className: "section-title",
        text: `${accuser.name}: choose who to accuse`
      })
    );

    card.appendChild(
      createEl("p", {
        className: "hint",
        text: "Tap one player to accuse them of being the Impostor."
      })
    );

    const list = createEl("div", { className: "stack" });
    state.playersInGame.forEach((p, idx) => {
      if (idx === vState.pendingAccuserIndex) return; // can't accuse yourself
      const btn = createEl("button", {
        className: "secondary",
        text: p.name,
        onClick: () => {
          recordVote("accuse", idx);
        }
      });
      list.appendChild(btn);
    });
    card.appendChild(list);
  }

  const footer = createEl("div", { className: "footer-area" });
  footer.appendChild(
    createEl("p", {
      className: "hint center",
      text: "Make sure only the current voter can see the screen."
    })
  );

  container.appendChild(card);
  container.appendChild(footer);
  app.appendChild(container);
}

function recordVote(mode, targetIndex) {
  const vState = state.game.voting;
  const voterIndex = vState.voterIndex;

  vState.votes.push({
    voterIndex,
    mode,
    targetIndex
  });

  // reset pending accuser if we were in that step
  vState.pendingAccuserIndex = null;

  if (voterIndex + 1 < state.playersInGame.length) {
    vState.voterIndex += 1;
    state.screen = "voting";
    render();
  } else {
    // all votes are in; tally
    tallyVotes();
  }
}

function tallyVotes() {
  const votes = state.game.voting.votes;
  const numPlayers = state.playersInGame.length;

  let continueCount = 0;
  const accuseCountsByTarget = {}; // targetIndex -> count
  let totalAccuse = 0;

  votes.forEach(v => {
    if (v.mode === "continue") {
      continueCount++;
    } else if (v.mode === "accuse") {
      totalAccuse++;
      if (!accuseCountsByTarget[v.targetIndex]) {
        accuseCountsByTarget[v.targetIndex] = 0;
      }
      accuseCountsByTarget[v.targetIndex]++;
    }
  });

  const neededForMajority = Math.floor(numPlayers / 2) + 1;

  let result;

  if (totalAccuse >= neededForMajority) {
    // find most-voted target
    let bestTarget = null;
    let bestCount = 0;
    let tie = false;

    Object.entries(accuseCountsByTarget).forEach(([tIdxStr, count]) => {
      const tIdx = parseInt(tIdxStr, 10);
      if (count > bestCount) {
        bestCount = count;
        bestTarget = tIdx;
        tie = false;
      } else if (count === bestCount) {
        tie = true;
      }
    });

    if (bestTarget === null || tie) {
      result = {
        type: "continue",
        reason: "tieOnTarget"
      };
    } else {
      result = {
        type: "accuse",
        targetIndex: bestTarget
      };
    }
  } else {
    result = {
      type: "continue",
      reason: "noMajority"
    };
  }

  // Apply scoring / stats for this voting outcome
  applyScoringForVotes(result);

  state.game.voting.result = result;
  state.screen = "roundResult";
  render();
}

// ---------- 7) Scoring & stats ----------

function applyScoringForVotes(result) {
  const votes = state.game.voting.votes;
  const impIdx = state.game.imposterIndex;
  const sess = state.session;

  if (result.type !== "accuse") {
    // round didn't end yet; no scoring, no round counts
    return;
  }

  const accusedIdx = result.targetIndex;
  const accusedIsImposter = accusedIdx === impIdx;

  // Everyone participated in this completed round
  state.playersInGame.forEach((p, idx) => {
    const stats = getOrCreateStats(p.name);
    stats.roundsPlayed += 1;
    if (sess) sess.rounds[idx] += 1;
  });

  // Mark impostor round
  const impName = state.playersInGame[impIdx].name;
  const impStats = getOrCreateStats(impName);
  impStats.imposterRounds += 1;
  if (sess) sess.imposterRounds[impIdx] += 1;

  if (!accusedIsImposter) {
    // Group accused wrong person -> Impostor wins this round
    impStats.imposterWins += 1;
    if (sess) sess.imposterWins[impIdx] += 1;

    impStats.totalPoints += 3; // placeholder reward
    if (sess) sess.points[impIdx] += 3;
  }

  // Process votes for accuracy + points
  votes.forEach(v => {
    if (v.mode !== "accuse") return;

    const voterName = state.playersInGame[v.voterIndex].name;
    const s = getOrCreateStats(voterName);
    const idx = v.voterIndex;

    s.totalVotes += 1;
    if (sess) sess.totalVotes[idx] += 1;

    if (accusedIsImposter && v.targetIndex === impIdx) {
      s.correctVotes += 1;
      if (sess) sess.correctVotes[idx] += 1;

      s.totalPoints += 3; // placeholder reward for correct accuse
      if (sess) sess.points[idx] += 3;
    }
  });

  savePersistent();
}

function applyScoringForImpostorDeclare(correct) {
  const impIdx = state.game.imposterIndex;
  const impName = state.playersInGame[impIdx].name;
  const impStats = getOrCreateStats(impName);
  const sess = state.session;

  // Everyone participated in this completed round
  state.playersInGame.forEach((p, idx) => {
    const stats = getOrCreateStats(p.name);
    stats.roundsPlayed += 1;
    if (sess) sess.rounds[idx] += 1;
  });

  // Impostor round
  impStats.imposterRounds += 1;
  if (sess) sess.imposterRounds[impIdx] += 1;

  if (correct) {
    // Impostor nails the word
    impStats.imposterWins += 1;
    if (sess) sess.imposterWins[impIdx] += 1;

    const points = 5; // strong reward
    impStats.totalPoints += points;
    if (sess) sess.points[impIdx] += points;
  } else {
    // Impostor guessed wrong: team bonus, no votes
    const teamBonus = 2;
    state.playersInGame.forEach((p, idx) => {
      if (idx === impIdx) return;
      const s = getOrCreateStats(p.name);
      s.totalPoints += teamBonus;
      if (sess) sess.points[idx] += teamBonus;
    });
  }

  savePersistent();
}

// ---------- 8) Round result screen ----------

function renderRoundResult() {
  const { result } = state.game.voting;
  const container = createEl("div", { className: "stack" });

  const header = createEl("div", {
    className: "round-indicator",
    text: `Round ${state.game.currentRound} of ${state.config.totalRounds}`
  });
  container.appendChild(header);

  const card = createEl("div", { className: "card stack" });

  if (result.type === "continue") {
    card.appendChild(
      createEl("h1", {
        className: "section-title",
        text: "The round continues"
      })
    );

    let reasonText = "Not enough players voted to accuse.";
    if (result.reason === "tieOnTarget") {
      reasonText = "There was a tie on who to accuse. The Impostor gets away (for now).";
    }

    card.appendChild(
      createEl("p", {
        className: "hint",
        text: reasonText
      })
    );

    card.appendChild(
      createEl("p", {
        className: "hint",
        text: "Play another loop of one-word clues, then come back to vote again."
      })
    );
  } else if (result.type === "accuse") {
    const accused = state.playersInGame[result.targetIndex];
    const isImposter = result.targetIndex === state.game.imposterIndex;

    card.appendChild(
      createEl("h1", {
        className: "section-title",
        text: `The group accuses ${accused.name}!`
      })
    );

    if (isImposter) {
      card.appendChild(
        createEl("p", {
          className: "hint",
          text: "They WERE the Impostor. Round ends here. Points have been awarded to players who voted correctly."
        })
      );
    } else {
      card.appendChild(
        createEl("p", {
          className: "hint",
          text: "They were NOT the Impostor. The real Impostor escapes! They gain points this round."
        })
      );
    }
  } else if (result.type === "impDeclare") {
    const imp = state.playersInGame[state.game.imposterIndex];
    card.appendChild(
      createEl("h1", {
        className: "section-title",
        text: `Impostor ${imp.name} declares!`
      })
    );

    if (result.correct) {
      card.appendChild(
        createEl("p", {
          className: "hint",
          text: "Their guess was correct. The Impostor wins this round and earns bonus points."
        })
      );
    } else {
      card.appendChild(
        createEl("p", {
          className: "hint",
          text: "Their guess was wrong. The rest of the table earns a team bonus. Round ends here."
        })
      );
    }
  }

  const footer = createEl("div", { className: "footer-area" });

  const isContinue = state.game.voting.result.type === "continue";

  if (isContinue) {
    footer.appendChild(
      createEl("button", {
        className: "primary",
        text: "Next clue loop",
        onClick: () => {
          state.game.subRound += 1;
          state.game.voting = {
            voterIndex: 0,
            votes: [],
            pendingAccuserIndex: null,
            result: null
          };
          state.screen = "clueRound";
          render();
        }
      })
    );
  } else {
    const lastRound = state.game.currentRound >= state.config.totalRounds;
    footer.appendChild(
      createEl("button", {
        className: "primary",
        text: lastRound ? "See final results" : "Next round",
        onClick: () => {
          if (!lastRound) {
            // start next round
            state.game.currentRound += 1;
            state.game.subRound = 1;

            const card = pickRandomCardFromSelectedPack();
            state.game.currentCard = card;
            state.game.mainWord = card.word.toUpperCase();
            state.game.imposterClue = pickImposterClue(card);

            state.game.imposterIndex = Math.floor(
              Math.random() * state.playersInGame.length
            );
            state.game.revealIndex = 0;
            state.game.startingPlayerIndex = Math.floor(
              Math.random() * state.playersInGame.length
            );
            state.game.clueRevealed = false;
            state.game.voting = {
              voterIndex: 0,
              votes: [],
              pendingAccuserIndex: null,
              result: null
            };
            state.screen = "reveal";
          } else {
            state.screen = "gameOver";
          }
          render();
        }
      })
    );
  }

  container.appendChild(card);
  container.appendChild(footer);
  app.appendChild(container);
}

// ---------- 9) Game-over screen (per-game recap + lifetime) ----------

function renderGameOver() {
  const container = createEl("div", { className: "stack" });
  const sess = state.session || createEmptySession(); // fallback just in case

  // Increment gamesPlayed once per player
  state.playersInGame.forEach(p => {
    const s = getOrCreateStats(p.name);
    s.gamesPlayed += 1;
  });
  savePersistent();

  const card = createEl("div", { className: "card stack" });
  card.appendChild(
    createEl("h1", {
      className: "section-title",
      text: "Game complete"
    })
  );

  card.appendChild(
    createEl("p", {
      className: "hint",
      text:
        "Below are scores for this game and lifetime totals on this device. Badges are based on lifetime stats."
    })
  );

  const list = createEl("div", { className: "stack" });
  state.playersInGame.forEach((p, idx) => {
    const stats = getOrCreateStats(p.name);
    const gamePoints = sess.points[idx] || 0;
    const gameCorrectVotes = sess.correctVotes[idx] || 0;
    const gameTotalVotes = sess.totalVotes[idx] || 0;
    const gameImpWins = sess.imposterWins[idx] || 0;

    const row = createEl("div", { className: "card stack" });

    row.appendChild(createEl("strong", { text: p.name }));

    row.appendChild(
      createEl("span", {
        className: "hint",
        text:
          `This game: ${gamePoints} pts` +
          (gameTotalVotes > 0
            ? ` · Correct votes: ${gameCorrectVotes}/${gameTotalVotes}`
            : "") +
          (gameImpWins > 0 ? ` · Impostor wins: ${gameImpWins}` : "")
      })
    );

    row.appendChild(
      createEl("span", {
        className: "hint",
        text:
          `Lifetime: ${stats.totalPoints} pts · Rounds: ${stats.roundsPlayed} · Games: ${stats.gamesPlayed}`
      })
    );

    list.appendChild(row);
  });
  card.appendChild(list);

  const footer = createEl("div", { className: "footer-area" });
  footer.appendChild(
    createEl("button", {
      className: "primary",
      text: "Back to title",
      onClick: () => {
        state.screen = "splash";
        render();
      }
    })
  );

  container.appendChild(card);
  container.appendChild(footer);
  app.appendChild(container);
}

// ---------- Kick things off ----------

render();
