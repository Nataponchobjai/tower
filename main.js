'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

const resetGame = () => {
  stacks.a = [4, 3, 2, 1];
  stacks.b = [];
  stacks.c = [];
}

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
const movePiece = (from, to) => {
  // Your code here
  const movingPiece = stacks[from].pop();
  stacks[to].push(movingPiece);

}
/**
 * This fuction should check if the 
 * @param {*} from 
 * @param {*} to 
 */
// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2

const isLegal = (from,to) => {
  // Your code here
  const fromStack = stacks[from];
  const toStack = stacks[to];

  if (fromStack.length === 0) return false;  
  
  const movingPiece = fromStack[fromStack.length - 1];
  
  if (toStack.length === 0) return true;  
  
  const topOfToStack = toStack[toStack.length - 1];
  
  return movingPiece < topOfToStack;
}

// What is a win in Towers of Hanoi? When should this function run?
/**
 * this function should check if the board is in a winning state
 * A winning stat is when all the discs are on a tack b, or stack c.
 * Return true if the board is in a  winning state,
 * otherwise reture false
 */
const checkForWin = () => {
  // Your code here
  return (stacks.b.length === 4 || stacks.c.length === 4);
  
  
}


// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  // Your code here
  if (isLegal(startStack, endStack)) {
    movePiece(startStack, endStack);
    if (checkForWin()) {
      console.log("Congratulation, You won!!!!");
      resetGame();  
    }
  } else {
    console.log("Hay Illegal move!");
  }

}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
