module.exports = {
    data: {
        name: "completion",
        description: "Show Your Current Completion of WorldCB",
        type: 1,
        integration_types: [0, 1]
     },
    code: `

$author[$userDisplayName;$userAvatar]

$arrayLoad[ballsOwned;,;$replace[$readDir[./Balls;,];.json;]]

$let[Amount;$arrayLength[ballsOwned]]
$let[owned;0]

$arrayForEach[ballsOwned;balls;
$if[$checkContains[$getUserVar[Caught];$env[balls]]==true;
$letSum[owned;1]]
]

$let[percentage;$round[$math[($get[owned]/$get[Amount])*100];2]]

$description[$username[$botID] progression: $get[percentage]%]


$arrayLoad[ballsOwned;,;$replace[$readDir[./Balls;,];.json;]]

$arrayForEach[ballsOwned;balls;
$if[$checkContains[$getUserVar[Caught];$env[balls]]==true;

$let[caught;$env[balls],$get[caught]];
$let[uncaught;$env[balls],$get[uncaught]]]
]

$arrayLoad[owned;,;$get[caught]]

$arrayForEach[owned;id;

$if[$env[id]==;;

$jsonLoad[json;$readFile[Balls/$env[id].json]]

$let[caught2;<:emoji:$env[json;emojiID]> $get[caught2]]

]

]

$arrayLoad[unowned;,;$get[uncaught]]

$arrayForEach[unowned;id;

$if[$env[id]==;;

$jsonLoad[json;$readFile[Balls/$env[id].json]]

$let[uncaught2;<:emoji:$env[json;emojiID]> $get[uncaught2]]

]

]

$addField[Owned CountryBalls;$get[caught2]]
$addField[Missing CountryBalls;$get[uncaught2]]

    
    `
}