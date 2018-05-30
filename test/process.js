var program = require('commander');

program
  .option('-p, --peppers', 'Add peppers')
  .option('-P, --pineapple', 'Add pineapple')
  .option('-b, --bbq', 'Add bbq sauce')
  .option('-c, --cheese [id]', '', 0)
  .option('-c, --chees [type]', 'Add the specified type of cheese [marble]', 0)
  .parse(process.argv);

console.log('you ordered a pizza with:');
if (program.peppers) console.log('  - peppers');
if (program.pineapple) console.log('  - pineapple');
if (program.bbq) console.log('  - bbq');
console.log(`%s`, program.cheese);
console.log();
if (program.chees) {
    let  a = 0;
    a = a + 
    console.log(a)
}