module.exports = {
    data: {
        name: "profile",
        description: "Get Information about a user",
        type: 1,
        integration_types: [0, 1]
     },
    code: `
    
$arrayLoad[ballsOwned;,;$replace[$readDir[./Balls;,];.json;]]

$let[Amount;$arrayLength[ballsOwned]]
$let[owned;0]

$arrayForEach[ballsOwned;balls;
$if[$checkContains[$getUserVar[Caught];$env[balls]]==true;
$letSum[owned;1]]
]

$let[percentage;$math[($get[owned]/$get[Amount])*100]]


$let[Power;0]
$let[Health;0]


$arrayLoad[ballsCounter;-;$getUserVar[Caught]]


$let[Rarity;0]

$arrayForEach[ballsCounter;balls2;

$if[$env[balls2]==;;$jsonLoad[json;$readFile[Balls/$env[balls2].json]]

$letSum[Rarity;$env[json;rarity]]]

]

    $title[$username]
$addField[Completion;Owned: $get[owned]
Collected: $get[owned]/$get[Amount];true]
$addField[Stats - WIP;Health: $get[Health]
Power: $get[Power];true]
$addField[Special;Rarity: $get[Rarity];true]
$addField[Level - WIP;Level: Soon
Experience: Soon;true]




    `
}