module.exports = {
    data: {
        name: "about",
        description: "Get Information about this bot",
        type: 1,
        integration_types: [0, 1]
     },
    code: `

$if[$getGlobalVar[EventActive]==true;
$let[directory;Events/$getGlobalVar[Event]]
;
$let[directory;Balls]
]
$textSplit[$readDir[./$get[directory];,];,]

$title[$username[$botID] Discord Bot]
$description[

$jsonLoad[config;$readFile[./config.json]] $let[version;$env[config;Version]]

Collect $getGlobalVar[BallName;CountryBall]'s on Discord, exchange them and battle with friends!

Running version $get[version]

**$getSplitTextLength** $getGlobalVar[BallName;CountryBall]'s to collect
**$userCount** players that caught $getGlobalVar[globalCaught;0] $getGlobalVar[BallName;CountryBall]'s
**$guildCount** servers playing



This bot was made by **$hyperlink[Econome;https://discord.com/users/838105973985771520]** owned by **$hyperlink[Ariel Aram;https://discord.com/users/525421785001361408]**, consider supporting me on my Ko-Fi :heart:]
    
    `
}