module.exports = {
    data: {
        name: "about",
        description: "Get Information about this bot",
        type: 1,
        integration_types: [0, 1]
     },
    code: `

$textSplit[$readDir[./Balls;,];,]

$title[$username[$botID] Discord Bot]
$description[Collect CountryBalls on Discord, exchange them and battle with friends!

Running version 1.0.0

**$getSplitTextLength** CountryBalls to collect
**$userCount** players that caught 0 CountryBalls
**$guildCount** servers playing

This bot was made by **$hyperlink[Econome;https://discord.com/users/838105973985771520]** owned by **$hyperlink[Ariel Aram;https://discord.com/users/525421785001361408]**, consider supporting me on my Ko-Fi :heart:]
    
    `
}