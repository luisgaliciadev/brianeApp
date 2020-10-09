var chalk = require("chalk");
const config = require('../node_modules/@ionic/app-scripts/config/copy.config');

console.log(chalk.green('\n***********************************************'));
console.log(chalk.green('\nCopy Custom Assets'));
console.log(chalk.green('\n***********************************************'));

module.exports = Object.assign(config, {
  copyMdi: {
    src: ['{{ROOT}}/node_modules/@mdi/font/**/*'],
    dest: '{{WWW}}/assets/fonts/mdi'
  }
})