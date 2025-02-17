require('dotenv').config();
const express = require('express');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const session = require('express-session');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('./config.json');
const FuzzySet = require('fuzzyset')

// Client initialization for the bot
const { ForgeClient } = require('@tryforge/forgescript');
const { ForgeDB } = require('@tryforge/forge.db');
const { ForgeCanvas } = require("@tryforge/forge.canvas");


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
url: config.mongo
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
    params: ["user","true","ball","success","id"],
    code: `
$scope[

$if[$env[true]==true;
$jsonLoad[config;$readFile[./config.json]] $let[caught;$env[config;Caught]] $let[name;$env[config;Name]]
$return[<@$env[user]> You $get[caught] **$env[ball]**! $inlineCode[$env[success]]

$if[$checkContains[$getUserVar[Caught;$env[user]];$env[id]]==false;This is a $bold[new $get[name]] that has been added to your completion!]
]

;

$return[<@$env[user]> Wrong Name!]

]


] 
    
`});


client.functions.add({
    name: "privSuccess",
    params: ["true","ball","success","id"],
    code: `
$scope[

$if[$env[true]==true;
$jsonLoad[config;$readFile[./config.json]] $let[caught;$env[config;Caught]] $let[name;$env[config;Name]]
$return[A User Has $get[caught] **$env[ball]**! $inlineCode[$env[success]]

$if[$checkContains[$getUserVar[Caught;$env[user]];$env[id]]==false;This is a $bold[new $get[name]] that has been added to your completion!]
]

;

$return[Wrong Name!]

]


] 
    
`});


client.functions.add({
    name: "redeem",
    params: ["ball", "emoji", "response"],
    code: `
$scope[
$return[You Redeemed $env[ball] <:emoji:$env[emoji]>! 
$if[$env[response]==;;Note: $env[response]]] 
] 
    
`});

client.functions.add({
    name: "completion",
    params: ["directory", "user"],
    code: `
$scope[

$arrayLoad[ballsOwned;,;$replace[$readDir[./$env[directory];,];.json;]]

$let[Amount;$arrayLength[ballsOwned]]
$let[owned;0]

$arrayCreate[owned;0]
$arrayCreate[unowned;0]

$arrayForEach[ballsOwned;balls;
$if[$checkContains[$getUserVar[Caught;$env[user]];$env[balls]]==true;

$arrayPush[owned;$env[balls]]
;
$arrayPush[unowned;$env[balls]]
    ]]

$return[{
  "owned": "$arrayJoin[owned;,]",
  "unowned": "$arrayJoin[unowned;,]",
  "proOwned": "$arrayLength[owned]",
  "proUnowned": "$arrayLength[unowned]",
}]
] 
    
`});

