const readline = require('node:readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});
const util = require('node:util');
const question = util.promisify(readline.question).bind(readline);

if (process.argv.length !== 4) {
  console.error('Must pass 2 args: <min #> <max #>');
  process.exit(1);
}

const min = process.argv[2];
const max = process.argv[3];

let possibleValues = []
for (let i = min; i <= max; i++) {
  possibleValues.push(i);
}

(async function() {
  let continueResponse = 'y';
  while (continueResponse === 'y' && possibleValues.length > 0) {
    const index = Math.floor(Math.random() * possibleValues.length);
    console.log(possibleValues[index]);

    const left = possibleValues.slice(0, index);
    const right = possibleValues.slice(index + 1);
    possibleValues = left.concat(right);

    if (possibleValues.length > 0) {
      continueResponse = await question('continue? (y/n) ');
    }
  }

  process.exit(0);
})();
