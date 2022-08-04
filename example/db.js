
const { Emojiquiz } = require('discord-emojiquiz');
const emojiquiz = new Emojiquiz();

emojiquiz.host = "localhost";
emojiquiz.user = "root";
emojiquiz.password = "";
emojiquiz.database = "jeezyDevelopment";
emojiquiz.charset = 'utf8mb4';
emojiquiz.bigNumbers = true;
module.exports = {emojiquiz};
