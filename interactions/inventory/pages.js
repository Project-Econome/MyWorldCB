module.exports = {
    type: "interactionCreate",
    code: `
$if[$checkContains[$customID;|]==true;

$textSplit[$customID;|]
$let[pageAction;$splitText[0]]
$let[pageNumber;$splitText[1]]

$onlyIf[$splitText[2]==$authorID;$interactionReply
$ephemeral This isn't your Menu!]


$let[caught;$getUserVar[Caught;$authorID]]

$arrayLoad[balls;,;$readDir[./Balls;,]]
$let[rareness;0]
$arrayForEach[balls;rare;

$jsonLoad[rareness;$readFile[./Balls/$env[rare]]]
$letSum[rareness;$env[rareness;rarity]]
]

$textSplit[$get[caught];-]

$let[totalServers;$getSplitTextLength]
$let[totalPages;$round[$math[($get[totalServers]/11)+0.5]]]

$let[currentPage;$if[$checkContains[$get[pageAction];pageforward]==true;$math[$get[pageNumber]+1];$if[$checkContains[$get[pageAction];pageback]==true;$math[$get[pageNumber]-1]]]]

$let[startIndex;$math[10*($get[currentPage]-1)]]
$let[endIndex;$min[$math[$get[startIndex]+9];$get[totalServers]]]

$interactionUpdate
 $title[Inventory]
    $description[Select a CountryBall from Below to View!]
    $footer[Page: $get[currentPage]/$get[totalPages]]


$if[$get[totalPages]>1;
    $addActionRow
    $addButton[pageback|$get[currentPage]|$authorID;;Secondary;<:left:1255938305590300793>;$if[$get[currentPage]==1;true;false]]
    $addButton[pagecount;Page $get[currentPage];Primary;;true]
    $addButton[pageforward|$get[currentPage]|$authorID;;Secondary;<:right:1255938306764701727>;$if[$get[currentPage]==$get[totalPages];true;false]]
]

$addActionRow
    $addStringSelectMenu[balls-list-$get[page];Choose a Ball!;;0;1]
    

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
$let[split2;$get[name]|$get[atk]|$get[hlth]|$get[date]]
;
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
]

`
}