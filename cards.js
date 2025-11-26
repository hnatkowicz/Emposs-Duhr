// cards.js
// Word packs and categories for the Impostor game.
// This file only defines data; game logic lives in main.js.

const WORD_PACKS = [
  {
    id: "family_basic",
    label: "Family Pack (Everyday Things)",
    description: "Simple, family-friendly words everyone will recognize.",
    cards: [
      { id: "pineapple", word: "PINEAPPLE", clues: ["fruit", "tropical", "spiky"] },
      { id: "library", word: "LIBRARY", clues: ["books", "quiet", "card"] },
      { id: "piano", word: "PIANO", clues: ["keys", "music", "instrument"] },
      { id: "mountain", word: "MOUNTAIN", clues: ["tall", "rocky", "hiking"] },
      { id: "school_bus", word: "SCHOOL BUS", clues: ["yellow", "kids", "ride"] },
      { id: "toothbrush", word: "TOOTHBRUSH", clues: ["bristles", "bathroom", "teeth"] },
      { id: "snowman", word: "SNOWMAN", clues: ["winter", "carrot", "cold"] },
      { id: "backpack", word: "BACKPACK", clues: ["carry", "school", "zipper"] },
      { id: "telephone", word: "TELEPHONE", clues: ["ring", "call", "number"] },
      { id: "flashlight", word: "FLASHLIGHT", clues: ["battery", "beam", "dark"] },

      { id: "newspaper", word: "NEWSPAPER", clues: ["paper", "news", "read"] },
      { id: "bicycle", word: "BICYCLE", clues: ["pedal", "wheels", "ride"] },
      { id: "blanket", word: "BLANKET", clues: ["warm", "soft", "bed"] },
      { id: "mailbox", word: "MAILBOX", clues: ["letters", "post", "deliver"] },
      { id: "calendar", word: "CALENDAR", clues: ["dates", "months", "schedule"] },
      { id: "microwave", word: "MICROWAVE", clues: ["heat", "quick", "kitchen"] },
      { id: "umbrella", word: "UMBRELLA", clues: ["rain", "cover", "wet"] },
      { id: "headphones", word: "HEADPHONES", clues: ["music", "ear", "sound"] },
      { id: "pillow", word: "PILLOW", clues: ["sleep", "soft", "bed"] },
      { id: "notebook", word: "NOTEBOOK", clues: ["write", "paper", "school"] },

      { id: "keychain", word: "KEYCHAIN", clues: ["keys", "ring", "carry"] },
      { id: "airplane", word: "AIRPLANE", clues: ["fly", "wings", "travel"] },
      { id: "ladder", word: "LADDER", clues: ["steps", "climb", "tall"] },
      { id: "remote", word: "REMOTE", clues: ["control", "buttons", "tv"] },
      { id: "cupcake", word: "CUPCAKE", clues: ["sweet", "frosting", "cake"] },
      { id: "garden", word: "GARDEN", clues: ["plants", "grow", "soil"] },
      { id: "helmet", word: "HELMET", clues: ["safety", "head", "protect"] },
      { id: "vacuum", word: "VACUUM", clues: ["clean", "floor", "suction"] },
      { id: "popcorn", word: "POPCORN", clues: ["movie", "kernels", "butter"] },
      { id: "clock", word: "CLOCK", clues: ["time", "hands", "ticks"] }
    ]
  },
  {
    id: "family_food_animals",
    label: "Family Pack (Food & Animals)",
    description: "Safe, fun mix of foods and animals.",
    cards: [
      { id: "pizza", word: "PIZZA", clues: ["cheese", "slice", "delivery"] },
      { id: "strawberry", word: "STRAWBERRY", clues: ["red", "sweet", "seeds"] },
      { id: "elephant", word: "ELEPHANT", clues: ["large", "trunk", "gray"] },
      { id: "goldfish", word: "GOLDFISH", clues: ["orange", "tiny", "bowl"] },
      { id: "pancakes", word: "PANCAKES", clues: ["breakfast", "syrup", "stack"] },
      { id: "kangaroo", word: "KANGAROO", clues: ["pouch", "jump", "australia"] },
      { id: "popcorn", word: "POPCORN", clues: ["movie", "snack", "butter"] },
      { id: "banana", word: "BANANA", clues: ["yellow", "fruit", "peel"] },
      { id: "dolphin", word: "DOLPHIN", clues: ["ocean", "swim", "smart"] },
      { id: "waffles", word: "WAFFLES", clues: ["grid", "breakfast", "syrup"] },

      { id: "salmon", word: "SALMON", clues: ["fish", "pink", "river"] },
      { id: "turtle", word: "TURTLE", clues: ["shell", "slow", "reptile"] },
      { id: "hamburger", word: "HAMBURGER", clues: ["bun", "beef", "grill"] },
      { id: "owl", word: "OWL", clues: ["night", "hoot", "feathers"] },
      { id: "carrot", word: "CARROT", clues: ["orange", "crunchy", "vegetable"] },
      { id: "panda", word: "PANDA", clues: ["black", "white", "bamboo"] },
      { id: "macaroni", word: "MACARONI", clues: ["pasta", "cheese", "noodles"] },
      { id: "horse", word: "HORSE", clues: ["mane", "stable", "ride"] },
      { id: "cookie", word: "COOKIE", clues: ["bake", "sweet", "chocolate"] },
      { id: "fox", word: "FOX", clues: ["red", "clever", "forest"] },

      { id: "grapes", word: "GRAPES", clues: ["purple", "bunch", "fruit"] },
      { id: "penguin", word: "PENGUIN", clues: ["cold", "black", "waddle"] },
      { id: "corn", word: "CORN", clues: ["yellow", "cob", "kernels"] },
      { id: "seal", word: "SEAL", clues: ["ocean", "flippers", "bark"] },
      { id: "spaghetti", word: "SPAGHETTI", clues: ["noodles", "italian", "sauce"] },
      { id: "eagle", word: "EAGLE", clues: ["wings", "soar", "bird"] },
      { id: "donut", word: "DONUT", clues: ["hole", "sweet", "frosting"] },
      { id: "monkey", word: "MONKEY", clues: ["banana", "climb", "tail"] },
      { id: "broccoli", word: "BROCCOLI", clues: ["green", "vegetable", "tree"] },
      { id: "zebra", word: "ZEBRA", clues: ["stripes", "black", "white"] }
    ]
  }
];
