const { ForgeClient } = require("@tryforge/forgescript")
const { ForgeDB } = require("@tryforge/forge.db")
const { ForgeCanvas } = require("@tryforge/forge.canvas")
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const express = require('express');

// Client initialization
   const client = new ForgeClient({
    "intents": [
        "Guilds",
        "GuildMembers",
        "GuildModeration",
        "GuildInvites",

        "GuildMessages",
        "GuildMessageTyping",
        "DirectMessages",
        "DirectMessageTyping",
        "MessageContent",
        "AutoModerationConfiguration",
        "AutoModerationExecution",
        "GuildMessageReactions",
        "DirectMessageReactions"
    ],
    "events": [
        "autoModerationActionExecution",
        "debug",
        "error",
        "guildBanAdd",
        "guildCreate",
        "guildBanRemove",
        "guildMemberAdd",
        "guildMemberRemove",
        "interactionCreate",
        "ready",
        "messageUpdate",
        "messageCreate",
        "messageDelete",
        "messageReactionRemoveAll",
        "inviteCreate",
        "messagePollVoteRemove",
        "messagePollVoteAdd"
    ],
    "extensions": [
        new ForgeDB({
        type: "mongodb",
url: "mongodb+srv://Fradz:EconomeMusic10@cluster0.fjivzs3.mongodb.net/bot2"
        }),
        new ForgeCanvas()
    ],
allowBots: true
})
   
   

   
// Load the commands
  
   client.applicationCommands.load("src");
   client.commands.load("interactions");

// This part puts something on the console once bot is online
client.commands.add({
    type: "ready",
    code: 
   `
    $log[- Bot $username[$botID] ID "$botID" is online!]
    $log[- Syncing CMDS]
    
    $updateCommands
    $updateApplicationCommands

$wait[2000]
    $log[- Bot CMDS are Synced!]
    $loop[-1;$setStatus[idle;Listening;$randomText[$username[$botID] in FS;$username[$botID] in $guildCount Servers!;The Members Adding Me!;This Is $username[$botID] V$getGlobalVar[version;3.5]]]
        $wait[10s]
        $setStatus[idle;Listening;$randomText[$username[$botID] in FS;$username[$botID] in $guildCount Servers!;The Members Adding Me!;This Is $username[$botID] V$getGlobalVar[version;3.5]]]] 

`
    
    
})


// Disable all Bugged Buttons


client.commands.add({
    type: "ready",
    code: 
   `
    $arrayLoad[buttons;,;$getGlobalVar[ButtonsMap]]

    $arrayForEach[buttons;value;
    
    $textSplit[$env[value];-]

$editButtonOf[$splitText[0];$splitText[1];$splitText[2];disabled;Catch Me!;Danger;;true]

$setGlobalVar[ButtonsMap;$replace[$getGlobalVar[ButtonsMap];$splitText[0]-$splitText[1]-$splitText[2],;]]
    
    ]

`
    
    
})


//Guild Join Modulo
client.commands.add({
    type: "guildCreate",
    code: `
    $let[c;$randomGuildChannelID[$guildID;GuildText]]
    $sendMessage[$get[c];
$author[$username[$botID];$userAvatar[$botID]]
$thumbnail[$userAvatar[$authorID]]
$title[Welcome to $username[$botID]!]
$addField[How to Use $username[$botID];
> **Hello there!** Ready to start increasing your Collections? Simply type $inlineCode[/help] to discover our easy-to-use commands!]
$addField[Join Our Support Server;
$hyperlink[Click Here!;https://discord.gg/me7APegVsw]
]
$addField[Invite $username[$botID];
$hyperlink[Click Here!;$botInvite]
]

$color[#f40066]]
`})


client.functions.add({
    name: "randomBall",
    params: [],
    code: `
$scope[
   
$arrayLoad[data;,;$readDir[./Balls;,]] 

$arrayForEach[data;checked;

$jsonLoad[json;$readFile[Balls/$env[checked]]]

$loop[$env[json;rarity];$let[Rare;$env[checked]-$get[Rare]]]

]

$arrayLoad[newdata;-;$get[Rare]]

$arrayShuffle[newdata]

$return[$arrayRandomValue[newdata]]

] 
    
`});


client.functions.add({
    name: "ballSuccess",
    params: ["user","true","ball"],
    code: `
$scope[

$if[$env[true]==true;

$return[<@$env[user]> You Caught **$env[ball]**!]

;

$return[<@$env[user]> Wrong Name!]

]


] 
    
`});





client.functions.add({
    name: "translateText",
    params: ["text","to","from"],
    code: `
$scope[
$!httpRequest[https://api.kastg.xyz/api/tool/translate?input=$replace[$env[text]; ;+]&to=$env[to]&from=$env[from];GET]


$jsonLoad[data;$replace[$replace[$httpResult[result];\\[;];\\];]]
$return[$env[data;output]]
] 
    
`});


// CountryBall Panel Thing

const app = express();
const PORT = 3000;
const ballsDir = path.join(__dirname, 'Balls');
const uploadsDir = path.join(__dirname, 'uploads/images');

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Middleware to handle JSON request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (for CSS)
app.use(express.static('public'));

