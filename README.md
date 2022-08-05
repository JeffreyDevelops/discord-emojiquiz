# Discord-Emojiquiz
<p>
  <a href="https://discord.gg/ybvMTNHcnq">
<img src="https://camo.githubusercontent.com/e59dea1d9d0632f966c15a10dd746907a3ff03d27b0f074b37d450776290f2ac/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f436861742d436c69636b253230686572652d3732383964393f7374796c653d666f722d7468652d6261646765266c6f676f3d646973636f7264">
</img>
</a>
<br>
<p>Discord Emojiquiz is a powerful <a href="https://nodejs.org/en/">NodeJs</a> module that allows you to easily create Emojiquizzes!</p>
<h2>Features</h2>
<ul>
<li>Easy to use! 🥳</li>
<li>Uses discord.js v14! ⚡</li>
<li>Supports all languages by configurating messages! 🛠</li>
<li>Supports MySQL database! 🔐</li>
<li>Uses SlashCommands! 😎</li>
<li>Fast to setup! 👨‍💻</li>
</ul>
<h2>Installation</h2>
<pre>npm i discord-emojiquiz</pre>
<h2>Examples / Images </h2>
<p>If you need an <code>example</code> you can go to: <a href="https://github.com/JeezyDev/discord-emojiquiz-bot">discord-emojiquiz-bot</a></p>
<img src="https://user-images.githubusercontent.com/88632169/182975493-44e56018-e0e5-4031-baf3-bf31689e6db3.png">
<img src="https://user-images.githubusercontent.com/88632169/182975535-2d3dec2e-d621-43d3-93ec-a4662d70e192.png">

<h2>Required Discord Intents</h2>
<br>

```javascript
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions] });
```

<h2>Database</h2> 

 ```javascript

const { Emojiquiz } = require('discord-emojiquiz');
const emojiquiz = new Emojiquiz();

emojiquiz.host = "localhost";
emojiquiz.user = "root";
emojiquiz.password = "";
emojiquiz.database = "jeezyDevelopment";
emojiquiz.charset = 'utf8mb4';
emojiquiz.bigNumbers = true;
module.exports = {emojiquiz};

```

<ul>
  <li>Require discord-emojiquiz</li>
  <li>Make a new instance of Emojiquiz</li>
  <li>Set DB details</li>
  <li>Export new instance variable (emojiquiz)</li>
</ul>

<h2>Ready event</h2>

```javascript

const { emojiquiz } = require('../db.js');
const { ActivityType } = require('discord.js');
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		emojiquiz.ready();

		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};

```

<ul>
  <li>(!IMPORTANT!) Import variable from before into ready.js and do emojiquiz.ready();</li>
</ul>

<h2>CeateEmojiQuiz</h2>

```javascript

  const { SlashCommandBuilder } = require('discord.js');
  const { emojiquiz } = require('../db');
  module.exports = {
    data: new SlashCommandBuilder()
      .setName('emojiquiz-create')
      .setDescription('Creates emojiquiz.')
      .addStringOption(option =>
        option.setName('emoji-word')
          .setDescription('Enter the word in emojis.')
          .setRequired(true))
      .addStringOption(option =>
        option.setName('emoji-hint')
          .setDescription('Give a hint.')
          .setRequired(true))
          .addStringOption(option =>
        option.setName('searched-word')
          .setDescription('Enter the searched word.')
          .setRequired(true)),
    async execute(interaction) {
      const emoji_word = await interaction.options.getString('emoji-word');
      const emoji_hint = await interaction.options.getString('emoji-hint');
      const searched_word = await interaction.options.getString('searched-word');
      emojiquiz.interaction = interaction;
      emojiquiz.word = emoji_word;
      emojiquiz.hint = emoji_hint;
      emojiquiz.searched_word = searched_word;
      emojiquiz.createEmojiQuiz();
    },
  };

```

<ul>
  <li>Import emojiquiz again</li>
  <li>Set emojiquiz.word && emojiquiz.hint && emojiquiz.searched_word</li>
  <li>After that do emojiquiz.createEmojiQuiz();
</ul>

<h2>Setup</h2>

```javascript

  const { SlashCommandBuilder } = require('discord.js');
  const { emojiquiz } = require('../db');
  module.exports = {
    data: new SlashCommandBuilder()
      .setName('emojiquiz-setup')
      .setDescription('Setups the emojiquiz')
      .addChannelOption(option =>
      option.setName('channel')
      .setDescription('Select the channel where the emojiquiz should be sent to.')
      .setRequired(true))
      .addChannelOption(option =>
          option.setName('pending_channel')
          .setDescription('Select channel where new emojiquiz suggestion should be sent to.')
          .setRequired(true)),
    async execute(interaction) {
      const emojiquiz_channel = await interaction.options.getChannel('channel');
          const emojiquiz_pending = await interaction.options.getChannel('pending_channel');
          emojiquiz.pending_channel = emojiquiz_pending;
          emojiquiz.channel = emojiquiz_channel;
          emojiquiz.interaction = interaction;
          emojiquiz.setup();
    },
  };

```

<ul>
  <li>Set emojiquiz.interaction && emojiquiz.pending_channel && emojiquiz.channel</li>
  <li>After that do emojiquiz.setup();</li>
</ul>

<h2>Set Emojiquiz buttons</h2>

```javascript

const { emojiquiz } = require('../db.js');
module.exports = {
	name: 'interactionCreate',
	async execute(interaction) { 
        emojiquiz.button = interaction;
        emojiquiz.skip();
        emojiquiz.firstLetter();
        emojiquiz.suggest_new_quiz();
    }
};

```

<ul>
  <li>Set emojiquiz.button</li>
  <li>Set the buttons emojiquiz.skip(); && emojiquiz.firstLetter(); && emojiquiz.suggest_new_quiz();
</ul>

<h2>Start</h2>

```javascript

const { emojiquiz } = require('../db.js');
const { emojiquizContent } = require('../utils/messages.js')
module.exports = {
	name: 'messageCreate',
	async execute(message) { 
        emojiquiz.message = message;

        emojiquiz.start();
    }
};

```

<ul>
  <li>Import emojiquiz again</li>
  <li>Do emojiquiz.start(); to start Emojiquiz</li>
</ul>

<h2>Configurate messages</h2>

<p>(!IMPORTANT!) Before we come to the configuration part you need to make sure that you require { emojiquizContent } in the file where 
you call the emojiquiz.start() methode.
</p>

```javascript

const { emojiquizContent } = require('../utils/messages.js')


```
<p>So when you done that we can start doing the message editing. 🥳</p>

```javascript

const { emojiquizContent } = require('../utils/messages.js')

let { message } = require('discord-emojiquiz');
message.emojiquizContent.color = '#FF8800';
message.emojiquizContent.title = 'Emojiquiz';
module.exports = {message};

```

<ul>
  <li>Require discord-emojiquiz again</li>
  <li>Set new messages with message.emojiquizContent</li>
  <li>Do console.log(message.emojiquizContent) to see everything you can change</li>
</ul>

<h2>That's it!</h2>
<p>I hope you have fun with this package and enjoy playing emojiquizzes. 🤳🥳😎
<p>If you still need support or want to join a community! 👇</p>
  <a href="https://discord.gg/ybvMTNHcnq">
<img src="https://camo.githubusercontent.com/e59dea1d9d0632f966c15a10dd746907a3ff03d27b0f074b37d450776290f2ac/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f436861742d436c69636b253230686572652d3732383964393f7374796c653d666f722d7468652d6261646765266c6f676f3d646973636f7264">
</img>
</a>
