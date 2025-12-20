// ---------- Persistent data & basic state ----------

const GAME_VERSION = "1.4.1"; // <-- manually update this

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

const MIN_PLAYERS = 3;
const MAX_PLAYERS = 10;

// Locked 10 color pairs (bg + fg)
const PLAYER_COLOR_PAIRS = [
  { bg: "#2563EB", fg: "#FFFFFF" }, // Royal Blue
  { bg: "#15803D", fg: "#FFFFFF" }, // Forest Green
  { bg: "#6D28D9", fg: "#FFFFFF" }, // Deep Purple
  { bg: "#B91C1C", fg: "#FFFFFF" }, // Crimson
  { bg: "#334155", fg: "#FFFFFF" }, // Slate
  { bg: "#D97706", fg: "#111827" }, // Amber (dark text)
  { bg: "#0F766E", fg: "#FFFFFF" }, // Teal
  { bg: "#BE185D", fg: "#FFFFFF" }, // Rose
  { bg: "#0284C7", fg: "#FFFFFF" }, // Sky
  { bg: "#4D7C0F", fg: "#FFFFFF" }  // Dark Lime
];

// Badge reference (primary badge shown on player button)
// Gate rules:
// - roundsPlayed < 20 => Noob
// - roundsPlayed >= 20 but gamesPlayed < 20 => Unranked
// - else percentage/rate badges
const BADGES = [
  // Gates
  {
    id: "noob",
    icon: "🐣",
    code: "NB",
    label: "Noob",
    description: "Play at least 20 rounds to graduate from Noob.",
    gate: (s) => (s.roundsPlayed || 0) < 20
  },
  {
    id: "unranked",
    icon: "🎟️",
    code: "UR",
    label: "Unranked",
    description: "Play at least 20 games to unlock ranked badges.",
    gate: (s) => (s.roundsPlayed || 0) >= 20 && (s.gamesPlayed || 0) < 20
  },

  // Ranked (require games >= 20 AND rounds >= 20 as baseline stability)
  // Sleuth accuracy (correctVotes/totalVotes)
  {
    id: "eagle_eye",
    icon: "🦅",
    code: "EE",
    label: "Eagle Eye",
    description: "Accusation accuracy ≥ 70% (min 20 accusations).",
    qualifies: (s) => {
      const tv = s.totalVotes || 0;
      const cv = s.correctVotes || 0;
      if (tv < 20) return false;
      return (cv / tv) >= 0.70;
    },
    priority: 100
  },
  {
    id: "hawk_eye",
    icon: "🦅",
    code: "HE",
    label: "Hawk Eye",
    description: "Accusation accuracy ≥ 75% (min 40 accusations).",
    qualifies: (s) => {
      const tv = s.totalVotes || 0;
      const cv = s.correctVotes || 0;
      if (tv < 40) return false;
      return (cv / tv) >= 0.75;
    },
    priority: 120
  },
  {
    id: "oracle",
    icon: "🔮",
    code: "OR",
    label: "Oracle",
    description: "Accusation accuracy ≥ 80% (min 60 accusations).",
    qualifies: (s) => {
      const tv = s.totalVotes || 0;
      const cv = s.correctVotes || 0;
      if (tv < 60) return false;
      return (cv / tv) >= 0.80;
    },
    priority: 140
  },

  // Impostor win rate (imposterWins/imposterRounds)
  {
    id: "shapeshifter",
    icon: "🎭",
    code: "SS",
    label: "Shapeshifter",
    description: "Impostor win rate ≥ 50% (min 10 impostor rounds).",
    qualifies: (s) => {
      const ir = s.imposterRounds || 0;
      const iw = s.imposterWins || 0;
      if (ir < 10) return false;
      return (iw / ir) >= 0.50;
    },
    priority: 95
  },
  {
    id: "master",
    icon: "🎭",
    code: "MI",
    label: "Master Impersonator",
    description: "Impostor win rate ≥ 60% (min 20 impostor rounds).",
    qualifies: (s) => {
      const ir = s.imposterRounds || 0;
      const iw = s.imposterWins || 0;
      if (ir < 20) return false;
      return (iw / ir) >= 0.60;
    },
    priority: 115
  },
  {
    id: "ghost",
    icon: "👻",
    code: "GH",
    label: "Ghost",
    description: "Impostor win rate ≥ 70% (min 30 impostor rounds).",
    qualifies: (s) => {
      const ir = s.imposterRounds || 0;
      const iw = s.imposterWins || 0;
      if (ir < 30) return false;
      return (iw / ir) >= 0.70;
    },
    priority: 135
  },

  // Playstyle: accusation frequency (totalVotes/roundsPlayed)
  {
    id: "wallflower",
    icon: "🌱",
    code: "WF",
    label: "Wallflower",
    description: "Accusation rate ≤ 15% (min 20 rounds).",
    qualifies: (s) => {
      const rp = s.roundsPlayed || 0;
      const tv = s.totalVotes || 0;
      if (rp < 20) return false;
      const rate = rp > 0 ? (tv / rp) : 0;
      return rate <= 0.15;
    },
    priority: 70
  },
  {
    id: "balanced",
    icon: "⚖️",
    code: "BL",
    label: "Balanced",
    description: "Accusation rate between 25% and 55% (min 20 rounds).",
    qualifies: (s) => {
      const rp = s.roundsPlayed || 0;
      const tv = s.totalVotes || 0;
      if (rp < 20) return false;
      const rate = rp > 0 ? (tv / rp) : 0;
      return rate >= 0.25 && rate <= 0.55;
    },
    priority: 75
  },
  {
    id: "gunslinger",
    icon: "🤠",
    code: "GS",
    label: "Gunslinger",
    description: "Accusation rate ≥ 70% (min 20 rounds).",
    qualifies: (s) => {
      const rp = s.roundsPlayed || 0;
      const tv = s.totalVotes || 0;
      if (rp < 20) return false;
      const rate = rp > 0 ? (tv / rp) : 0;
      return rate >= 0.70;
    },
    priority: 80
  },

  // Overall: points per round (totalPoints/roundsPlayed) – calibrates itself over time
  {
    id: "contributor",
    icon: "🧩",
    code: "CN",
    label: "Contributor",
    description: "Points per round ≥ 0.8 (min 20 rounds).",
    qualifies: (s) => {
      const rp = s.roundsPlayed || 0;
      const tp = s.totalPoints || 0;
      if (rp < 20) return false;
      return (tp / rp) >= 0.8;
    },
    priority: 85
  },
  {
    id: "carry",
    icon: "🏋️",
    code: "CR",
    label: "Carry",
    description: "Points per round ≥ 1.2 (min 20 rounds).",
    qualifies: (s) => {
      const rp = s.roundsPlayed || 0;
      const tp = s.totalPoints || 0;
      if (rp < 20) return false;
      return (tp / rp) >= 1.2;
    },
    priority: 105
  },
  {
    id: "legend",
    icon: "🏆",
    code: "LG",
    label: "Legend",
    description: "Points per round ≥ 1.6 (min 20 rounds).",
    qualifies: (s) => {
      const rp = s.roundsPlayed || 0;
      const tp = s.totalPoints || 0;
      if (rp < 20) return false;
      return (tp / rp) >= 1.6;
    },
    priority: 125
  }
];

