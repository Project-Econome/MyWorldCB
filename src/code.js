module.exports = {
    data: {
        name: "redeem",
        description: "Redeem a code within the bot!",
        type: 1,
        options: [

{

type: 3,
name: "code",
description: "code to redeem",
required: true
}

        ]
        
     },
    code: `
$jsonLoad[code;$readFile[./codes/$toLowerCase[$option[code]].json]]
$onlyForUsers[$ephemeral Being Reworked due to a bug;$botOwnerID;838105973985771520]


$if[$or[$env[code;Reward]==;$checkContains[$getUserVar[Redeemed];$option[code]]];This Code is Invalid/Used;

$jsonLoad[numbers;$readFile[./Balls/$env[code;Reward].json]]
$let[health;$randomNumber[250;$env[numbers;health]]]
$let[attack;$randomNumber[250;$env[numbers;strength]]]
$let[Country;$env[numbers;country]]
$let[emoji;$env[numbers;emojiID]]

$if[$getUserVar[inventory;$authorID;open]==open;$callFunction[redeem;$get[Country] (#$math[$getGlobalVar[globalCaught;0]+1], $get[attack]%/$get[health]%);$get[emoji];$env[code;Message]];$ephemeral $callFunction[redeem;$get[Country] (#$math[$getGlobalVar[globalCaught;0]+1], $get[attack]%/$get[health]%);$get[emoji];$env[code;Message]]]
    

$jsonLoad[config;$readFile[./config.json]] $let[logs;$env[config;Log]]

$sendMessage[$get[logs];
A ball has been Redeemed!
$title[Details:]
$description[Code: $toTitleCase[$option[code]]
Author: $username
User ID: $authorID
Guild ID: $guildID
Ball: $get[Country]]


]

        $setGlobalVar[globalCaught;$math[$getGlobalVar[globalCaught;0]+1]]

        $setUserVar[Caught;$env[code;Reward]|$get[attack]|$get[health]|$getTimestamp-$getUserVar[Caught]]
		$setUserVar[Redeemed;$toLowerCase[$option[code]]-$getUserVar[Redeemed]]
]

    
    `
}