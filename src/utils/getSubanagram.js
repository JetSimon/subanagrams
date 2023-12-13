import dictionary from './dictionary.js'

// Create cyrb128 state:
const seed = cyrb128(new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}));
// Four 32-bit component hashes provide the seed for sfc32.
let rand = sfc32(seed[0], seed[1], seed[2], seed[3]);

function getSubanagram() {
    while(true) {
        let startingWord = choose(dictionary.startingWords);

        let subsets = new Set();

        for(let i = 0; i < startingWord.length; i++) {
            for(let j = 1; j <= startingWord.length + 1; j++) {
                let chunk = startingWord.slice(i, i+j);
                if(chunk.length < 4) {
                    continue;
                }
                subsets.add(chunk);
            }
        }

        let possibleSolutions = [];

        for(let subset of subsets) {
            if(key(subset) in dictionary.anagrams) {
                for(let word of dictionary.anagrams[key(subset)]) {
                    possibleSolutions.push(word);
                }
            }
        }

        if(possibleSolutions.length < 8 || possibleSolutions.length > 20) {
            continue;
        }

        let solutions = [];

        for(let i = 0; i <= startingWord.length; i++) {
            solutions.push([]);
        }

        for(let word of possibleSolutions) {
            if(word != startingWord) {
                solutions[word.length].push(word);
            }
        } 

        solutions = solutions.filter((words) => words.length > 0).reverse();

        return {
            "startingWord":startingWord,
            "solutions":solutions
        }
    }

    return null;
}

function key(word) {
    return Array.from(word).sort().join("");
}

function choose(arr) {
    return arr[Math.floor(rand()*arr.length)];
}

function cyrb128(str) {
    let h1 = 1779033703, h2 = 3144134277,
        h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    h1 ^= (h2 ^ h3 ^ h4);
    h2 ^= h1;
    h3 ^= h1;
    h4 ^= h1;
    return [h1>>>0, h2>>>0, h3>>>0, h4>>>0];
}

function sfc32(a, b, c, d) {
    return function() {
      a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0; 
      var t = (a + b) | 0;
      a = b ^ b >>> 9;
      b = c + (c << 3) | 0;
      c = (c << 21 | c >>> 11);
      d = d + 1 | 0;
      t = t + d | 0;
      c = c + t | 0;
      return (t >>> 0) / 4294967296;
    }
}

export default getSubanagram;