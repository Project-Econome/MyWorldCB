module.exports = {
    data: {
        name: "completion",
        description: "Show Your Current Completion of WorldCB",
        type: 1,
        options: [

{

type: 6,
name: "user",
description: "User"

}

        ]
        
     },
    code: `
    
  $if[$or[$getUserVar[owned;$authorID;0]==0;$getUserVar[unowned;$authorID;0]==0]; 
  $title[Account Migration]
   $description[Due to system updates to retain loss of data redo this command] 
   $callFunction[refurb;$authorID]

;

$arrayLoad[totals;,$replace[$readDir[./Balls;,];.json;]]

$let[Amount;$arrayLength[totals]]

$let[user;$if[$option[user]==;$authorID;$option[user]]]

$arrayLoad[owned;,;$getUserVar[owned;$get[user]]]
$arrayLoad[unowned;,;$getUserVar[unowned;$get[user]]]

$arrayForEach[owned;id;

$if[$env[id]==;;

$jsonLoad[json;$readFile[Balls/$env[id].json]]

$let[caught2;<:emoji:$env[json;emojiID]>,$get[caught2]]

]

]

$arrayForEach[unowned;id;

$if[$env[id]==;;

$jsonLoad[json;$readFile[Balls/$env[id].json]]

$let[uncaught2;<:emoji:$env[json;emojiID]>,$get[uncaught2]]

]

]


$author[$userDisplayName[$get[user]];$userAvatar[$get[user]]]

$let[percentage;$round[$math[($math[$arrayLength[owned]-1]/$get[Amount])*100];2]]

$description[$username[$botID] Progression: $get[percentage]%]

$jsonLoad[config;$readFile[./config.json]] $let[name;$env[config;Name]]


     $textSplit[$get[caught2];,]
$let[list1;$getSplitTextLength]

$let[tmpcount;$round[$math[($get[list1]/22)+0.5]]]
$if[$get[tmpcount]>=4;$let[min;4];$let[min;$get[tmpcount]]]

$let[page;1]
$loop[$get[min];$let[startIndex;$math[($get[page]-1)*22]]
    $let[endIndex;$math[$get[startIndex]+21]]

    $if[$get[list1]>=22;$let[min;22];$let[min;$get[list1]]]

    $loop[$min[$get[min];$get[list1]];

    $let[ficaught$get[page];$splitText[$get[startIndex]] $get[ficaught$get[page]]]

    $let[startIndex;$math[$get[startIndex]+1]]
    ]
    $if[$get[percentage]==0;$addField[Owned $get[name]'s | $math[$arrayLength[owned]-1];You Don't own Any $get[name]'s Yet.];$addField[$if[$get[page]==1;Owned $get[name]'s | $math[$arrayLength[owned]-1]];$get[ficaught$get[page]]]]
    $let[page;$math[$get[page]+1]]
    ]

     $textSplit[$get[uncaught2];,]
$let[list2;$getSplitTextLength]

$let[tmpcount;$round[$math[($get[list2]/22)+0.5]]]
$if[$get[tmpcount]>=4;$let[min;4];$let[min;$get[tmpcount]]]

$let[page;1]
$loop[$get[min];$let[startIndex;$math[($get[page]-1)*22]]
    $let[endIndex;$math[$get[startIndex]+21]]

$if[$get[list2]>=22;$let[min;22];$let[min;$get[list2]]]

$loop[$min[$get[min];$get[list2]];

$let[fiuncaught$get[page];$splitText[$get[startIndex]] $get[fiuncaught$get[page]]]

$let[startIndex;$math[$get[startIndex]+1]]
]
$if[$get[percentage]==100;$addField[Missing $get[name]'s | $math[$arrayLength[unowned]-1];You completed the bot congratulations! :tada:];$addField[$if[$get[page]==1;Missing $get[name]'s | $math[$arrayLength[unowned]-1]];$get[fiuncaught$get[page]]]]
$let[page;$math[$get[page]+1]]
]

]




    
    `
}