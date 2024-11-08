module.exports = {
    type: "interactionCreate",
    code: `

$if[$getGlobalVar[EventActive]==true;
$let[directory;Events/$getGlobalVar[Event]]
;
$let[directory;Balls]
]



        $if[$checkContains[$customID;.json]==true;
         
        $modal[Catch-$replace[$customID;.json;];Catch Me]
            $addTextInput[name;Name;;true;WorldCB;]
            $showModal

        ;


        $if[$checkContains[$customID;Catch-]==true;



$setTimeout[$jsonLoad[data;$getComponents[$channelID;$messageID]]
        $arrayForEach[data;rows;
        $jsonLoad[row;$env[rows]]
        $arrayMap[row;comp;
        $return[$checkCondition[$env[comp;disabled]]]
        ;result]
        ]


        $onlyIf[$env[result]!=false;$interactionReply Sorry I Have Already Been Caught] ;2s]

        $let[jsonFile;$readFile[$get[directory]/$replace[$customID;Catch-;].json]]

        $jsonLoad[json;$get[jsonFile]]

        $let[response;$toLowerCase[$input[name]]]
        $arrayLoad[CatchNames;,;$toLowerCase[$env[json;catchNames]]]
        $let[Country;$env[json;country]]


        $if[$arrayIncludes[CatchNames;$get[response]]==true;

$onlyIf[$getGuildVar[delay]==false;$interactionReply Sorry I Have Already Been Caught]

        $setGuildVar[delay;true]
        $!editButtonOf[$channelID;$messageID;$replace[$customID;Catch-;].json;disabled;Catch Me!;Danger;;true]

        $interactionReply

$jsonLoad[numbers;$readFile[./Balls/$replace[$customID;Catch-;].json]]
$let[health;$randomNumber[250;$env[numbers;health]]]
$let[attack;$randomNumber[250;$env[numbers;strength]]]


$if[$getUserVar[inventory;$authorID;open]==open;$callFunction[ballSuccess;$authorID;true;$get[Country];(#$math[$getGlobalVar[globalCaught;0]+1], $get[attack]%/$get[health]%);$replace[$customID;Catch-;]];$callFunction[privSuccess;true;$get[Country];(#$math[$getGlobalVar[globalCaught;0]+1], $get[attack]/$get[health]);$replace[$customID;Catch-;]]]
    

$jsonLoad[config;$readFile[./config.json]] $let[logs;$env[config;Log]]

$sendMessage[$get[logs];
A ball has been caught!
$title[Details:]
$description[Server: $guildName
Author: $username
User ID: $authorID
Guild ID: $guildID
Ball: $get[Country]]


]

        $setGlobalVar[globalCaught;$math[$getGlobalVar[globalCaught;0]+1]]

        $setUserVar[Caught;$replace[$customID;Catch-;]|$get[attack]|$get[health]|$getTimestamp-$getUserVar[Caught]]

        $setGlobalVar[ButtonsMap;$replace[$getGlobalVar[ButtonsMap];$channelID-$messageID-$replace[$customID;Catch-;].json,;]] 
        ;
        $interactionReply
		$if[$getUserVar[inventory;$authorID;open]==open;$callFunction[ballSuccess;$authorID;false;$get[Country];false;];$callFunction[privSuccess;false;$get[Country];false;]]
]




]
        ]

        

        
    `
  }