const state = {
  screen: "splash", // splash | setupPlayers | config | reveal | clueRound | voting | roundResult | impDeclare | packSelection | scoring | gameOver
  playersInGame: [], // [{ name }]
  config: {
    totalRounds: 3,
    imposterClues: 1
  },
  selectedPackId: null,
  game: {
    currentRound: 1,
    subRound: 1,
    imposterIndex: null,
    revealIndex: 0,
    startingPlayerIndex: null,
    currentCard: null,
    mainWord: "PINEAPPLE",
    imposterClue: "FRUIT",
    clueRevealed: false,
    playerThemesByName: {}, // assigned at game start
    voting: {
      voterIndex: 0,
      votes: [],
      pendingAccuserIndex: null,
      pendingContinueIndex: null,
      continueSlots: null, // [{ label, isReal }]
      result: null
    }
  },
  session: null // per-game stats
};

const app = document.getElementById("app");

// ---------- Helpers ----------

function createEl(tag, opts = {}, children = []) {
  const el = document.createElement(tag);
  if (opts.className) el.className = opts.className;
  if (opts.text !== undefined) el.textContent = opts.text;
  if (opts.html !== undefined) el.innerHTML = opts.html;
  if (opts.attrs) {
    for (const [k, v] of Object.entries(opts.attrs)) {
      if (v === null || v === undefined) continue;
      el.setAttribute(k, v);
    }
  }
  if (opts.style) {
    for (const [k, v] of Object.entries(opts.style)) el.style[k] = v;
  }
  if (opts.onClick) el.addEventListener("click", opts.onClick);
  children.forEach(child => {
    if (typeof child === "string") el.appendChild(document.createTextNode(child));
    else if (child) el.appendChild(child);
  });
  return el;
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
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

function assignPlayerThemesAtGameStart() {
  const idxs = shuffle([...Array(PLAYER_COLOR_PAIRS.length)].map((_, i) => i));
  const map = {};
  state.playersInGame.forEach((p, i) => {
    map[p.name] = PLAYER_COLOR_PAIRS[idxs[i]];
  });
  return map;
}

function getThemeForPlayer(name) {
  return state.game.playerThemesByName?.[name] || { bg: "#2563eb", fg: "#ffffff" };
}

function makeNameBox(name, opts = {}) {
  const t = getThemeForPlayer(name);
  const label = opts.prefix ? `${opts.prefix}${name}` : name;
  return createEl("div", {
    className: "name-box",
    text: label,
    style: { backgroundColor: t.bg, color: t.fg }
  });
}

function getSelectedPack() {
  if (!Array.isArray(WORD_PACKS) || WORD_PACKS.length === 0) return null;
  if (!state.selectedPackId) return WORD_PACKS[0];
  return WORD_PACKS.find(p => p.id === state.selectedPackId) || WORD_PACKS[0];
}

function pickRandomCardFromSelectedPack() {
  const pack = getSelectedPack();
  if (!pack || !pack.cards || pack.cards.length === 0) {
    return { id: "fallback", word: "PINEAPPLE", clues: ["fruit", "tropical"] };
  }
  return pack.cards[Math.floor(Math.random() * pack.cards.length)];
}

function pickImposterClue(card) {
  if (!card || !Array.isArray(card.clues) || card.clues.length === 0) return "";
  if (state.config.imposterClues <= 0) return "";
  return card.clues[Math.floor(Math.random() * card.clues.length)].toUpperCase();
}

// ---------- Badges ----------

function getPrimaryBadge(name) {
  const s = getOrCreateStats(name);

  // Gate: Noob
  const noob = BADGES.find(b => b.id === "noob");
  if (noob && noob.gate(s)) return noob;

  // Gate: Unranked
  const unranked = BADGES.find(b => b.id === "unranked");
  if (unranked && unranked.gate(s)) return unranked;

  // Ranked unlock
  if ((s.gamesPlayed || 0) < 20) {
    // If someone somehow passes rounds but not games, keep Unranked behavior.
    return unranked;
  }

  const ranked = BADGES
    .filter(b => typeof b.qualifies === "function")
    .sort((a, b) => (b.priority || 0) - (a.priority || 0));

  for (const b of ranked) {
    if (b.qualifies(s)) return b;
  }

  // Fallback ranked badge
  return { icon: "✅", code: "OK", label: "Ranked", description: "Keep playing—your stats will unlock badges over time." };
}

function renderBadgeChip(badge) {
  // chip uses existing badge styling; dot kept for visual sparkle
  return createEl("span", { className: "badge-chip" }, [
    createEl("span", { className: "badge-dot" }),
    createEl("span", { className: "badge-icon", text: badge.icon }),
    createEl("span", { className: "badge-code", text: badge.code }),
    createEl("span", { text: badge.label })
  ]);
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
  else if (state.screen === "scoring") renderScoring();
  else if (state.screen === "gameOver") renderGameOver();
}

// ---------- Splash ----------

function renderSplash() {
  const container = createEl("div", { className: "stack" });
  const card = createEl("div", { className: "card stack" });

  card.appendChild(createEl("h1", { className: "section-title", text: `Emposs Duhr - V ${GAME_VERSION}` }));

  const pack = getSelectedPack();
  card.appendChild(createEl("p", {
    className: "hint",
    text: pack ? `Current pack: ${pack.label}` : "No packs found. Check cards.js."
  }));

  card.appendChild(createEl("button", {
    className: "primary",
    text: "Start Game",
    onClick: () => { state.screen = "setupPlayers"; render(); }
  }));

  card.appendChild(createEl("button", {
    className: "secondary",
    text: "Pack Selection",
    onClick: () => { state.screen = "packSelection"; render(); }
  }));

  card.appendChild(createEl("button", {
    className: "secondary",
    text: "Scoring",
    onClick: () => { state.screen = "scoring"; render(); }
  }));

  container.appendChild(card);
  app.appendChild(container);
}

// ---------- Pack selection ----------

function renderPackSelection() {
  const container = createEl("div", { className: "stack" });
  const card = createEl("div", { className: "card stack" });

  card.appendChild(createEl("h1", { className: "section-title", text: "Select word pack" }));

  if (!Array.isArray(WORD_PACKS) || WORD_PACKS.length === 0) {
    card.appendChild(createEl("p", { className: "hint", text: "No word packs defined. Check cards.js." }));
  } else {
    WORD_PACKS.forEach(pack => {
      const selected = getSelectedPack() && getSelectedPack().id === pack.id;

      const row = createEl("div", { className: "card stack" });
      row.appendChild(createEl("strong", { text: pack.label }));
      if (pack.description) row.appendChild(createEl("span", { className: "hint", text: pack.description }));
      row.appendChild(createEl("span", { className: "hint", text: `Cards: ${pack.cards ? pack.cards.length : 0}` }));

      row.appendChild(createEl("button", {
        className: selected ? "primary" : "secondary",
        text: selected ? "Selected" : "Use this pack",
        onClick: () => { state.selectedPackId = pack.id; render(); }
      }));

      card.appendChild(row);
    });
  }

  const footer = createEl("div", { className: "footer-area" });
  footer.appendChild(createEl("button", {
    className: "primary",
    text: "Back to title",
    onClick: () => { state.screen = "splash"; render(); }
  }));

  container.appendChild(card);
  container.appendChild(footer);
  app.appendChild(container);
}

// ---------- Scoring reference screen ----------

function renderScoring() {
  const container = createEl("div", { className: "stack" });
  const card = createEl("div", { className: "card stack" });

  card.appendChild(createEl("h1", { className: "section-title", text: "Scoring & Badges" }));

  card.appendChild(createEl("p", {
    className: "hint",
    text:
      "Badges are lifetime stats on this device. During voting, points are hidden. " +
      "Points are shown only when a round ends (accuse or impostor declaration)."
  }));

  const scoringList = createEl("div", { className: "stack" });

  const scoringItems = [
    { t: "Accuse vote correct", v: "+2 to that voter" },
    { t: "Accuse vote wrong", v: "-1 to that voter" },
    { t: "Continue vote", v: "0" },
    { t: "Vote result: Continue", v: "+1 to impostor (hidden until round end)" },
    { t: "Vote result: Accuse wrong target", v: "+3 to impostor (round ends)" },
    { t: "Vote result: Accuse correct impostor", v: "Impostor gets 0 (round ends)" },
    { t: "Impostor declares correct", v: "+5 to impostor (round ends)" },
    { t: "Impostor declares wrong", v: "-2 to impostor (round ends)" }
  ];

  scoringItems.forEach(it => {
    scoringList.appendChild(
      createEl("div", { className: "card stack" }, [
        createEl("strong", { text: it.t }),
        createEl("span", { className: "hint", text: it.v })
      ])
    );
  });

  card.appendChild(scoringList);

  card.appendChild(createEl("h2", { className: "section-title", text: "Badge tiers" }));
  card.appendChild(createEl("p", {
    className: "hint",
    text:
      "🐣 NB Noob: until you’ve played 20 rounds.\n" +
      "🎟️ UR Unranked: after 20 rounds, until you’ve played 20 games.\n" +
      "After 20 games, ranked badges appear based on percentages/rates."
  }));

  card.appendChild(createEl("h2", { className: "section-title", text: "Badges" }));

  const badgeList = createEl("div", { className: "stack" });

  BADGES.forEach(b => {
    // Show all entries, including gates, with their descriptions
    badgeList.appendChild(
      createEl("div", { className: "card stack" }, [
        createEl("div", { className: "row" }, [
          renderBadgeChip(b),
        ]),
        createEl("span", { className: "hint", text: b.description })
      ])
    );
  });

  // Add fallback ranked badge info
  badgeList.appendChild(
    createEl("div", { className: "card stack" }, [
      createEl("div", { className: "row" }, [
        renderBadgeChip({ icon: "✅", code: "OK", label: "Ranked", description: "" })
      ]),
      createEl("span", {
        className: "hint",
        text: "If you’re ranked but don’t meet any thresholds yet, you’ll show as ✅ OK Ranked."
      })
    ])
  );

  card.appendChild(badgeList);

  const footer = createEl("div", { className: "footer-area" });
  footer.appendChild(createEl("button", {
    className: "primary",
    text: "Back to title",
    onClick: () => { state.screen = "splash"; render(); }
  }));

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
      text: `Tap existing names to add them in order, or add new players below. (Max ${MAX_PLAYERS})`
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
          if (state.playersInGame.length >= MAX_PLAYERS) return;
          state.playersInGame.push({ name });
          render();
        }
      });
      row.appendChild(btn);
    });
    titleCard.appendChild(createEl("div", { className: "spacer-sm" }));
    titleCard.appendChild(row);
  } else {
    titleCard.appendChild(createEl("p", { className: "hint", text: "No players saved yet. Add some names to get started." }));
  }

  const inputRow = createEl("div", { className: "input-row" });
  const nameInput = createEl("input", {
    attrs: { type: "text", placeholder: "New player name" }
  });
  const addBtn = createEl("button", {
    className: "primary small",
    text: "Add",
    onClick: () => {
      if (state.playersInGame.length >= MAX_PLAYERS) return;
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
  currentCard.appendChild(createEl("h2", { className: "section-title", text: "Play order" }));

  if (!state.playersInGame.length) {
    currentCard.appendChild(createEl("p", { className: "hint", text: "Tap names above or add new players. Order matters for passing the phone." }));
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
    currentCard.appendChild(createEl("p", { className: "hint", text: "Tap ✕ to remove someone from this game (they stay saved for later)." }));
  }

  const footer = createEl("div", { className: "footer-area" });

  const canContinue =
    state.playersInGame.length >= MIN_PLAYERS &&
    state.playersInGame.length <= MAX_PLAYERS;

  footer.appendChild(createEl("button", {
    className: "secondary",
    text: "Back to title",
    onClick: () => { state.screen = "splash"; render(); }
  }));

  footer.appendChild(createEl("button", {
    className: "primary",
    text: "Next: Game options",
    onClick: () => { state.screen = "config"; render(); },
    attrs: { disabled: canContinue ? null : "disabled" }
  }));

  footer.appendChild(createEl("p", {
    className: "hint center",
    text: `You can have ${MIN_PLAYERS}–${MAX_PLAYERS} players in a game.`
  }));

  container.appendChild(titleCard);
  container.appendChild(currentCard);
  container.appendChild(footer);
  app.appendChild(container);
}

// ---------- 2) Game options ----------

function renderConfig() {
  const container = createEl("div", { className: "stack" });
  const card = createEl("div", { className: "card stack" });

  card.appendChild(createEl("h1", { className: "section-title", text: "Game options" }));

  const roundsRow = createEl("div", { className: "stack" }, [
    createEl("label", { text: "Number of rounds", className: "hint" })
  ]);

  const roundsInput = createEl("input", {
    attrs: { type: "number", min: "1", max: "20", value: String(state.config.totalRounds) }
  });
  roundsInput.addEventListener("input", () => {
    const n = parseInt(roundsInput.value, 10);
    if (!isNaN(n)) state.config.totalRounds = Math.max(1, Math.min(20, n));
  });
  roundsRow.appendChild(roundsInput);
  card.appendChild(roundsRow);

  const clueRow = createEl("div", { className: "stack" }, [
    createEl("label", { text: "Impostor clues", className: "hint" })
  ]);

  const clueSelect = createEl("select");
  [0, 1, 2, 3].forEach(n => {
    const opt = createEl("option", { text: `${n} clue${n === 1 ? "" : "s"}` });
    opt.value = String(n);
    if (n === state.config.imposterClues) opt.selected = true;
    clueSelect.appendChild(opt);
  });
  clueSelect.addEventListener("change", () => {
    state.config.imposterClues = parseInt(clueSelect.value, 10);
  });
  clueRow.appendChild(clueSelect);
  card.appendChild(clueRow);

  const pack = getSelectedPack();
  if (pack) card.appendChild(createEl("p", { className: "hint", text: `Using word pack: ${pack.label}` }));

  const footer = createEl("div", { className: "footer-area" });
  footer.appendChild(createEl("button", {
    className: "secondary",
    text: "Back to players",
    onClick: () => { state.screen = "setupPlayers"; render(); }
  }));
  footer.appendChild(createEl("button", {
    className: "primary",
    text: "Start game",
    onClick: () => startGame()
  }));

  container.appendChild(card);
  container.appendChild(footer);
  app.appendChild(container);
}

function startGame() {
  state.session = createEmptySession();

  // assign locked colors for this game
  state.game.playerThemesByName = assignPlayerThemesAtGameStart();

  state.game.currentRound = 1;
  state.game.subRound = 1;

  const card = pickRandomCardFromSelectedPack();
  state.game.currentCard = card;
  state.game.mainWord = card.word.toUpperCase();
  state.game.imposterClue = pickImposterClue(card);

  state.game.imposterIndex = Math.floor(Math.random() * state.playersInGame.length);
  state.game.revealIndex = 0;
  state.game.startingPlayerIndex = Math.floor(Math.random() * state.playersInGame.length);
  state.game.clueRevealed = false;

  state.game.voting = {
    voterIndex: 0,
    votes: [],
    pendingAccuserIndex: null,
    pendingContinueIndex: null,
    continueSlots: null,
    result: null
  };

  state.screen = "reveal";
  render();
}

// ---------- 3) Reveal screen ----------

function renderReveal() {
  const container = createEl("div", { className: "stack" });

  container.appendChild(createEl("div", {
    className: "round-indicator",
    text: `Round ${state.game.currentRound} of ${state.config.totalRounds}`
  }));

  const currentIdx = state.game.revealIndex;
  const player = state.playersInGame[currentIdx];
  const theme = getThemeForPlayer(player.name);

  const card = createEl("div", { className: "card" });

  const badge = getPrimaryBadge(player.name);
  const badgeEls = [renderBadgeChip(badge)];

  const nameRow = createEl("div", {
    className: "big-name-button",
    style: { backgroundColor: theme.bg, color: theme.fg }
  }, [
    createEl("div", { className: "big-name-label", text: player.name }),
    createEl("div", { className: "badge-row" }, badgeEls)
  ]);

  card.appendChild(nameRow);

  const isImposter = currentIdx === state.game.imposterIndex;
  const label = isImposter ? "Your clue" : "Secret word";

  let realWord;
  if (isImposter) {
    realWord = (state.config.imposterClues <= 0 || !state.game.imposterClue) ? "NO CLUE" : state.game.imposterClue.toUpperCase();
  } else {
    realWord = state.game.mainWord.toUpperCase();
  }

  const displayText = state.game.clueRevealed ? realWord : "Press and hold to reveal";

  const clueBox = createEl("div", { className: "clue-box" }, [
    createEl("div", { className: "clue-label", text: label }),
    createEl("div", { className: "clue-word", text: displayText })
  ]);
  card.appendChild(clueBox);

  if (isImposter && state.game.clueRevealed) {
    card.appendChild(createEl("div", { className: "imposter-tag" }, [
      createEl("span", { className: "imposter-icon", text: "🕵️" }),
      createEl("span", { text: " You are the Impostor" })
    ]));
  }

  // long-press detection
  let pressTimer = null;
  const PRESS_DURATION = 500;

  function startPress() {
    if (state.game.clueRevealed) return;
    pressTimer = setTimeout(() => {
      state.game.clueRevealed = true;
      render();
    }, PRESS_DURATION);
  }
  function endPress() {
    if (pressTimer !== null) { clearTimeout(pressTimer); pressTimer = null; }
  }

  clueBox.addEventListener("mousedown", startPress);
  clueBox.addEventListener("touchstart", startPress);
  clueBox.addEventListener("mouseup", endPress);
  clueBox.addEventListener("mouseleave", endPress);
  clueBox.addEventListener("touchend", endPress);
  clueBox.addEventListener("touchcancel", endPress);

  card.appendChild(createEl("p", {
    className: "hint",
    text: state.game.clueRevealed
      ? "Once you’ve memorized it, tap the button below and pass the phone."
      : "Press and hold on the word area to reveal it. Then pass the phone."
  }));

  container.appendChild(card);

  const footer = createEl("div", { className: "footer-area" });

  const isLast = currentIdx === state.playersInGame.length - 1;
  if (isLast) {
    const starter = state.playersInGame[state.game.startingPlayerIndex];
    footer.appendChild(createEl("button", {
      className: "primary",
      text: `Start round with ${starter.name}`,
      onClick: () => { state.screen = "clueRound"; render(); }
    }));
  } else {
    footer.appendChild(createEl("button", {
      className: "primary",
      text: "Next player",
      onClick: () => {
        state.game.revealIndex += 1;
        state.game.clueRevealed = false;
        render();
      }
    }));
  }

  footer.appendChild(createEl("p", { className: "hint center", text: "Make sure only the current player can see the screen." }));

  container.appendChild(footer);
  app.appendChild(container);
}

// ---------- 4) Clue round screen ----------

function renderClueRound() {
  const container = createEl("div", { className: "stack" });

  container.appendChild(createEl("div", {
    className: "round-indicator",
    text: `Round ${state.game.currentRound} of ${state.config.totalRounds} — Clue loop ${state.game.subRound}`
  }));

  const card = createEl("div", { className: "card stack" });
  card.appendChild(createEl("h1", { className: "section-title", text: "Clue round in progress" }));

  const starter = state.playersInGame[state.game.startingPlayerIndex];
  card.appendChild(createEl("div", { className: "subtle-start-label", text: `Start with ${starter.name}` }));

  card.appendChild(createEl("p", {
    className: "hint",
    text:
      "Play is now off-phone: players give one-word clues in order and talk it over. " +
      "When you're ready for everyone to vote (continue vs accuse), tap below. " +
      "If the Impostor declares they know the word, use the Impostor button instead."
  }));

  const footer = createEl("div", { className: "footer-area" });

  footer.appendChild(createEl("button", {
    className: "primary",
    text: "Begin voting",
    onClick: () => startVoting()
  }));

  footer.appendChild(createEl("button", {
    className: "secondary",
    text: "Impostor declares",
    onClick: () => { state.screen = "impDeclare"; render(); }
  }));

  footer.appendChild(createEl("p", { className: "hint center", text: "Voting and declarations are secret. Pass the phone to the right person." }));

  container.appendChild(card);
  container.appendChild(footer);
  app.appendChild(container);
}

// ---------- 5) Impostor declares ----------

function renderImpDeclare() {
  const container = createEl("div", { className: "stack" });
  const imp = state.playersInGame[state.game.imposterIndex];

  container.appendChild(createEl("div", {
    className: "round-indicator",
    text: `Round ${state.game.currentRound} of ${state.config.totalRounds}`
  }));

  const card = createEl("div", { className: "card stack" });

  card.appendChild(createEl("h1", { className: "section-title", text: "Impostor declaration" }));

  card.appendChild(createEl("p", {
    className: "hint",
    text:
      `Pass the phone to the Impostor (${imp.name}). They have declared a guess aloud. ` +
      "As a group, decide whether their spoken guess was correct."
  }));

  card.appendChild(createEl("button", {
    className: "primary",
    text: "Guess was correct",
    onClick: () => handleImpostorDeclareOutcome(true)
  }));

  card.appendChild(createEl("button", {
    className: "secondary",
    text: "Guess was wrong",
    onClick: () => handleImpostorDeclareOutcome(false)
  }));

  container.appendChild(card);
  app.appendChild(container);
}

function handleImpostorDeclareOutcome(correct) {
  applyScoringForImpostorDeclare(correct);

  state.game.voting.result = { type: "impDeclare", correct };
  state.screen = "roundResult";
  render();
}

// ---------- 6) Voting flow ----------

function startVoting() {
  state.game.voting = {
    voterIndex: 0,
    votes: [],
    pendingAccuserIndex: null,
    pendingContinueIndex: null,
    continueSlots: null,
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

  container.appendChild(createEl("div", {
    className: "round-indicator",
    text: `Round ${state.game.currentRound} of ${state.config.totalRounds} — Vote ${currentVoterIndex + 1} of ${state.playersInGame.length}`
  }));

  const card = createEl("div", { className: "card stack" });

  // Stage A: choose Continue? or Accuse
  if (vState.pendingAccuserIndex === null && vState.pendingContinueIndex === null) {
    card.appendChild(createEl("h1", { className: "section-title", text: `Pass to: ${currentVoter.name}` }));
    card.appendChild(createEl("p", { className: "hint", text: "Your vote is secret. Choose whether to continue or accuse." }));

    card.appendChild(createEl("button", {
      className: "secondary",
      text: "Continue?",
      onClick: () => {
        // Two-press continue: open decoy panel
        vState.pendingContinueIndex = currentVoterIndex;

        const slotsCount = state.playersInGame.length - 1;
        const realPos = Math.floor(Math.random() * slotsCount);
        vState.continueSlots = Array.from({ length: slotsCount }, (_, i) => ({
          label: i === realPos ? "Really Continue" : "Blank button",
          isReal: i === realPos
        }));

        render();
      }
    }));

    card.appendChild(createEl("button", {
      className: "primary",
      text: "Accuse a player",
      onClick: () => {
        vState.pendingAccuserIndex = currentVoterIndex;
        render();
      }
    }));
  }
  // Stage B: Continue confirmation panel (decoys)
  else if (vState.pendingContinueIndex !== null) {
    const voter = state.playersInGame[vState.pendingContinueIndex];

    card.appendChild(createEl("h1", { className: "section-title", text: `${voter.name}: confirm` }));
    card.appendChild(createEl("p", {
      className: "hint",
      text: "Tap the correct confirmation button to finalize your Continue vote."
    }));

    const list = createEl("div", { className: "stack" });
    vState.continueSlots.forEach(slot => {
      list.appendChild(createEl("button", {
        className: "secondary",
        text: slot.label,
        onClick: () => {
          if (!slot.isReal) return; // dead decoy
          recordVote("continue", null);
        }
      }));
    });
    card.appendChild(list);

    card.appendChild(createEl("p", {
      className: "hint",
      text: "If you tapped a Blank button, nothing happens (by design)."
    }));
  }
  // Stage C: choose accusation target
  else {
    const accuser = state.playersInGame[vState.pendingAccuserIndex];

    card.appendChild(createEl("h1", { className: "section-title", text: `${accuser.name}: choose who to accuse` }));
    card.appendChild(createEl("p", { className: "hint", text: "Tap one player to accuse them of being the Impostor." }));

    const list = createEl("div", { className: "stack" });
    state.playersInGame.forEach((p, idx) => {
      if (idx === vState.pendingAccuserIndex) return; // can't accuse yourself
      list.appendChild(createEl("button", {
        className: "secondary",
        onClick: () => recordVote("accuse", idx)
      }, [makeNameBox(p.name)]));
    });
    card.appendChild(list);
  }

  const footer = createEl("div", { className: "footer-area" });
  footer.appendChild(createEl("p", { className: "hint center", text: "Make sure only the current voter can see the screen." }));

  container.appendChild(card);
  container.appendChild(footer);
  app.appendChild(container);
}

function recordVote(mode, targetIndex) {
  const vState = state.game.voting;
  const voterIndex = vState.voterIndex;

  vState.votes.push({ voterIndex, mode, targetIndex });

  vState.pendingAccuserIndex = null;
  vState.pendingContinueIndex = null;
  vState.continueSlots = null;

  if (voterIndex + 1 < state.playersInGame.length) {
    vState.voterIndex += 1;
    state.screen = "voting";
    render();
  } else {
    tallyVotes();
  }
}

function tallyVotes() {
  const votes = state.game.voting.votes;
  const numPlayers = state.playersInGame.length;

  const accuseCountsByTarget = {};
  let totalAccuse = 0;

  votes.forEach(v => {
    if (v.mode === "accuse") {
      totalAccuse++;
      accuseCountsByTarget[v.targetIndex] = (accuseCountsByTarget[v.targetIndex] || 0) + 1;
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
      result = { type: "continue", reason: "tieOnTarget" };
    } else {
      result = { type: "accuse", targetIndex: bestTarget };
    }
  } else {
    result = { type: "continue", reason: "noMajority" };
  }

  applyScoringForVotes(result);

  state.game.voting.result = result;

  // IMPORTANT: never show points after continue
  state.screen = "roundResult";
  render();
}

// ---------- 7) Scoring & stats ----------
// Rules implemented:
// - Every accuse vote is scored immediately (even if the group continues):
//   correct accuse: +2, wrong accuse: -1
// - Continue vote: 0
// - Vote result continue (no majority / tie): impostor +1 (hidden; no recap UI)
// - Vote result accuse, wrong target: impostor +3, round ends
// - Vote result accuse, correct: impostor 0, round ends
// - Impostor declare correct: +5, round ends
// - Impostor declare wrong: -2, round ends
// - No group/team points

function applyScoringForVotes(result) {
  const votes = state.game.voting.votes;
  const impIdx = state.game.imposterIndex;
  const sess = state.session;

  // 1) Individual scoring for accusations (always, every voting loop)
  votes.forEach(v => {
    if (v.mode !== "accuse") return;

    const voterName = state.playersInGame[v.voterIndex].name;
    const stats = getOrCreateStats(voterName);

    stats.totalVotes += 1;
    if (sess) sess.totalVotes[v.voterIndex] += 1;

    const correct = v.targetIndex === impIdx;
    if (correct) {
      stats.correctVotes += 1;
      if (sess) sess.correctVotes[v.voterIndex] += 1;

      stats.totalPoints += 2;
      if (sess) sess.points[v.voterIndex] += 2;
    } else {
      stats.totalPoints += -1;
      if (sess) sess.points[v.voterIndex] += -1;
    }
  });

  // 2) Impostor gets +1 for surviving a voting loop that continues
  if (result.type === "continue") {
    const impName = state.playersInGame[impIdx].name;
    const impStats = getOrCreateStats(impName);

    impStats.totalPoints += 1;
    if (sess) sess.points[impIdx] += 1;

    savePersistent();
    return; // round continues; do NOT increment roundsPlayed/imposterRounds here
  }

  // 3) If accusation resolves, round ends: count rounds + impostor round
  if (result.type === "accuse") {
    // Everyone participated in this completed round
    state.playersInGame.forEach((p, idx) => {
      const stats = getOrCreateStats(p.name);
      stats.roundsPlayed += 1;
      if (sess) sess.rounds[idx] += 1;
    });

    // Impostor round count
    const impName = state.playersInGame[impIdx].name;
    const impStats = getOrCreateStats(impName);
    impStats.imposterRounds += 1;
    if (sess) sess.imposterRounds[impIdx] += 1;

    const accusedIdx = result.targetIndex;
    const accusedIsImposter = accusedIdx === impIdx;

    // If group accused wrong person => impostor wins +3
    if (!accusedIsImposter) {
      impStats.imposterWins += 1;
      if (sess) sess.imposterWins[impIdx] += 1;

      impStats.totalPoints += 3;
      if (sess) sess.points[impIdx] += 3;
    }

    savePersistent();
  }
}

function applyScoringForImpostorDeclare(correct) {
  const impIdx = state.game.imposterIndex;
  const impName = state.playersInGame[impIdx].name;
  const impStats = getOrCreateStats(impName);
  const sess = state.session;

  // Round ends: everyone participated
  state.playersInGame.forEach((p, idx) => {
    const stats = getOrCreateStats(p.name);
    stats.roundsPlayed += 1;
    if (sess) sess.rounds[idx] += 1;
  });

  // Impostor round
  impStats.imposterRounds += 1;
  if (sess) sess.imposterRounds[impIdx] += 1;

  if (correct) {
    // Impostor wins
    impStats.imposterWins += 1;
    if (sess) sess.imposterWins[impIdx] += 1;

    impStats.totalPoints += 5;
    if (sess) sess.points[impIdx] += 5;
  } else {
    // Wrong guess penalty
    impStats.totalPoints += -2;
    if (sess) sess.points[impIdx] += -2;
  }

  savePersistent();
}

// ---------- 8) Round result screen ----------

function renderRoundResult() {
  const result = state.game.voting.result;
  const container = createEl("div", { className: "stack" });

  container.appendChild(createEl("div", {
    className: "round-indicator",
    text: `Round ${state.game.currentRound} of ${state.config.totalRounds}`
  }));

  const card = createEl("div", { className: "card stack" });

  if (result.type === "continue") {
    card.appendChild(createEl("h1", { className: "section-title", text: "The round continues" }));

    let reasonText = "Not enough players voted to accuse.";
    if (result.reason === "tieOnTarget") {
      reasonText = "There was a tie on who to accuse. The round continues.";
    }
    card.appendChild(createEl("p", { className: "hint", text: reasonText }));

    card.appendChild(createEl("p", {
      className: "hint",
      text: "Play another loop of one-word clues, then come back to vote again."
    }));

    // IMPORTANT: no points recap here (anti-leak)
  }
  else if (result.type === "accuse") {
    const accused = state.playersInGame[result.targetIndex];
    const isImposter = result.targetIndex === state.game.imposterIndex;

    card.appendChild(createEl("h1", {
      className: "section-title",
      text: `The group accuses ${accused.name}!`
    }));

    if (isImposter) {
      card.appendChild(createEl("p", {
        className: "hint",
        text: "They WERE the Impostor. Round ends here."
      }));
    } else {
      card.appendChild(createEl("p", {
        className: "hint",
        text: "They were NOT the Impostor. The real Impostor escapes and gains +3."
      }));
    }

    // Points recap (totals only)
    card.appendChild(renderPointsTotalsCard());
  }
  else if (result.type === "impDeclare") {
    const imp = state.playersInGame[state.game.imposterIndex];
    card.appendChild(createEl("h1", { className: "section-title", text: `Impostor ${imp.name} declares!` }));

    if (result.correct) {
      card.appendChild(createEl("p", { className: "hint", text: "Correct guess. The Impostor gains +5. Round ends." }));
    } else {
      card.appendChild(createEl("p", { className: "hint", text: "Wrong guess. The Impostor loses 2 points. Round ends." }));
    }

    // Points recap (totals only)
    card.appendChild(renderPointsTotalsCard());
  }

  const footer = createEl("div", { className: "footer-area" });

  if (result.type === "continue") {
    footer.appendChild(createEl("button", {
      className: "primary",
      text: "Next clue loop",
      onClick: () => {
        state.game.subRound += 1;
        state.game.voting = { voterIndex: 0, votes: [], pendingAccuserIndex: null, pendingContinueIndex: null, continueSlots: null, result: null };
        state.screen = "clueRound";
        render();
      }
    }));
  } else {
    const lastRound = state.game.currentRound >= state.config.totalRounds;

    footer.appendChild(createEl("button", {
      className: "primary",
      text: lastRound ? "See final results" : "Next round",
      onClick: () => {
        if (!lastRound) {
          state.game.currentRound += 1;
          state.game.subRound = 1;

          const card = pickRandomCardFromSelectedPack();
          state.game.currentCard = card;
          state.game.mainWord = card.word.toUpperCase();
          state.game.imposterClue = pickImposterClue(card);

          state.game.imposterIndex = Math.floor(Math.random() * state.playersInGame.length);
          state.game.revealIndex = 0;
          state.game.startingPlayerIndex = Math.floor(Math.random() * state.playersInGame.length);
          state.game.clueRevealed = false;
          state.game.voting = { voterIndex: 0, votes: [], pendingAccuserIndex: null, pendingContinueIndex: null, continueSlots: null, result: null };
          state.screen = "reveal";
        } else {
          state.screen = "gameOver";
        }
        render();
      }
    }));
  }

  container.appendChild(card);
  container.appendChild(footer);
  app.appendChild(container);
}

function renderPointsTotalsCard() {
  const sess = state.session || createEmptySession();
  const wrap = createEl("div", { className: "card stack" });

  wrap.appendChild(createEl("strong", { text: "Points totals (this game)" }));
  wrap.appendChild(createEl("p", {
    className: "hint",
    text: "Totals only (no breakdown) so the table can learn the system without leaking secret info."
  }));

  const list = createEl("div", { className: "stack" });

  state.playersInGame.forEach((p, idx) => {
    const pts = sess.points[idx] || 0;

    // Show colored name box + points
    list.appendChild(
      createEl("div", { className: "row" }, [
        createEl("div", { style: { width: "100%" } }, [
          makeNameBox(p.name),
          createEl("div", { className: "hint", text: `${pts} point${pts === 1 ? "" : "s"}` })
        ])
      ])
    );
  });

  wrap.appendChild(list);
  return wrap;
}

// ---------- 9) Game-over screen ----------

function renderGameOver() {
  const container = createEl("div", { className: "stack" });
  const sess = state.session || createEmptySession();

  // Increment gamesPlayed once per player
  state.playersInGame.forEach(p => {
    const s = getOrCreateStats(p.name);
    s.gamesPlayed += 1;
  });
  savePersistent();

  const card = createEl("div", { className: "card stack" });
  card.appendChild(createEl("h1", { className: "section-title", text: "Game complete" }));
  card.appendChild(createEl("p", {
    className: "hint",
    text: "Scores below are this game’s totals and lifetime totals on this device. Badges are lifetime."
  }));

  const list = createEl("div", { className: "stack" });
  state.playersInGame.forEach((p, idx) => {
    const stats = getOrCreateStats(p.name);
    const gamePoints = sess.points[idx] || 0;

    const badge = getPrimaryBadge(p.name);

    const row = createEl("div", { className: "card stack" });

    row.appendChild(createEl("div", { className: "row" }, [
      makeNameBox(p.name),
    ]));

    row.appendChild(createEl("div", { className: "row" }, [
      renderBadgeChip(badge)
    ]));

    row.appendChild(createEl("span", { className: "hint", text: `This game: ${gamePoints} pts` }));
    row.appendChild(createEl("span", {
      className: "hint",
      text:
        `Lifetime: ${stats.totalPoints} pts · Rounds: ${stats.roundsPlayed} · Games: ${stats.gamesPlayed} · Accuse accuracy: ` +
        `${(stats.totalVotes ? Math.round((stats.correctVotes / stats.totalVotes) * 100) : 0)}%`
    }));

    list.appendChild(row);
  });

  card.appendChild(list);

  const footer = createEl("div", { className: "footer-area" });
  footer.appendChild(createEl("button", {
    className: "primary",
    text: "Back to title",
    onClick: () => { state.screen = "splash"; render(); }
  }));

  container.appendChild(card);
  container.appendChild(footer);
  app.appendChild(container);
}

// ---------- Kick things off ----------
render();








