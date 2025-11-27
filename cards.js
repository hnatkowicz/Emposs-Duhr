// cards.js
// Word packs and categories for the Impostor game.
// This file only defines data; game logic lives in main.js.

const WORD_PACKS = [
  // -------------------------------------------------
  // 1) FAMILY BASIC – EVERYDAY THINGS (60)
  // -------------------------------------------------
  {
    id: "family_basic",
    label: "Family Pack (Everyday Things)",
    description: "Simple, family-friendly words everyone will recognize.",
    cards: [
      // Original 30
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
      { id: "headphones", word: "HEADPHONES", clues: ["music", "ears", "sound"] },
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
      { id: "popcorn_basic", word: "POPCORN", clues: ["movie", "kernels", "butter"] },
      { id: "clock", word: "CLOCK", clues: ["time", "hands", "ticks"] },

      // +30 more (everyday objects)
      { id: "scissors", word: "SCISSORS", clues: ["cut", "blades", "paper"] },
      { id: "eraser", word: "ERASER", clues: ["mistake", "pencil", "rub"] },
      { id: "backyard", word: "BACKYARD", clues: ["grass", "fence", "outside"] },
      { id: "mirror", word: "MIRROR", clues: ["reflection", "glass", "face"] },
      { id: "toaster", word: "TOASTER", clues: ["bread", "slot", "toast"] },
      { id: "suitcase", word: "SUITCASE", clues: ["travel", "handle", "wheels"] },
      { id: "wallet", word: "WALLET", clues: ["money", "cards", "pocket"] },
      { id: "keys", word: "KEYS", clues: ["door", "lock", "ring"] },
      { id: "stapler", word: "STAPLER", clues: ["paper", "office", "click"] },
      { id: "couch", word: "COUCH", clues: ["sofa", "sit", "living room"] },

      { id: "refrigerator", word: "REFRIGERATOR", clues: ["cold", "kitchen", "food"] },
      { id: "dishwasher", word: "DISHWASHER", clues: ["plates", "machine", "wash"] },
      { id: "sneakers", word: "SNEAKERS", clues: ["shoes", "laces", "run"] },
      { id: "marker", word: "MARKER", clues: ["ink", "color", "cap"] },
      { id: "highlighter", word: "HIGHLIGHTER", clues: ["bright", "yellow", "text"] },
      { id: "charger", word: "CHARGER", clues: ["phone", "plug", "battery"] },
      { id: "backpack_lunch", word: "LUNCHBOX", clues: ["food", "school", "container"] },
      { id: "napkin", word: "NAPKIN", clues: ["dinner", "wipe", "cloth"] },
      { id: "soap", word: "SOAP", clues: ["clean", "bubbles", "sink"] },
      { id: "shampoo", word: "SHAMPOO", clues: ["hair", "wash", "bottle"] },

      { id: "remote_car", word: "CAR KEYS", clues: ["ignition", "ring", "drive"] },
      { id: "playground_basic", word: "SWING", clues: ["chain", "seat", "back-and-forth"] },
      { id: "crayon_box", word: "CRAYON", clues: ["color", "wax", "draw"] },
      { id: "envelope", word: "ENVELOPE", clues: ["letter", "seal", "mail"] },
      { id: "gloves", word: "GLOVES", clues: ["hands", "winter", "warm"] },
      { id: "lamp", word: "LAMP", clues: ["light", "shade", "table"] },
      { id: "television", word: "TELEVISION", clues: ["screen", "shows", "remote"] },
      { id: "notebook_spiral", word: "SPIRAL NOTEBOOK", clues: ["wire", "pages", "school"] },
      { id: "printer", word: "PRINTER", clues: ["paper", "ink", "office"] },
      { id: "trashcan", word: "TRASH CAN", clues: ["garbage", "lid", "bag"] }
    ]
  },

  // -------------------------------------------------
  // 2) FAMILY FOOD & ANIMALS (60)
  // -------------------------------------------------
  {
    id: "family_food_animals",
    label: "Family Pack (Food & Animals)",
    description: "Safe, fun mix of foods and animals.",
    cards: [
      // Original 30
      { id: "pizza", word: "PIZZA", clues: ["cheese", "slice", "delivery"] },
      { id: "strawberry", word: "STRAWBERRY", clues: ["red", "sweet", "seeds"] },
      { id: "elephant", word: "ELEPHANT", clues: ["large", "trunk", "gray"] },
      { id: "goldfish", word: "GOLDFISH", clues: ["orange", "tiny", "bowl"] },
      { id: "pancakes", word: "PANCAKES", clues: ["breakfast", "syrup", "stack"] },
      { id: "kangaroo", word: "KANGAROO", clues: ["pouch", "jump", "australia"] },
      { id: "popcorn_food", word: "POPCORN", clues: ["snack", "salty", "bucket"] },
      { id: "banana", word: "BANANA", clues: ["yellow", "fruit", "peel"] },
      { id: "dolphin", word: "DOLPHIN", clues: ["ocean", "swim", "smart"] },
      { id: "waffles", word: "WAFFLES", clues: ["grid", "breakfast", "syrup"] },

      { id: "salmon", word: "SALMON", clues: ["fish", "pink", "river"] },
      { id: "turtle", word: "TURTLE", clues: ["shell", "slow", "reptile"] },
      { id: "hamburger", word: "HAMBURGER", clues: ["bun", "beef", "grill"] },
      { id: "owl", word: "OWL", clues: ["night", "hoot", "feathers"] },
      { id: "carrot_food", word: "CARROT", clues: ["orange", "crunchy", "vegetable"] },
      { id: "panda", word: "PANDA", clues: ["black", "white", "bamboo"] },
      { id: "macaroni", word: "MACARONI", clues: ["pasta", "cheese", "noodles"] },
      { id: "horse", word: "HORSE", clues: ["mane", "stable", "ride"] },
      { id: "cookie_food", word: "COOKIE", clues: ["bake", "sweet", "chocolate"] },
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
      { id: "zebra", word: "ZEBRA", clues: ["stripes", "black", "white"] },

      // +30 more (more food & animals)
      { id: "cheeseburger", word: "CHEESEBURGER", clues: ["cheese", "bun", "fast food"] },
      { id: "hotdog", word: "HOT DOG", clues: ["bun", "ketchup", "grill"] },
      { id: "orange", word: "ORANGE", clues: ["citrus", "peel", "juice"] },
      { id: "watermelon", word: "WATERMELON", clues: ["green", "red", "summer"] },
      { id: "blueberry", word: "BLUEBERRY", clues: ["tiny", "blue", "fruit"] },
      { id: "cheddar", word: "CHEESE", clues: ["slice", "dairy", "mouse"] },
      { id: "omelette", word: "OMELETTE", clues: ["eggs", "pan", "breakfast"] },
      { id: "milkshake", word: "MILKSHAKE", clues: ["straw", "thick", "cold"] },
      { id: "nachos", word: "NACHOS", clues: ["chips", "cheese", "share"] },
      { id: "pretzel", word: "PRETZEL", clues: ["twist", "salt", "snack"] },

      { id: "cat_food", word: "CATFISH", clues: ["whiskers", "river", "fish"] },
      { id: "parrot", word: "PARROT", clues: ["talk", "colorful", "bird"] },
      { id: "giraffe", word: "GIRAFFE", clues: ["neck", "spots", "tall"] },
      { id: "shark", word: "SHARK", clues: ["teeth", "ocean", "fin"] },
      { id: "rabbit", word: "RABBIT", clues: ["hop", "ears", "carrot"] },
      { id: "bear", word: "BEAR", clues: ["forest", "big", "hibernate"] },
      { id: "squirrel", word: "SQUIRREL", clues: ["nuts", "tail", "tree"] },
      { id: "peacock", word: "PEACOCK", clues: ["feathers", "colorful", "display"] },
      { id: "koala", word: "KOALA", clues: ["eucalyptus", "tree", "sleepy"] },
      { id: "bee", word: "BEE", clues: ["honey", "buzz", "sting"] },

      { id: "cereal", word: "CEREAL", clues: ["bowl", "milk", "breakfast"] },
      { id: "lasagna", word: "LASAGNA", clues: ["layers", "pasta", "baked"] },
      { id: "bagel", word: "BAGEL", clues: ["round", "hole", "toasted"] },
      { id: "taco", word: "TACO", clues: ["shell", "mexican", "filled"] },
      { id: "chicken_nuggets", word: "CHICKEN NUGGETS", clues: ["kids", "crispy", "dip"] },
      { id: "lion_food", word: "LIONFISH", clues: ["spines", "ocean", "stripes"] },
      { id: "hamster", word: "HAMSTER", clues: ["cage", "wheel", "tiny"] },
      { id: "goat", word: "GOAT", clues: ["horns", "farm", "bleat"] },
      { id: "turkey", word: "TURKEY", clues: ["feathers", "thanksgiving", "gobble"] },
      { id: "chocolate_bar", word: "CHOCOLATE BAR", clues: ["sweet", "wrapper", "treat"] }
    ]
  },

  // -------------------------------------------------
  // 3) KIDS PACK SIMPLE (60)
  // -------------------------------------------------
  {
    id: "kids_simple",
    label: "Kids Pack (Super Simple)",
    description: "Easy words for younger players and quick games.",
    cards: [
      // Original 30
      { id: "dog", word: "DOG", clues: ["bark", "pet", "tail"] },
      { id: "cat", word: "CAT", clues: ["meow", "whiskers", "pet"] },
      { id: "ball", word: "BALL", clues: ["round", "throw", "bounce"] },
      { id: "chair", word: "CHAIR", clues: ["sit", "legs", "seat"] },
      { id: "table", word: "TABLE", clues: ["dinner", "legs", "flat"] },
      { id: "apple_kids", word: "APPLE", clues: ["fruit", "red", "crunchy"] },
      { id: "train", word: "TRAIN", clues: ["tracks", "cars", "whistle"] },
      { id: "bed", word: "BED", clues: ["sleep", "pillow", "blanket"] },
      { id: "door", word: "DOOR", clues: ["open", "handle", "hinges"] },
      { id: "window", word: "WINDOW", clues: ["glass", "view", "frame"] },

      { id: "shoe", word: "SHOE", clues: ["foot", "laces", "pair"] },
      { id: "hat", word: "HAT", clues: ["head", "wear", "brim"] },
      { id: "bread", word: "BREAD", clues: ["slice", "loaf", "sandwich"] },
      { id: "car", word: "CAR", clues: ["drive", "wheels", "road"] },
      { id: "boat", word: "BOAT", clues: ["water", "float", "sail"] },
      { id: "tree", word: "TREE", clues: ["trunk", "leaves", "branches"] },
      { id: "star", word: "STAR", clues: ["night", "sky", "shine"] },
      { id: "rain", word: "RAIN", clues: ["clouds", "drops", "wet"] },
      { id: "sun", word: "SUN", clues: ["bright", "day", "hot"] },
      { id: "moon", word: "MOON", clues: ["night", "round", "sky"] },

      { id: "cookie_kids", word: "COOKIE", clues: ["sweet", "snack", "bake"] },
      { id: "icecream", word: "ICE CREAM", clues: ["cold", "cone", "scoops"] },
      { id: "robot", word: "ROBOT", clues: ["metal", "machine", "program"] },
      { id: "balloon", word: "BALLOON", clues: ["air", "string", "float"] },
      { id: "cloud", word: "CLOUD", clues: ["sky", "white", "fluffy"] },
      { id: "duck", word: "DUCK", clues: ["quack", "pond", "feathers"] },
      { id: "frog", word: "FROG", clues: ["jump", "pond", "green"] },
      { id: "lion", word: "LION", clues: ["roar", "mane", "savanna"] },
      { id: "teddy", word: "TEDDY BEAR", clues: ["toy", "soft", "hug"] },
      { id: "rocket", word: "ROCKET", clues: ["space", "launch", "fire"] },

      // +30 more (simple, kid-friendly)
      { id: "bus_kids", word: "BUS", clues: ["wheels", "ride", "yellow"] },
      { id: "cup", word: "CUP", clues: ["drink", "handle", "small"] },
      { id: "spoon", word: "SPOON", clues: ["stir", "bowl", "metal"] },
      { id: "fork", word: "FORK", clues: ["prongs", "eat", "table"] },
      { id: "pencil", word: "PENCIL", clues: ["write", "eraser", "sharp"] },
      { id: "crayon", word: "CRAYON", clues: ["color", "wax", "draw"] },
      { id: "drum", word: "DRUM", clues: ["beat", "stick", "music"] },
      { id: "guitar", word: "GUITAR", clues: ["strings", "music", "strum"] },
      { id: "swing_kids", word: "SWING", clues: ["playground", "seat", "chain"] },
      { id: "slide", word: "SLIDE", clues: ["playground", "down", "ladder"] },

      { id: "milk", word: "MILK", clues: ["drink", "white", "fridge"] },
      { id: "banana_kids", word: "BANANA", clues: ["yellow", "peel", "monkey"] },
      { id: "sock", word: "SOCK", clues: ["foot", "pair", "drawer"] },
      { id: "pants", word: "PANTS", clues: ["legs", "wear", "pockets"] },
      { id: "shirt", word: "SHIRT", clues: ["buttons", "top", "clothes"] },
      { id: "kite", word: "KITE", clues: ["string", "wind", "fly"] },
      { id: "train_tracks", word: "TRACKS", clues: ["rails", "train", "metal"] },
      { id: "doll", word: "DOLL", clues: ["toy", "hair", "dress"] },
      { id: "blocks", word: "BLOCKS", clues: ["stack", "toy", "build"] },
      { id: "sandcastle", word: "SANDCASTLE", clues: ["beach", "buckets", "build"] },

      { id: "pizza_kids", word: "PIZZA", clues: ["cheese", "triangle", "party"] },
      { id: "cookie_jar", word: "COOKIE JAR", clues: ["lid", "sweet", "kitchen"] },
      { id: "snow_kids", word: "SNOW", clues: ["white", "cold", "flakes"] },
      { id: "pumpkin", word: "PUMPKIN", clues: ["orange", "carve", "fall"] },
      { id: "train_engine", word: "ENGINE", clues: ["front", "train", "pull"] },
      { id: "airplane_kids", word: "PLANE", clues: ["wings", "sky", "fly"] },
      { id: "castle_kids", word: "CASTLE", clues: ["princess", "tower", "walls"] },
      { id: "rainbow", word: "RAINBOW", clues: ["colors", "sky", "arch"] },
      { id: "robot_toy", word: "TOY ROBOT", clues: ["batteries", "buttons", "move"] },
      { id: "ice_skates", word: "ICE SKATES", clues: ["blades", "rink", "glide"] }
    ]
  },

  // -------------------------------------------------
  // 4) NATURE & PLACES (60)
  // -------------------------------------------------
  {
    id: "nature_places",
    label: "Nature & Places Pack",
    description: "Outdoor scenes, natural things, and familiar locations.",
    cards: [
      // Original 30
      { id: "forest", word: "FOREST", clues: ["trees", "shadows", "wild"] },
      { id: "desert", word: "DESERT", clues: ["sand", "dry", "cactus"] },
      { id: "beach", word: "BEACH", clues: ["sand", "waves", "umbrella"] },
      { id: "river", word: "RIVER", clues: ["flow", "water", "current"] },
      { id: "waterfall", word: "WATERFALL", clues: ["falling", "cliff", "spray"] },
      { id: "volcano", word: "VOLCANO", clues: ["lava", "mountain", "eruption"] },
      { id: "cave", word: "CAVE", clues: ["dark", "rock", "echo"] },
      { id: "valley", word: "VALLEY", clues: ["between", "hills", "low"] },
      { id: "island", word: "ISLAND", clues: ["water", "surrounded", "shore"] },
      { id: "glacier", word: "GLACIER", clues: ["ice", "slow", "cold"] },

      { id: "park", word: "PARK", clues: ["bench", "trees", "playground"] },
      { id: "museum", word: "MUSEUM", clues: ["exhibits", "quiet", "history"] },
      { id: "zoo", word: "ZOO", clues: ["animals", "enclosure", "visit"] },
      { id: "farm", word: "FARM", clues: ["barn", "animals", "fields"] },
      { id: "city", word: "CITY", clues: ["buildings", "traffic", "crowds"] },
      { id: "village", word: "VILLAGE", clues: ["small", "houses", "quiet"] },
      { id: "castle", word: "CASTLE", clues: ["walls", "towers", "old"] },
      { id: "bridge", word: "BRIDGE", clues: ["cross", "river", "arches"] },
      { id: "harbor", word: "HARBOR", clues: ["boats", "dock", "water"] },
      { id: "stadium", word: "STADIUM", clues: ["seats", "cheer", "game"] },

      { id: "meadow", word: "MEADOW", clues: ["grass", "flowers", "open"] },
      { id: "rainforest", word: "RAINFOREST", clues: ["dense", "wet", "tropical"] },
      { id: "canyon", word: "CANYON", clues: ["steep", "rock", "deep"] },
      { id: "prairie", word: "PRAIRIE", clues: ["grassland", "flat", "wide"] },
      { id: "lighthouse", word: "LIGHTHOUSE", clues: ["tower", "coast", "light"] },
      { id: "airport", word: "AIRPORT", clues: ["planes", "gates", "luggage"] },
      { id: "market", word: "MARKET", clues: ["stalls", "buy", "crowd"] },
      { id: "playground_place", word: "PLAYGROUND", clues: ["slides", "swings", "kids"] },
      { id: "subway", word: "SUBWAY", clues: ["underground", "train", "station"] },
      { id: "mountain_lake", word: "MOUNTAIN LAKE", clues: ["water", "high", "calm"] },

      // +30 more (more nature & locations)
      { id: "orchard", word: "ORCHARD", clues: ["trees", "fruit", "rows"] },
      { id: "cliff", word: "CLIFF", clues: ["edge", "drop", "rock"] },
      { id: "lagoon", word: "LAGOON", clues: ["shallow", "water", "tropical"] },
      { id: "marsh", word: "MARSH", clues: ["wetland", "reeds", "muddy"] },
      { id: "tundra", word: "TUNDRA", clues: ["cold", "frozen", "north"] },
      { id: "savanna", word: "SAVANNA", clues: ["grass", "Africa", "scattered trees"] },
      { id: "reef", word: "CORAL REEF", clues: ["colorful", "fish", "shallow"] },
      { id: "grotto", word: "GROTTO", clues: ["small", "cave", "water"] },
      { id: "dune", word: "SAND DUNE", clues: ["wind", "desert", "hill"] },
      { id: "geyser", word: "GEYSER", clues: ["steam", "spray", "eruption"] },

      { id: "cafe", word: "CAFÉ", clues: ["coffee", "table", "counter"] },
      { id: "library_place", word: "PUBLIC LIBRARY", clues: ["books", "quiet", "card"] },
      { id: "school", word: "SCHOOL", clues: ["classroom", "students", "teacher"] },
      { id: "hospital", word: "HOSPITAL", clues: ["doctors", "rooms", "emergency"] },
      { id: "theater", word: "THEATER", clues: ["stage", "curtains", "play"] },
      { id: "cinema", word: "MOVIE THEATER", clues: ["screen", "seats", "tickets"] },
      { id: "library_campus", word: "CAMPUS", clues: ["college", "buildings", "students"] },
      { id: "parking_lot", word: "PARKING LOT", clues: ["cars", "lines", "asphalt"] },
      { id: "mall", word: "MALL", clues: ["shops", "food court", "indoors"] },
      { id: "bakery_place", word: "BAKERY", clues: ["bread", "pastries", "smell"] },

      { id: "lane", word: "COUNTRY ROAD", clues: ["narrow", "fields", "drive"] },
      { id: "pier", word: "PIER", clues: ["water", "walkway", "posts"] },
      { id: "campground", word: "CAMPGROUND", clues: ["tents", "fire", "sites"] },
      { id: "ski_resort", word: "SKI RESORT", clues: ["snow", "slopes", "lift"] },
      { id: "observatory", word: "OBSERVATORY", clues: ["telescope", "stars", "dome"] },
      { id: "plaza", word: "TOWN SQUARE", clues: ["fountain", "center", "gather"] },
      { id: "boardwalk", word: "BOARDWALK", clues: ["wood", "shops", "beach"] },
      { id: "amusement_park", word: "AMUSEMENT PARK", clues: ["rides", "roller coaster", "tickets"] },
      { id: "bridge_suspension", word: "SUSPENSION BRIDGE", clues: ["cables", "span", "river"] },
      { id: "bus_stop", word: "BUS STOP", clues: ["sign", "bench", "route"] }
    ]
  },

  // -------------------------------------------------
  // 5) BANDS & SINGERS PACK (60)
  // -------------------------------------------------
  {
    id: "bands_singers",
    label: "Bands & Singers",
    description: "Well-known musical artists across decades.",
    cards: [
      // Classic + modern mix
      { id: "beatles", word: "THE BEATLES", clues: ["british", "abbey road", "legendary"] },
      { id: "queen", word: "QUEEN", clues: ["freddie", "rock", "stadium"] },
      { id: "rolling_stones", word: "THE ROLLING STONES", clues: ["rock", "lips", "tour"] },
      { id: "led_zeppelin", word: "LED ZEPPELIN", clues: ["stairway", "rock", "english"] },
      { id: "pink_floyd", word: "PINK FLOYD", clues: ["psychedelic", "wall", "prism"] },
      { id: "u2", word: "U2", clues: ["irish", "bono", "stadium"] },
      { id: "coldplay", word: "COLDPLAY", clues: ["british", "colorful", "arena"] },
      { id: "radiohead", word: "RADIOHEAD", clues: ["alternative", "thom", "moody"] },
      { id: "nirvana", word: "NIRVANA", clues: ["grunge", "kurt", "90s"] },
      { id: "foo_fighters", word: "FOO FIGHTERS", clues: ["rock", "dave", "arena"] },

      { id: "taylor_swift", word: "TAYLOR SWIFT", clues: ["singer", "albums", "tours"] },
      { id: "adele", word: "ADELE", clues: ["british", "ballads", "voice"] },
      { id: "beyonce", word: "BEYONCÉ", clues: ["queen", "pop", "powerful"] },
      { id: "bruno_mars", word: "BRUNO MARS", clues: ["pop", "funky", "performer"] },
      { id: "ed_sheeran", word: "ED SHEERAN", clues: ["guitar", "singer", "redhead"] },
      { id: "rihanna", word: "RIHANNA", clues: ["barbados", "hits", "fashion"] },
      { id: "lady_gaga", word: "LADY GAGA", clues: ["costumes", "pop", "piano"] },
      { id: "bts", word: "BTS", clues: ["k-pop", "group", "dance"] },
      { id: "billie_eilish", word: "BILLIE EILISH", clues: ["whispery", "green", "alt pop"] },
      { id: "harry_styles", word: "HARRY STYLES", clues: ["solo", "charm", "brit"] },

      { id: "elvis", word: "ELVIS PRESLEY", clues: ["king", "memphis", "jumpsuit"] },
      { id: "michael_jackson", word: "MICHAEL JACKSON", clues: ["glove", "dance", "pop"] },
      { id: "madonna", word: "MADONNA", clues: ["80s", "reinvention", "pop"] },
      { id: "prince", word: "PRINCE", clues: ["purple", "guitar", "minneapolis"] },
      { id: "whitney", word: "WHITNEY HOUSTON", clues: ["voice", "ballads", "icon"] },
      { id: "celine", word: "CELINE DION", clues: ["ballads", "titanic", "vegas"] },
      { id: "mariah", word: "MARIAH CAREY", clues: ["high notes", "90s", "holiday"] },
      { id: "journey", word: "JOURNEY", clues: ["rock", "ballad", "arena"] },
      { id: "bon_jovi", word: "BON JOVI", clues: ["rock", "hair", "anthem"] },
      { id: "eagles", word: "EAGLES", clues: ["california", "harmony", "band"] },

      { id: "imagine_dragons", word: "IMAGINE DRAGONS", clues: ["modern", "rock", "anthem"] },
      { id: "maroon5", word: "MAROON 5", clues: ["pop", "adam", "band"] },
      { id: "linkin_park", word: "LINKIN PARK", clues: ["rock", "nu-metal", "chester"] },
      { id: "metallica", word: "METALLICA", clues: ["metal", "black album", "guitars"] },
      { id: "green_day", word: "GREEN DAY", clues: ["punk", "california", "90s"] },
      { id: "red_hot_chili", word: "RED HOT CHILI PEPPERS", clues: ["funk", "california", "band"] },
      { id: "arctic_monkeys", word: "ARCTIC MONKEYS", clues: ["british", "indie", "band"] },
      { id: "the_weeknd", word: "THE WEEKND", clues: ["r&b", "falsetto", "canadian"] },
      { id: "drake", word: "DRAKE", clues: ["rap", "toronto", "hits"] },
      { id: "post_malone", word: "POST MALONE", clues: ["tattoos", "melody", "rap"] },

      { id: "fleetwood_mac", word: "FLEETWOOD MAC", clues: ["classic", "harmonies", "rumours"] },
      { id: "abba", word: "ABBA", clues: ["swedish", "disco", "group"] },
      { id: "bee_gees", word: "BEE GEES", clues: ["falsetto", "70s", "disco"] },
      { id: "pink", word: "P!NK", clues: ["pop", "aerial", "attitude"] },
      { id: "shakira", word: "SHAKIRA", clues: ["hips", "dance", "bilingual"] },
      { id: "usher", word: "USHER", clues: ["r&b", "dance", "2000s"] },
      { id: "coldplay_alt", word: "CHRIS MARTIN", clues: ["frontman", "piano", "band"] },
      { id: "john_legend", word: "JOHN LEGEND", clues: ["piano", "ballads", "voice"] },
      { id: "sia", word: "SIA", clues: ["songwriter", "wig", "powerful"] },
      { id: "dollywood", word: "DOLLY PARTON", clues: ["country", "songwriter", "icon"] },

      { id: "lizzo", word: "LIZZO", clues: ["flute", "confidence", "pop"] },
      { id: "kendrick", word: "KENDRICK LAMAR", clues: ["rap", "pulitzer", "lyrics"] },
      { id: "dua_lipa", word: "DUA LIPA", clues: ["pop", "dance", "british"] },
      { id: "the_killers", word: "THE KILLERS", clues: ["rock", "las vegas", "band"] },
      { id: "blink182", word: "BLINK-182", clues: ["pop punk", "trio", "90s"] },
      { id: "mumford_sons", word: "MUMFORD & SONS", clues: ["folk", "banjo", "band"] },
      { id: "paramore", word: "PARAMORE", clues: ["rock", "hayley", "band"] },
      { id: "the_police", word: "THE POLICE", clues: ["trio", "sting", "80s"] },
      { id: "foo_side", word: "DAVE GROHL", clues: ["drums", "guitar", "frontman"] },
      { id: "simon_garfunkel", word: "SIMON & GARFUNKEL", clues: ["duo", "folk", "harmonies"] }
    ]
  },

  // -------------------------------------------------
  // 6) ADULT WINK PACK (60) – light innuendo, no explicit
  // -------------------------------------------------
  {
    id: "adult_wink",
    label: "Adult Pack (Wink, Wink)",
    description: "Double meanings, flirty vibes, and suggestive-but-safe words.",
    cards: [
      // Date-night / suggestive but PG-13
      { id: "flirt", word: "FLIRT", clues: ["tease", "smile", "attention"] },
      { id: "romance", word: "ROMANCE", clues: ["candlelight", "feelings", "date"] },
      { id: "secret_crush", word: "CRUSH", clues: ["hidden", "admire", "butterflies"] },
      { id: "date_night", word: "DATE NIGHT", clues: ["reservations", "babysitter", "late"] },
      { id: "midnight", word: "MIDNIGHT", clues: ["late", "dark", "whisper"] },
      { id: "pillow_talk", word: "PILLOW TALK", clues: ["whisper", "bed", "close"] },
      { id: "champagne", word: "CHAMPAGNE", clues: ["bubbles", "toast", "celebration"] },
      { id: "candlelight", word: "CANDLELIGHT", clues: ["dim", "glow", "table"] },
      { id: "lingering", word: "LINGER", clues: ["stay", "close", "slow"] },
      { id: "after_hours", word: "AFTER HOURS", clues: ["closed", "late", "private"] },

      { id: "double_entendre", word: "DOUBLE MEANING", clues: ["phrase", "hint", "wink"] },
      { id: "naughty_list", word: "NAUGHTY LIST", clues: ["holiday", "behavior", "trouble"] },
      { id: "sneak_away", word: "SNEAK AWAY", clues: ["quiet", "leave", "alone"] },
      { id: "private_joke", word: "INSIDE JOKE", clues: ["shared", "memory", "laugh"] },
      { id: "chemistry", word: "CHEMISTRY", clues: ["spark", "science", "reaction"] },
      { id: "stolen_kiss", word: "STOLEN KISS", clues: ["quick", "surprise", "secret"] },
      { id: "late_text", word: "LATE-NIGHT TEXT", clues: ["phone", "ping", "hmm"] },
      { id: "dress_up", word: "DRESS UP", clues: ["fancy", "heels", "suit"] },
      { id: "slow_dance", word: "SLOW DANCE", clues: ["close", "music", "sway"] },
      { id: "couch_time", word: "COUCH TIME", clues: ["quiet", "close", "show"] },

      // Food/drinks with innuendo potential but clean on their face
      { id: "chocolate_strawberries", word: "CHOCOLATE STRAWBERRIES", clues: ["dessert", "dip", "sweet"] },
      { id: "fondue", word: "FONDUE", clues: ["melted", "share", "forks"] },
      { id: "spicy_food", word: "SPICY", clues: ["heat", "flavor", "kick"] },
      { id: "hot_sauce", word: "HOT SAUCE", clues: ["bottle", "drip", "fire"] },
      { id: "banana_split", word: "BANANA SPLIT", clues: ["ice cream", "dish", "toppings"] },
      { id: "cherry_on_top", word: "CHERRY ON TOP", clues: ["extra", "finish", "sweet"] },
      { id: "cocktail", word: "COCKTAIL", clues: ["drink", "shaker", "glass"] },
      { id: "nightcap", word: "NIGHTCAP", clues: ["last", "sip", "late"] },
      { id: "room_service", word: "ROOM SERVICE", clues: ["tray", "hotel", "knock"] },
      { id: "breakfast_in_bed", word: "BREAKFAST IN BED", clues: ["tray", "morning", "treat"] },

      // Situations with playful double meaning
      { id: "closed_door", word: "CLOSED DOOR", clues: ["privacy", "handle", "behind"] },
      { id: "do_not_disturb", word: "DO NOT DISTURB", clues: ["sign", "hotel", "privacy"] },
      { id: "late_checkout", word: "LATE CHECKOUT", clues: ["hotel", "extra", "time"] },
      { id: "stay_over", word: "SLEEPOVER", clues: ["stay", "overnight", "pajamas"] },
      { id: "bathtub", word: "BATHTUB", clues: ["water", "bubbles", "soak"] },
      { id: "hot_tub", word: "HOT TUB", clues: ["jets", "bubbles", "warm"] },
      { id: "masquerade", word: "MASQUERADE", clues: ["mask", "party", "mystery"] },
      { id: "blind_date", word: "BLIND DATE", clues: ["first", "unknown", "meet"] },
      { id: "open_bar", word: "OPEN BAR", clues: ["reception", "drinks", "tab"] },
      { id: "karaoke", word: "KARAOKE", clues: ["microphone", "sing", "night"] },

      // Slightly cheeky, but still safe words
      { id: "flustered", word: "FLUSTERED", clues: ["blush", "words", "nervous"] },
      { id: "wink", word: "WINK", clues: ["eye", "signal", "secret"] },
      { id: "tease", word: "TEASE", clues: ["playful", "edge", "push"] },
      { id: "temptation", word: "TEMPTATION", clues: ["hard", "resist", "draw"] },
      { id: "spark", word: "SPARK", clues: ["little", "start", "electric"] },
      { id: "moody_lighting", word: "MOODY LIGHTING", clues: ["dim", "colored", "atmosphere"] },
      { id: "stargazing", word: "STARGAZING", clues: ["blanket", "outside", "night"] },
      { id: "hand_in_hand", word: "HAND IN HAND", clues: ["walk", "fingers", "close"] },
      { id: "back_row", word: "BACK ROW", clues: ["theater", "far", "seats"] },
      { id: "whisper", word: "WHISPER", clues: ["quiet", "ear", "close"] },

      // Slight romance/relationship angle, still PG
      { id: "plus_one", word: "PLUS ONE", clues: ["invite", "guest", "event"] },
      { id: "first_kiss", word: "FIRST KISS", clues: ["nervous", "moment", "story"] },
      { id: "honeymoon", word: "HONEYMOON", clues: ["trip", "newlywed", "away"] },
      { id: "old_flame", word: "OLD FLAME", clues: ["past", "memory", "spark"] },
      { id: "favorite_song", word: "OUR SONG", clues: ["music", "shared", "special"] },
      { id: "saved_contact", word: "SPECIAL CONTACT", clues: ["phone", "heart", "name"] },
      { id: "walk_of_shame", word: "EARLY WALK", clues: ["morning", "quiet", "home"] },
      { id: "borrowed_shirt", word: "BORROWED SHIRT", clues: ["oversized", "comfy", "smell"] },
      { id: "secret_spot", word: "SECRET SPOT", clues: ["hideaway", "favorite", "place"] },
      { id: "inside_smile", word: "KNOWING SMILE", clues: ["eyes", "hint", "shared"] }
    ]
  }
];
