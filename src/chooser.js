const random = require('random');
const seedrandom = require('seedrandom');

const DEFAULT_LIMIT = 3; // number of items to return
const SUPERLATIVE_CHANCE = 0.1; // change that if an item has superlatives, it uses the superlative

const chooser = (items, options = {}) => {

    const seed = options.seed ? options.seed : new Date().toDateString();
    const limit = options.limit ? Math.min(options.limit, items.length) : DEFAULT_LIMIT;
    const superlativeChance = options.superlativeChance ? options.superlativeChance : SUPERLATIVE_CHANCE;
    console.log('Chooser: seed:', seed);
    console.log('Chooser: options:', options);
    console.log('Chooser: limit:', limit);
    console.log('Chooser: superlative chance:', superlativeChance);

    random.use(seedrandom(seed));
    const chosen = [];
    const usedIndices = [];

    // pick a number of random items
    while (chosen.length != limit) {
        const randomIndex = random.int(0, items.length - 1);
        if (usedIndices.indexOf(randomIndex) === -1) {
            usedIndices.push(randomIndex);
            chosen.push(items[randomIndex]);
        }
    }

    if (options.superlatives) {
        console.log('Chooser: applying superlatives');
        //! probably order of forEach is not guaranteed across platforms...?
        chosen.forEach(item => {
            if (!item.superlatives || random.float() > superlativeChance) {
                return;
            }
            const superlativeIndex = random.int(0, item.superlatives.length - 1);
            item.name = `${item.superlatives[superlativeIndex]} ${item.name}`;
        });
    }

    return chosen;
};

module.exports = chooser;
