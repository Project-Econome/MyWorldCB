module.exports = {
    data: {
        name: "inventory",
        description: "See your inventory!",
        type: 1
     },
    code: `


$let[caught;$getUserVar[Caught;$authorID]]

$arrayLoad[balls;,;$readDir[./Balls;,]]
$let[rareness;0]
$arrayForEach[balls;rare;

$jsonLoad[rareness;$readFile[./Balls/$env[rare]]]
$letSum[rareness;$env[rareness;rarity]]
]

    $let[page;1]

$textSplit[$get[caught];-]

    $let[totalServers;$getSplitTextLength]
    $let[totalPages;$round[$math[($get[totalServers]/11)+0.5]]]
    
  
    $title[Inventory]
    $description[Select a CountryBall from Below to View!]
    $footer[Page: $get[page]/$get[totalPages]]

    
    $if[$get[totalPages]>1;
$addActionRow
        $addButton[sepageback|1|$authorID;;Secondary;<:left:1255938305590300793>;true]
        $addButton[sepagecount;Page $get[page];Primary;;true]
        $addButton[sepageforward|1|$authorID;;Secondary;<:right:1255938306764701727>;false]
    ]

$addActionRow
    $addStringSelectMenu[balls-list-$get[page];Choose a Ball!;;0;1]

    $let[tmp;1]
    $let[startIndex;$math[($get[page]-1)*10]]
    $let[endIndex;$math[$get[startIndex]+9]]
    




$if[$get[totalServers]>=10;$let[min;10];$let[min;$get[totalServers]]]

    $loop[$min[$get[min];$get[totalServers]];

$textSplit[$get[caught];-]
$if[$splitText[$get[startIndex]]==;$let[startIndex;$math[$get[startIndex]+1]];
$let[split;$splitText[$get[startIndex]]]

$if[$checkContains[$get[split];|];$textSplit[$get[split];|]
$let[name;$splitText[0]]
$let[atk;$splitText[1]]
$let[hlth;$splitText[2]]
$let[date;$splitText[3]]
$let[random;]
$let[split2;$get[name]|$get[atk]|$get[hlth]|$get[date]];
$let[name;$get[split]]
$let[atk;1]
$let[hlth;1]
$let[date;1729707105594]
$let[random;-$randomNumber[0;100]]
$let[split2;$get[name]|$get[atk]|$get[hlth]|$get[date]]]



$jsonLoad[data;$readFile[./Balls/$get[name].json]]
        $addOption[$env[data;country] - Rarity $round[$math[($env[data;rarity]/$get[rareness])*100];2]%;ATK: $get[atk]% ● HP: $get[hlth]% ● $parseDate[$get[date];Date];$authorID-$get[split2]$get[random];<:emoji:$env[data;emojiID]>]
        $let[startIndex;$math[$get[startIndex]+1]]
        ]
    ]
    
    `
}