// Homepage route to display the list of JSON files
app.get('/', (req, res) => {
  fs.readdir(ballsDir, (err, files) => {
    if (err) return res.status(500).send('Error reading directory');

    const jsonFiles = files.filter(file => file.endsWith('.json'));
    const ballData = jsonFiles.map(file => {
      const filePath = path.join(ballsDir, file);
      const content = JSON.parse(fs.readFileSync(filePath));
      return { fileName: file, ...content };
    });

    res.send(`
      <link rel="stylesheet" href="/style.css">
      <h1>Country Balls</h1>
      
      <!-- Add New Ball Form -->
      <h2>Add New Country Ball</h2>
      <form action="/add" method="POST" enctype="multipart/form-data" class="add-form">
        <label>Country: <input type="text" name="country" required /></label><br>
        <label>Short Name: <input type="text" name="shortName" required /></label><br>
        <label>Catch Names: <input type="text" name="catchNames" required /></label><br>
        <label>Health: <input type="number" name="health" required /></label><br>
        <label>Strength: <input type="number" name="strength" required /></label><br>
        <label>Rarity: <input type="number" name="rarity" required /></label><br>
        <label>Emoji ID: <input type="text" name="emojiID" required /></label><br>
        <label>Upload Image: <input type="file" name="image" accept="image/*" required /></label><br>
        <button type="submit">Add Ball</button>
      </form>
    
      <!-- Display Balls -->
      <h2>Country Ball List</h2>
      <ul>
        ${ballData.map(ball => `
          <li class="ball-item">
            <div class="ball-item-info">
              ${ball.country} (${ball.shortName}) - Health: ${ball.health}, Strength: ${ball.strength}, Rarity: ${ball.rarity}
            </div>
            <div class="ball-item-actions">
              <form action="/edit/${ball.fileName}" method="GET" style="display: inline;">
                <button type="submit">Edit</button>
              </form>
              <form action="/delete/${ball.fileName}" method="POST" style="display: inline;">
                <button type="submit">Delete</button>
              </form>
              <img src="${ball.imagePath}" alt="${ball.country} Image">
            </div>
          </li>
        `).join('')}
      </ul>
    `);
    
  });
});

// Route to handle adding a new ball
// Route to handle adding a new ball
app.post('/add', upload.single('image'), (req, res) => {
    // Read the existing files to determine the next file number
    fs.readdir(ballsDir, (err, files) => {
      if (err) return res.status(500).send('Error reading directory');
  
      // Filter out only JSON files
      const jsonFiles = files.filter(file => file.endsWith('.json'));
  
      // Calculate the next ball number based on the existing files
      const nextBallNumber = jsonFiles.length + 1;
      const newFileName = `Ball${nextBallNumber}.json`;
      const newFilePath = path.join(ballsDir, newFileName);
  
      // Create the new ball object with the uploaded image path
      const newBall = {
        country: req.body.country,
        shortName: req.body.shortName,
        catchNames: req.body.catchNames,
        health: req.body.health,
        strength: req.body.strength,
        rarity: req.body.rarity,
        emojiID: req.body.emojiID,
        imagePath: `/uploads/images/${req.file.filename}`
      };
  
      // Write the new ball data to the next sequential file
      fs.writeFile(newFilePath, JSON.stringify(newBall, null, 2), err => {
        if (err) return res.status(500).send('Error saving file');
        res.redirect('/');
      });
    });
  });
  

// Route to delete the JSON file
app.post('/delete/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(ballsDir, fileName);

  fs.unlink(filePath, err => {
    if (err) return res.status(500).send('Error deleting file');
    res.redirect('/');
  });
});

// Route to display edit form
app.get('/edit/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(ballsDir, fileName);

  const ballData = JSON.parse(fs.readFileSync(filePath));
  res.send(`
    <link rel="stylesheet" href="/style.css">
    <h1>Edit ${ballData.country}</h1>
    <form action="/edit/${fileName}" method="POST" enctype="multipart/form-data" class="edit-form">
      <label>Country: <input type="text" name="country" value="${ballData.country}" required /></label><br>
      <label>Short Name: <input type="text" name="shortName" value="${ballData.shortName}" required /></label><br>
      <label>Catch Names: <input type="text" name="catchNames" value="${ballData.catchNames}" required /></label><br>
      <label>Health: <input type="number" name="health" value="${ballData.health}" required /></label><br>
      <label>Strength: <input type="number" name="strength" value="${ballData.strength}" required /></label><br>
      <label>Rarity: <input type="number" name="rarity" value="${ballData.rarity}" required /></label><br>
      <label>Emoji ID: <input type="text" name="emojiID" value="${ballData.emojiID}" required /></label><br>
      <label>Upload Image: <input type="file" name="image" accept="image/*" /></label><br>
      <input type="hidden" name="existingImagePath" value="${ballData.imagePath}" />
      <button type="submit">Save</button>
    </form>
  `);
});

// Route to handle editing a JSON file
app.post('/edit/:fileName', upload.single('image'), (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(ballsDir, fileName);

  const updatedData = {
    country: req.body.country,
    shortName: req.body.shortName,
    catchNames: req.body.catchNames,
    health: req.body.health,
    strength: req.body.strength,
    rarity: req.body.rarity,
    emojiID: req.body.emojiID,
    imagePath: req.file ? `/uploads/images/${req.file.filename}` : req.body.existingImagePath // Preserve old image if no new image uploaded
  };

  fs.writeFile(filePath, JSON.stringify(updatedData, null, 2), err => {
    if (err) return res.status(500).send('Error saving file');
    res.redirect('/');
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



// Change "Your bot token" by your bot token.
require('dotenv').config();

client.login(process.env.TOKEN);