client.functions.add({
    name: "refurb",
    params: ["user"],
    code: `
$scope[

    $defer
$let[index;1]

$arrayLoad[ballsOwned;,;$replace[$readDir[./Balls;,];.json;]]

$arrayCreate[owned;0]
$arrayCreate[unowned;0]

$loop[$arrayLength[ballsOwned]; 

$if[$checkContains[$getUserVar[Caught;$env[user]];Ball$get[index]]==true;

$arrayPush[owned;Ball$get[index]];
$arrayPush[unowned;Ball$get[index]]
    ]
$letSum[index;1]
]

$setUserVar[owned;$arrayJoin[owned;,];$env[user]]
$setUserVar[unowned;$arrayJoin[unowned;,];$env[user]]

$return[Refurbished User Data Successfully]
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

// Connect to MongoDB (not used for balls but might be for other features)
mongoose.connect(config.mongo, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const app = express();
const PORT = process.env.PORT || 5129;

// Setup session middleware
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport Discord Strategy
passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    scope: ['identify', 'guilds']
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

// Setup multer for file uploads
const uploadsDir = path.join(__dirname, 'uploads/images');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

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

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (for CSS)
app.use(express.static('public'));

// Homepage route
app.get('/', (req, res) => {
    res.render('home');
});

// Discord authentication routes
app.get('/auth/discord', passport.authenticate('discord'));

app.get('/auth/discord/callback', passport.authenticate('discord', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/admin');
    });

// Dashboard route
app.get('/dashboard', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }
    // Simulated user ball data
    const userId = req.user.id;
    const balls = []; // Fetch user's balls from MongoDB if needed
    res.render('dashboard', { user: req.user, balls });
});

// Admin route
app.get('/admin', (req, res) => {
    if (!req.isAuthenticated() || !config.owners.includes(req.user.id)) {
        return res.redirect('/');
    }

    const ballsDir = path.join(__dirname, 'Balls');
    fs.readdir(ballsDir, (err, files) => {
        if (err) return res.status(500).send('Error reading directory');

        const ballsData = files
            .filter(file => file.endsWith('.json'))
            .map(file => {
                const ball = JSON.parse(fs.readFileSync(path.join(ballsDir, file)));
                return {
                    fileName: file,
                    country: ball.country,
                    shortName: ball.shortName,
                    health: ball.health,
                    strength: ball.strength,
                    rarity: ball.rarity
                };
            });

        res.render('admin', { balls: ballsData });
    });
});

app.get('/admin/edit/:fileName', (req, res) => {

    if (!req.isAuthenticated() || !config.owners.includes(req.user.id)) {
        return res.redirect('/');
    }

  const fileName = req.params.fileName; // e.g., Ball10.json
  const filePath = path.join(__dirname, 'Balls', fileName); // Full path to the file

  // Log the file path for debugging
  console.log('File path:', filePath);

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
      return res.status(404).send('Country ball not found');
  }

  // Read and parse the ball data
  const ballData = JSON.parse(fs.readFileSync(filePath));
  res.render('edit', { ballData, fileName });
});

// Handle adding a new ball
app.post('/admin/add', upload.single('imagePath'), (req, res) => {
    const ballsDir = path.join(__dirname, 'Balls');

    // Read the existing files to determine the next file number
    fs.readdir(ballsDir, (err, files) => {
        if (err) return res.status(500).send('Error reading directory');

        const jsonFiles = files.filter(file => file.endsWith('.json'));
        const nextBallNumber = jsonFiles.length + 1;
        const newFileName = `Ball${nextBallNumber}.json`;
        const newFilePath = path.join(ballsDir, newFileName);

        const newBall = {
            country: req.body.country,
            shortName: req.body.shortName,
            catchNames: req.body.catchNames,
            health: req.body.health,
            strength: req.body.strength,
            rarity: req.body.rarity,
            emojiID: req.body.emojiID,
            credits: req.body.credits,
            type: req.body.type,
            imagePath: req.file ? `/uploads/images/${req.file.filename}` : null
        };

        fs.writeFileSync(newFilePath, JSON.stringify(newBall, null, 2));
        res.redirect('/admin');
    });
});

// Handle deleting a ball
app.post('/admin/delete/:fileName', (req, res) => {
    const ballsDir = path.join(__dirname, 'Balls');
    const fileName = req.params.fileName;

    fs.unlink(path.join(ballsDir, fileName), (err) => {
        if (err) return res.status(500).send('Error deleting the file');
        res.redirect('/admin');
    });
});

// Handle editing a ball
app.post('/admin/edit/:fileName', upload.single('imagePath'), (req, res) => {
    const ballsDir = path.join(__dirname, 'Balls');
    const fileName = req.params.fileName;
    const filePath = path.join(ballsDir, fileName);

    // Check if file exists before proceeding
    if (!fs.existsSync(filePath)) {
        return res.status(404).send('Country ball not found');
    }

    // Load existing data from the file
    const existingBall = JSON.parse(fs.readFileSync(filePath));

    // Update only the provided fields, keeping existing values for others
    const updatedBall = {
        country: req.body.country || existingBall.country,
        shortName: req.body.shortName || existingBall.shortName,
        catchNames: req.body.catchNames || existingBall.catchNames,
        health: req.body.health || existingBall.health,
        strength: req.body.strength || existingBall.strength,
        rarity: req.body.rarity || existingBall.rarity,
        emojiID: req.body.emojiID || existingBall.emojiID,
        credits: req.body.credits || existingBall.credits,
        type: req.body.type || existingBall.type,
        imagePath: req.file ? `/uploads/images/${req.file.filename}` : existingBall.imagePath
    };

    // Write updated data back to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(updatedBall, null, 2));
    res.redirect('/admin');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Log in the bot
client.login(process.env.TOKEN);