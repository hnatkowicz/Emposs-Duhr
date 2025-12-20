// cards.js
// Word packs and categories for the Impostor game.
// This file only defines data; game logic lives in main.js.

const WORD_PACKS = [
    // -------------------------------------------------
  // 1) FAMILY BASIC – EVERYDAY THINGS (200)
  // -------------------------------------------------
  // -------------------------------------------------
// KIDS PACK SIMPLE (150) – REPLACEMENT
// -------------------------------------------------
{
  id: "kids_simple",
  label: "Kids Pack (Super Simple)",
  description: "Easy, familiar words for younger players and quick games.",
  cards: [
    { id: "k_dog", word: "DOG", clues: ["barks", "pet", "tail"] },
    { id: "k_cat", word: "CAT", clues: ["meows", "whiskers", "pet"] },
    { id: "k_fish", word: "FISH", clues: ["swims", "fins", "water"] },
    { id: "k_bird", word: "BIRD", clues: ["flies", "feathers", "beak"] },
    { id: "k_frog", word: "FROG", clues: ["jumps", "green", "pond"] },
    { id: "k_duck", word: "DUCK", clues: ["quacks", "pond", "feathers"] },
    { id: "k_cow", word: "COW", clues: ["moo", "farm", "milk"] },
    { id: "k_horse", word: "HORSE", clues: ["mane", "ride", "stable"] },
    { id: "k_sheep", word: "SHEEP", clues: ["wool", "baa", "farm"] },
    { id: "k_pig", word: "PIG", clues: ["oink", "mud", "farm"] },

    { id: "k_ball", word: "BALL", clues: ["round", "bounce", "throw"] },
    { id: "k_doll", word: "DOLL", clues: ["toy", "dress", "hair"] },
    { id: "k_blocks", word: "BLOCKS", clues: ["stack", "build", "toy"] },
    { id: "k_teddy", word: "TEDDY BEAR", clues: ["soft", "hug", "toy"] },
    { id: "k_kite", word: "KITE", clues: ["string", "wind", "fly"] },
    { id: "k_bike", word: "BIKE", clues: ["pedals", "wheels", "ride"] },
    { id: "k_scooter", word: "SCOOTER", clues: ["push", "wheels", "ride"] },
    { id: "k_swing", word: "SWING", clues: ["playground", "back and forth", "seat"] },
    { id: "k_slide", word: "SLIDE", clues: ["playground", "down", "ladder"] },
    { id: "k_seesaw", word: "SEESAW", clues: ["up and down", "playground", "two"] },

    { id: "k_apple", word: "APPLE", clues: ["fruit", "red", "crunchy"] },
    { id: "k_banana", word: "BANANA", clues: ["yellow", "peel", "fruit"] },
    { id: "k_orange", word: "ORANGE", clues: ["citrus", "juice", "round"] },
    { id: "k_grapes", word: "GRAPES", clues: ["bunch", "small", "fruit"] },
    { id: "k_cookie", word: "COOKIE", clues: ["sweet", "baked", "snack"] },
    { id: "k_cake", word: "CAKE", clues: ["birthday", "candles", "sweet"] },
    { id: "k_icecream", word: "ICE CREAM", clues: ["cold", "scoop", "cone"] },
    { id: "k_pizza", word: "PIZZA", clues: ["cheese", "slice", "round"] },
    { id: "k_sandwich", word: "SANDWICH", clues: ["bread", "lunch", "layers"] },
    { id: "k_milk", word: "MILK", clues: ["drink", "white", "cold"] },

    { id: "k_sun", word: "SUN", clues: ["bright", "day", "hot"] },
    { id: "k_moon", word: "MOON", clues: ["night", "sky", "round"] },
    { id: "k_star", word: "STAR", clues: ["twinkle", "night", "sky"] },
    { id: "k_cloud", word: "CLOUD", clues: ["sky", "white", "fluffy"] },
    { id: "k_rain", word: "RAIN", clues: ["wet", "drops", "clouds"] },
    { id: "k_snow", word: "SNOW", clues: ["cold", "white", "flakes"] },
    { id: "k_rainbow", word: "RAINBOW", clues: ["colors", "arc", "sky"] },
    { id: "k_tree", word: "TREE", clues: ["leaves", "trunk", "tall"] },
    { id: "k_flower", word: "FLOWER", clues: ["petals", "pretty", "plant"] },
    { id: "k_grass", word: "GRASS", clues: ["green", "lawn", "soft"] },

    { id: "k_car", word: "CAR", clues: ["drive", "wheels", "road"] },
    { id: "k_bus", word: "BUS", clues: ["big", "ride", "many seats"] },
    { id: "k_train", word: "TRAIN", clues: ["tracks", "cars", "whistle"] },
    { id: "k_plane", word: "PLANE", clues: ["fly", "wings", "sky"] },
    { id: "k_boat", word: "BOAT", clues: ["water", "float", "ride"] },
    { id: "k_firetruck", word: "FIRE TRUCK", clues: ["red", "ladder", "sirens"] },
    { id: "k_policecar", word: "POLICE CAR", clues: ["lights", "sirens", "officer"] },
    { id: "k_ambulance", word: "AMBULANCE", clues: ["emergency", "lights", "hospital"] },
    { id: "k_bicycle", word: "BICYCLE", clues: ["two wheels", "pedals", "helmet"] },
    { id: "k_skateboard", word: "SKATEBOARD", clues: ["board", "wheels", "tricks"] },

    { id: "k_hat", word: "HAT", clues: ["head", "wear", "top"] },
    { id: "k_shoes", word: "SHOES", clues: ["feet", "pair", "laces"] },
    { id: "k_socks", word: "SOCKS", clues: ["feet", "pair", "soft"] },
    { id: "k_shirt", word: "SHIRT", clues: ["top", "wear", "buttons"] },
    { id: "k_pants", word: "PANTS", clues: ["legs", "wear", "pockets"] },
    { id: "k_jacket", word: "JACKET", clues: ["zipper", "warm", "wear"] },
    { id: "k_backpack", word: "BACKPACK", clues: ["carry", "school", "straps"] },
    { id: "k_lunchbox", word: "LUNCHBOX", clues: ["food", "school", "container"] },
    { id: "k_hat_cap", word: "CAP", clues: ["hat", "bill", "head"] },
    { id: "k_gloves", word: "GLOVES", clues: ["hands", "warm", "pair"] },

    { id: "k_bed", word: "BED", clues: ["sleep", "pillow", "blanket"] },
    { id: "k_chair", word: "CHAIR", clues: ["sit", "legs", "seat"] },
    { id: "k_table", word: "TABLE", clues: ["flat", "eat", "legs"] },
    { id: "k_couch", word: "COUCH", clues: ["sit", "soft", "living room"] },
    { id: "k_lamp", word: "LAMP", clues: ["light", "shade", "table"] },
    { id: "k_clock", word: "CLOCK", clues: ["time", "ticks", "numbers"] },
    { id: "k_window", word: "WINDOW", clues: ["glass", "look", "frame"] },
    { id: "k_door", word: "DOOR", clues: ["open", "close", "handle"] },
    { id: "k_mirror", word: "MIRROR", clues: ["reflection", "glass", "see yourself"] },
    { id: "k_rug", word: "RUG", clues: ["floor", "soft", "decorate"] },

    { id: "k_book", word: "BOOK", clues: ["read", "pages", "story"] },
    { id: "k_crayon", word: "CRAYON", clues: ["color", "wax", "draw"] },
    { id: "k_marker", word: "MARKER", clues: ["ink", "color", "cap"] },
    { id: "k_pencil", word: "PENCIL", clues: ["write", "eraser", "sharp"] },
    { id: "k_paper", word: "PAPER", clues: ["draw", "write", "flat"] },
    { id: "k_scissors", word: "SCISSORS", clues: ["cut", "blades", "paper"] },
    { id: "k_glue", word: "GLUE", clues: ["stick", "craft", "sticky"] },
    { id: "k_notebook", word: "NOTEBOOK", clues: ["pages", "school", "write"] },
    { id: "k_backboard", word: "CHALKBOARD", clues: ["write", "school", "erase"] },
    { id: "k_calculator", word: "CALCULATOR", clues: ["numbers", "buttons", "math"] }
  ]
}
,

  // -------------------------------------------------
  // 2) FAMILY FOOD & ANIMALS (200)
  // -------------------------------------------------
 // -------------------------------------------------
// FAMILY FOOD & ANIMALS (150) – REPLACEMENT
// -------------------------------------------------
{
  id: "family_food_animals",
  label: "Family Pack (Food & Animals)",
  description: "A fun, family-safe mix of foods and animals everyone recognizes.",
  cards: [
    // ---------- FOODS (75) ----------
    { id: "fa_pizza", word: "PIZZA", clues: ["cheese", "slice", "oven"] },
    { id: "fa_burger", word: "BURGER", clues: ["bun", "patty", "grill"] },
    { id: "fa_hotdog", word: "HOT DOG", clues: ["bun", "mustard", "cookout"] },
    { id: "fa_taco", word: "TACO", clues: ["shell", "fillings", "handheld"] },
    { id: "fa_spaghetti", word: "SPAGHETTI", clues: ["noodles", "sauce", "fork"] },
    { id: "fa_lasagna", word: "LASAGNA", clues: ["layers", "baked", "pasta"] },
    { id: "fa_mac_cheese", word: "MAC AND CHEESE", clues: ["pasta", "cheesy", "comfort"] },
    { id: "fa_fried_chicken", word: "FRIED CHICKEN", clues: ["crispy", "drumstick", "oil"] },
    { id: "fa_grilled_cheese", word: "GRILLED CHEESE", clues: ["melted", "bread", "pan"] },
    { id: "fa_pbj", word: "PB&J", clues: ["sandwich", "sweet", "sticky"] },

    { id: "fa_pancakes", word: "PANCAKES", clues: ["flat", "syrup", "stack"] },
    { id: "fa_waffles", word: "WAFFLES", clues: ["grid", "toaster", "syrup"] },
    { id: "fa_omelet", word: "OMELET", clues: ["eggs", "folded", "pan"] },
    { id: "fa_cereal", word: "CEREAL", clues: ["bowl", "milk", "morning"] },
    { id: "fa_toast", word: "TOAST", clues: ["bread", "butter", "golden"] },
    { id: "fa_bagel", word: "BAGEL", clues: ["round", "hole", "toasted"] },
    { id: "fa_muffin", word: "MUFFIN", clues: ["baked", "cup", "breakfast"] },
    { id: "fa_donut", word: "DONUT", clues: ["hole", "sweet", "frosted"] },
    { id: "fa_cookie", word: "COOKIE", clues: ["baked", "sweet", "crumbs"] },
    { id: "fa_brownie", word: "BROWNIE", clues: ["chocolate", "square", "dense"] },

    { id: "fa_apple", word: "APPLE", clues: ["crunchy", "round", "core"] },
    { id: "fa_banana", word: "BANANA", clues: ["yellow", "peel", "curved"] },
    { id: "fa_orange", word: "ORANGE", clues: ["citrus", "segments", "juice"] },
    { id: "fa_grapes", word: "GRAPES", clues: ["bunch", "small", "round"] },
    { id: "fa_strawberry", word: "STRAWBERRY", clues: ["red", "seeds", "sweet"] },
    { id: "fa_blueberries", word: "BLUEBERRIES", clues: ["small", "blue", "berries"] },
    { id: "fa_watermelon", word: "WATERMELON", clues: ["green", "red", "seeds"] },
    { id: "fa_pineapple", word: "PINEAPPLE", clues: ["spiky", "tropical", "sweet"] },
    { id: "fa_peach", word: "PEACH", clues: ["fuzzy", "pit", "soft"] },
    { id: "fa_granola_bar", word: "GRANOLA BAR", clues: ["wrapped", "snack", "crunchy"] },

    { id: "fa_popcorn", word: "POPCORN", clues: ["kernels", "movie", "buttery"] },
    { id: "fa_pretzel", word: "PRETZEL", clues: ["twist", "salt", "snack"] },
    { id: "fa_chips", word: "CHIPS", clues: ["crispy", "bag", "snack"] },
    { id: "fa_nachos", word: "NACHOS", clues: ["chips", "cheese", "plate"] },
    { id: "fa_crackers", word: "CRACKERS", clues: ["crunchy", "square", "snack"] },
    { id: "fa_cheese", word: "CHEESE", clues: ["slice", "dairy", "melt"] },
    { id: "fa_yogurt", word: "YOGURT", clues: ["cup", "spoon", "creamy"] },
    { id: "fa_icecream", word: "ICE CREAM", clues: ["cold", "scoop", "cone"] },
    { id: "fa_milkshake", word: "MILKSHAKE", clues: ["straw", "thick", "cold"] },
    { id: "fa_chocolate", word: "CHOCOLATE", clues: ["sweet", "brown", "candy"] },

    // ---------- ANIMALS (75) ----------
    { id: "fa_dog", word: "DOG", clues: ["bark", "pet", "leash"] },
    { id: "fa_cat", word: "CAT", clues: ["meow", "whiskers", "nap"] },
    { id: "fa_horse", word: "HORSE", clues: ["mane", "stable", "ride"] },
    { id: "fa_cow", word: "COW", clues: ["moo", "pasture", "milk"] },
    { id: "fa_pig", word: "PIG", clues: ["oink", "mud", "snout"] },
    { id: "fa_sheep", word: "SHEEP", clues: ["wool", "baa", "flock"] },
    { id: "fa_goat", word: "GOAT", clues: ["horns", "climb", "farm"] },
    { id: "fa_chicken", word: "CHICKEN", clues: ["feathers", "cluck", "coop"] },
    { id: "fa_rooster", word: "ROOSTER", clues: ["crow", "morning", "farm"] },
    { id: "fa_duck", word: "DUCK", clues: ["quack", "pond", "waddle"] },

    { id: "fa_fish", word: "FISH", clues: ["fins", "gills", "water"] },
    { id: "fa_dolphin", word: "DOLPHIN", clues: ["smart", "ocean", "jump"] },
    { id: "fa_shark", word: "SHARK", clues: ["teeth", "fin", "predator"] },
    { id: "fa_whale", word: "WHALE", clues: ["huge", "ocean", "blowhole"] },
    { id: "fa_octopus", word: "OCTOPUS", clues: ["eight", "tentacles", "ink"] },
    { id: "fa_seal", word: "SEAL", clues: ["flippers", "clap", "ocean"] },
    { id: "fa_penguin", word: "PENGUIN", clues: ["waddle", "ice", "black and white"] },
    { id: "fa_turtle", word: "TURTLE", clues: ["shell", "slow", "reptile"] },
    { id: "fa_frog", word: "FROG", clues: ["jump", "pond", "croak"] },
    { id: "fa_snake", word: "SNAKE", clues: ["slither", "scales", "no legs"] },

    { id: "fa_lion", word: "LION", clues: ["mane", "roar", "pride"] },
    { id: "fa_tiger", word: "TIGER", clues: ["stripes", "hunt", "big cat"] },
    { id: "fa_bear", word: "BEAR", clues: ["hibernate", "claws", "forest"] },
    { id: "fa_wolf", word: "WOLF", clues: ["howl", "pack", "wild"] },
    { id: "fa_fox", word: "FOX", clues: ["sly", "bushy tail", "forest"] },
    { id: "fa_deer", word: "DEER", clues: ["antlers", "woods", "quiet"] },
    { id: "fa_rabbit", word: "RABBIT", clues: ["hop", "ears", "burrow"] },
    { id: "fa_squirrel", word: "SQUIRREL", clues: ["nuts", "tail", "trees"] },
    { id: "fa_mouse", word: "MOUSE", clues: ["tiny", "squeak", "cheese"] },
    { id: "fa_hamster", word: "HAMSTER", clues: ["wheel", "cage", "small"] },

    { id: "fa_elephant", word: "ELEPHANT", clues: ["trunk", "large", "tusks"] },
    { id: "fa_giraffe", word: "GIRAFFE", clues: ["long neck", "spots", "tall"] },
    { id: "fa_zebra", word: "ZEBRA", clues: ["stripes", "black and white", "savanna"] },
    { id: "fa_kangaroo", word: "KANGAROO", clues: ["pouch", "jump", "australia"] },
    { id: "fa_koala", word: "KOALA", clues: ["tree", "sleepy", "eucalyptus"] },
    { id: "fa_panda", word: "PANDA", clues: ["bamboo", "black and white", "bear"] },
    { id: "fa_monkey", word: "MONKEY", clues: ["climb", "tail", "mischief"] },
    { id: "fa_gorilla", word: "GORILLA", clues: ["strong", "chest", "jungle"] },
    { id: "fa_parrot", word: "PARROT", clues: ["talk", "feathers", "colorful"] },
    { id: "fa_owl", word: "OWL", clues: ["hoot", "night", "wise"] },

    { id: "fa_eagle", word: "EAGLE", clues: ["soar", "talons", "bird"] },
    { id: "fa_hawk", word: "HAWK", clues: ["sharp eyes", "circles", "bird"] },
    { id: "fa_butterfly", word: "BUTTERFLY", clues: ["wings", "colorful", "flutter"] },
    { id: "fa_bee", word: "BEE", clues: ["buzz", "honey", "sting"] },
    { id: "fa_ant", word: "ANT", clues: ["tiny", "line", "strong"] }
  ]
}
,

  // -------------------------------------------------
  // 3) KIDS PACK SIMPLE (200)
  // -------------------------------------------------
 // -------------------------------------------------
// FAMILY BASIC – EVERYDAY THINGS (150) – REPLACEMENT
// -------------------------------------------------
{
  id: "family_basic",
  label: "Family Pack (Everyday Things)",
  description: "Everyday objects and places—simple, familiar, and great for all ages.",
  cards: [
    // ---------- Home / Daily objects ----------
    { id: "fb_tv", word: "TELEVISION", clues: ["screen", "shows", "remote"] },
    { id: "fb_remote", word: "REMOTE CONTROL", clues: ["buttons", "channel", "volume"] },
    { id: "fb_couch", word: "COUCH", clues: ["living room", "sit", "soft"] },
    { id: "fb_lamp", word: "LAMP", clues: ["light", "shade", "table"] },
    { id: "fb_rug", word: "RUG", clues: ["floor", "soft", "pattern"] },
    { id: "fb_curtains", word: "CURTAINS", clues: ["window", "fabric", "pull"] },
    { id: "fb_pillow", word: "PILLOW", clues: ["head", "sleep", "soft"] },
    { id: "fb_blanket", word: "BLANKET", clues: ["warm", "bed", "cozy"] },
    { id: "fb_alarm_clock", word: "ALARM CLOCK", clues: ["wake up", "beep", "morning"] },
    { id: "fb_ceiling_fan", word: "CEILING FAN", clues: ["blades", "spin", "air"] },

    { id: "fb_mirror", word: "MIRROR", clues: ["reflection", "glass", "look"] },
    { id: "fb_towel", word: "TOWEL", clues: ["dry", "bath", "fabric"] },
    { id: "fb_toothbrush", word: "TOOTHBRUSH", clues: ["bristles", "teeth", "sink"] },
    { id: "fb_toothpaste", word: "TOOTHPASTE", clues: ["tube", "mint", "brush"] },
    { id: "fb_shampoo", word: "SHAMPOO", clues: ["hair", "lather", "bottle"] },
    { id: "fb_soap", word: "SOAP", clues: ["bubbles", "clean", "wash"] },
    { id: "fb_comb", word: "COMB", clues: ["hair", "teeth", "tangle"] },
    { id: "fb_hairbrush", word: "HAIRBRUSH", clues: ["bristles", "hair", "handle"] },
    { id: "fb_tissues", word: "TISSUES", clues: ["box", "nose", "soft"] },
    { id: "fb_bandage", word: "BANDAGE", clues: ["cover", "cut", "sticky"] },

    { id: "fb_flashlight", word: "FLASHLIGHT", clues: ["beam", "dark", "battery"] },
    { id: "fb_batteries", word: "BATTERIES", clues: ["power", "AA", "replace"] },
    { id: "fb_extension_cord", word: "EXTENSION CORD", clues: ["plug", "long", "outlet"] },
    { id: "fb_power_outlet", word: "OUTLET", clues: ["plug in", "wall", "electric"] },
    { id: "fb_toolbox", word: "TOOLBOX", clues: ["tools", "handle", "fix"] },
    { id: "fb_hammer", word: "HAMMER", clues: ["nails", "hit", "tool"] },
    { id: "fb_screwdriver", word: "SCREWDRIVER", clues: ["turn", "screws", "tool"] },
    { id: "fb_tape_measure", word: "TAPE MEASURE", clues: ["length", "retract", "numbers"] },
    { id: "fb_glue", word: "GLUE", clues: ["sticky", "craft", "bond"] },
    { id: "fb_scissors", word: "SCISSORS", clues: ["cut", "blades", "handles"] },

    // ---------- Kitchen ----------
    { id: "fb_refrigerator", word: "REFRIGERATOR", clues: ["cold", "food", "kitchen"] },
    { id: "fb_freezer", word: "FREEZER", clues: ["ice", "frozen", "cold"] },
    { id: "fb_microwave", word: "MICROWAVE", clues: ["heat", "quick", "buttons"] },
    { id: "fb_oven", word: "OVEN", clues: ["bake", "hot", "timer"] },
    { id: "fb_stove", word: "STOVE", clues: ["burners", "cook", "pots"] },
    { id: "fb_toaster", word: "TOASTER", clues: ["slots", "bread", "pop"] },
    { id: "fb_blender", word: "BLENDER", clues: ["spin", "smoothie", "loud"] },
    { id: "fb_kettle", word: "KETTLE", clues: ["boil", "water", "tea"] },
    { id: "fb_coffee_maker", word: "COFFEE MAKER", clues: ["brew", "filter", "morning"] },
    { id: "fb_cutting_board", word: "CUTTING BOARD", clues: ["chop", "counter", "knife"] },

    { id: "fb_frying_pan", word: "FRYING PAN", clues: ["skillet", "handle", "stovetop"] },
    { id: "fb_pot", word: "POT", clues: ["boil", "lid", "soup"] },
    { id: "fb_spatula", word: "SPATULA", clues: ["flip", "handle", "kitchen"] },
    { id: "fb_whisk", word: "WHISK", clues: ["mix", "eggs", "wire"] },
    { id: "fb_measuring_cup", word: "MEASURING CUP", clues: ["recipe", "pour", "marks"] },
    { id: "fb_plate", word: "PLATE", clues: ["dinner", "flat", "dish"] },
    { id: "fb_bowl", word: "BOWL", clues: ["round", "soup", "cereal"] },
    { id: "fb_cup", word: "CUP", clues: ["drink", "handle", "sip"] },
    { id: "fb_spoon", word: "SPOON", clues: ["scoop", "metal", "stir"] },
    { id: "fb_fork", word: "FORK", clues: ["prongs", "eat", "utensil"] },

    { id: "fb_knife", word: "KNIFE", clues: ["slice", "sharp", "kitchen"] },
    { id: "fb_napkin", word: "NAPKIN", clues: ["wipe", "fold", "meal"] },
    { id: "fb_dish_soap", word: "DISH SOAP", clues: ["sink", "bubbles", "plates"] },
    { id: "fb_sponge", word: "SPONGE", clues: ["scrub", "wet", "sink"] },
    { id: "fb_dishwasher", word: "DISHWASHER", clues: ["racks", "wash", "plates"] },
    { id: "fb_trash_can", word: "TRASH CAN", clues: ["lid", "garbage", "bag"] },
    { id: "fb_recycling_bin", word: "RECYCLING BIN", clues: ["blue bin", "cans", "paper"] },
    { id: "fb_lunchbox", word: "LUNCHBOX", clues: ["school", "food", "carry"] },
    { id: "fb_water_bottle", word: "WATER BOTTLE", clues: ["cap", "drink", "refill"] },
    { id: "fb_thermos", word: "THERMOS", clues: ["hot", "cold", "insulated"] },

    // ---------- School / Office ----------
    { id: "fb_backpack", word: "BACKPACK", clues: ["straps", "carry", "zipper"] },
    { id: "fb_notebook", word: "NOTEBOOK", clues: ["pages", "write", "paper"] },
    { id: "fb_spiral_notebook", word: "SPIRAL NOTEBOOK", clues: ["coil", "pages", "class"] },
    { id: "fb_pencil", word: "PENCIL", clues: ["erase", "graphite", "sharpen"] },
    { id: "fb_pen", word: "PEN", clues: ["ink", "click", "write"] },
    { id: "fb_eraser", word: "ERASER", clues: ["rub", "mistake", "pencil"] },
    { id: "fb_sharpener", word: "PENCIL SHARPENER", clues: ["shave", "point", "crank"] },
    { id: "fb_ruler", word: "RULER", clues: ["measure", "straight", "inches"] },
    { id: "fb_gluestick", word: "GLUE STICK", clues: ["twist", "paper", "craft"] },
    { id: "fb_tape", word: "TAPE", clues: ["roll", "stick", "wrap"] },

    { id: "fb_stapler", word: "STAPLER", clues: ["papers", "metal", "click"] },
    { id: "fb_paperclip", word: "PAPER CLIP", clues: ["wire", "hold", "papers"] },
    { id: "fb_folder", word: "FOLDER", clues: ["papers", "file", "pocket"] },
    { id: "fb_marker", word: "MARKER", clues: ["cap", "ink", "bold"] },
    { id: "fb_crayons", word: "CRAYONS", clues: ["wax", "color", "box"] },
    { id: "fb_highlighter", word: "HIGHLIGHTER", clues: ["bright", "underline", "study"] },
    { id: "fb_calculator", word: "CALCULATOR", clues: ["buttons", "math", "screen"] },
    { id: "fb_scotch_tape", word: "CLEAR TAPE", clues: ["transparent", "roll", "stick"] },
    { id: "fb_printer", word: "PRINTER", clues: ["ink", "paper", "print"] },
    { id: "fb_keyboard", word: "KEYBOARD", clues: ["type", "keys", "computer"] },

    // ---------- Clothing / Personal ----------
    { id: "fb_shoes", word: "SHOES", clues: ["pair", "laces", "feet"] },
    { id: "fb_sneakers", word: "SNEAKERS", clues: ["run", "laces", "rubber"] },
    { id: "fb_socks", word: "SOCKS", clues: ["pair", "feet", "drawer"] },
    { id: "fb_hat", word: "HAT", clues: ["head", "wear", "cap"] },
    { id: "fb_jacket", word: "JACKET", clues: ["zipper", "warm", "coat"] },
    { id: "fb_gloves", word: "GLOVES", clues: ["hands", "warm", "winter"] },
    { id: "fb_scarf", word: "SCARF", clues: ["neck", "wrap", "warm"] },
    { id: "fb_belt", word: "BELT", clues: ["waist", "buckle", "loops"] },
    { id: "fb_sunglasses", word: "SUNGLASSES", clues: ["shade", "sun", "lenses"] },
    { id: "fb_watch", word: "WATCH", clues: ["wrist", "time", "strap"] },

    // ---------- Places / Getting around ----------
    { id: "fb_grocery_store", word: "GROCERY STORE", clues: ["cart", "aisles", "checkout"] },
    { id: "fb_library", word: "LIBRARY", clues: ["books", "quiet", "borrow"] },
    { id: "fb_school", word: "SCHOOL", clues: ["classroom", "teacher", "students"] },
    { id: "fb_post_office", word: "POST OFFICE", clues: ["stamps", "mail", "packages"] },
    { id: "fb_pharmacy", word: "PHARMACY", clues: ["prescriptions", "aisles", "counter"] },
    { id: "fb_hardware_store", word: "HARDWARE STORE", clues: ["tools", "aisles", "fix"] },
    { id: "fb_gas_station", word: "GAS STATION", clues: ["pump", "fuel", "car"] },
    { id: "fb_airport", word: "AIRPORT", clues: ["planes", "gates", "luggage"] },
    { id: "fb_bus_stop", word: "BUS STOP", clues: ["sign", "wait", "route"] },
    { id: "fb_parking_lot", word: "PARKING LOT", clues: ["lines", "cars", "space"] },

    // ---------- Fun / common items ----------
    { id: "fb_board_game", word: "BOARD GAME", clues: ["pieces", "rules", "table"] },
    { id: "fb_deck_cards", word: "DECK OF CARDS", clues: ["shuffle", "suits", "deal"] },
    { id: "fb_puzzle", word: "JIGSAW PUZZLE", clues: ["pieces", "fit", "picture"] },
    { id: "fb_basketball", word: "BASKETBALL", clues: ["dribble", "hoop", "bounce"] },
    { id: "fb_soccer_ball", word: "SOCCER BALL", clues: ["kick", "goal", "round"] },
    { id: "fb_skateboard", word: "SKATEBOARD", clues: ["deck", "wheels", "tricks"] },
    { id: "fb_bicycle", word: "BICYCLE", clues: ["pedals", "two wheels", "ride"] },
    { id: "fb_helmet", word: "HELMET", clues: ["protect", "head", "strap"] },
    { id: "fb_umbrella", word: "UMBRELLA", clues: ["rain", "open", "cover"] },
    { id: "fb_suitcase", word: "SUITCASE", clues: ["travel", "handle", "pack"] },

    // ---------- Extra everyday nouns (round out to 150) ----------
    { id: "fb_keychain", word: "KEYCHAIN", clues: ["ring", "keys", "jingle"] },
    { id: "fb_keys", word: "KEYS", clues: ["lock", "metal", "jingle"] },
    { id: "fb_wallet", word: "WALLET", clues: ["cash", "cards", "pocket"] },
    { id: "fb_purse", word: "PURSE", clues: ["strap", "carry", "wallet"] },
    { id: "fb_backdoor", word: "DOORBELL", clues: ["ring", "front door", "press"] },
    { id: "fb_mailbox", word: "MAILBOX", clues: ["letters", "flag", "deliver"] },
    { id: "fb_envelope", word: "ENVELOPE", clues: ["stamp", "seal", "mail"] },
    { id: "fb_stamp", word: "STAMP", clues: ["postage", "lick", "corner"] },
    { id: "fb_calendar", word: "CALENDAR", clues: ["dates", "months", "hang"] },
    { id: "fb_map", word: "MAP", clues: ["directions", "roads", "fold"] },

    { id: "fb_camera", word: "CAMERA", clues: ["photo", "lens", "snap"] },
    { id: "fb_phone", word: "PHONE", clues: ["call", "ring", "contacts"] },
    { id: "fb_charger", word: "CHARGER", clues: ["plug", "battery", "cable"] },
    { id: "fb_headphones", word: "HEADPHONES", clues: ["ears", "music", "wireless"] },
    { id: "fb_speaker", word: "SPEAKER", clues: ["sound", "music", "volume"] },
    { id: "fb_book", word: "BOOK", clues: ["pages", "read", "cover"] },
    { id: "fb_magazine", word: "MAGAZINE", clues: ["glossy", "articles", "pictures"] },
    { id: "fb_newspaper", word: "NEWSPAPER", clues: ["headlines", "print", "fold"] },
    { id: "fb_ticket", word: "TICKET", clues: ["entry", "stub", "seat"] },
    { id: "fb_receipt", word: "RECEIPT", clues: ["purchase", "paper", "proof"] },

    { id: "fb_coin", word: "COIN", clues: ["change", "metal", "flip"] },
    { id: "fb_dollar_bill", word: "DOLLAR BILL", clues: ["paper", "money", "wallet"] },
    { id: "fb_piggy_bank", word: "PIGGY BANK", clues: ["coins", "slot", "save"] },
    { id: "fb_backpack_tag", word: "NAME TAG", clues: ["label", "sticker", "write"] },
    { id: "fb_glass", word: "DRINKING GLASS", clues: ["water", "cupboard", "clear"] },
    { id: "fb_broom", word: "BROOM", clues: ["sweep", "bristles", "floor"] },
    { id: "fb_mop", word: "MOP", clues: ["wet", "clean", "floor"] },
    { id: "fb_vacuum", word: "VACUUM", clues: ["suction", "clean", "carpet"] },
    { id: "fb_laundry_basket", word: "LAUNDRY BASKET", clues: ["clothes", "carry", "hamper"] },
    { id: "fb_hanger", word: "HANGER", clues: ["closet", "shirts", "hook"] },

    { id: "fb_iron", word: "IRON", clues: ["wrinkles", "heat", "clothes"] },
    { id: "fb_sewing_kit", word: "SEWING KIT", clues: ["needle", "thread", "buttons"] },
    { id: "fb_button", word: "BUTTON", clues: ["shirt", "fasten", "small"] },
    { id: "fb_zipper", word: "ZIPPER", clues: ["zip", "jacket", "teeth"] },
    { id: "fb_backpack_zip", word: "VELCRO", clues: ["rip sound", "stick", "strap"] },
    { id: "fb_marker_board", word: "WHITEBOARD", clues: ["erase", "markers", "write"] },
    { id: "fb_clipboard", word: "CLIPBOARD", clues: ["clamp", "paper", "hold"] },
    { id: "fb_binder", word: "BINDER", clues: ["rings", "pages", "school"] },
    { id: "fb_sticky_notes", word: "STICKY NOTES", clues: ["yellow", "reminders", "peel"] },
    { id: "fb_timer", word: "TIMER", clues: ["countdown", "beep", "minutes"] },

    { id: "fb_thermometer", word: "THERMOMETER", clues: ["temperature", "degrees", "fever"] },
    { id: "fb_sunscreen", word: "SUNSCREEN", clues: ["SPF", "beach", "protect"] },
    { id: "fb_bug_spray", word: "BUG SPRAY", clues: ["mosquitoes", "outdoors", "repellent"] },
    { id: "fb_first_aid", word: "FIRST AID KIT", clues: ["bandages", "emergency", "supplies"] },
    { id: "fb_hand_sanitizer", word: "HAND SANITIZER", clues: ["gel", "clean", "pump"] },
    { id: "fb_water_hose", word: "GARDEN HOSE", clues: ["spray", "yard", "coil"] },
    { id: "fb_sprinkler", word: "SPRINKLER", clues: ["water", "lawn", "spin"] },
    { id: "fb_shovel", word: "SHOVEL", clues: ["dig", "dirt", "handle"] },
    { id: "fb_rake", word: "RAKE", clues: ["leaves", "tines", "yard"] },
    { id: "fb_watering_can", word: "WATERING CAN", clues: ["plants", "spout", "pour"] }
  ]
}

];




