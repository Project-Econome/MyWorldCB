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

$let[percentage;$math[($get[owned]/$get[Amount])*100]]

$description[$username[$botID] progression: $get[percentage]%]


$arrayLoad[ballsOwned;,;$replace[$readDir[./Balls;,];.json;]]

$arrayForEach[ballsOwned;balls;
$if[$checkContains[$getUserVar[Caught];$env[balls]]==true;

$let[caught;$env[balls],$get[caught]];
$let[uncaught;$env[balls],$get[uncaught]]]
]

$addField[Owned CountryBalls;$get[caught]]
$addField[Missing CountryBalls;$get[uncaught]]

    
    `
}