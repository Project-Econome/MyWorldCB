module.exports = {
    type: "interactionCreate",
    code: `

$if[$getGlobalVar[EventActive]==true;
$let[directory;Events/$getGlobalVar[Event]]
;
$let[directory;Balls]
]

$jsonLoad[data;$getComponents[$channelID;$messageID]]
        $arrayForEach[data;rows;
        $jsonLoad[row;$env[rows]]
        $arrayMap[row;comp;
        $return[$checkCondition[$env[comp;disabled]]]
        ;result]
        ]

        $if[$checkContains[$customID;.json]==true;
        
        
        $modal[Catch-$replace[$customID;.json;];Catch Me]
            $addTextInput[name;Name;;true;;WorldCB]
            $showModal
        ;

        $if[$checkContains[$customID;Catch-]==true;
        $onlyIf[$env[result]!=false;$interactionReply Sorry I Have Already Been Caught]
        $let[jsonFile;$readFile[$get[directory]/$replace[$customID;Catch-;].json]]

        $jsonLoad[json;$get[jsonFile]]

        $let[response;$toLowerCase[$input[name]]]
        $let[CatchNames;$toLowerCase[$env[json;catchNames]]]
        $let[Country;$env[json;country]]

        $if[$checkContains[$get[CatchNames];$get[response]]==true;
        
        $!editButtonOf[$channelID;$messageID;$replace[$customID;Catch-;].json;disabled;Catch Me!;Danger;;true]

        $interactionReply

        
        
        $callFunction[ballSuccess;$authorID;true;$get[Country]]

        $setUserVar[Caught;$replace[$customID;Catch-;]-$getUserVar[Caught]]

        $setGlobalVar[ButtonsMap;$replace[$getGlobalVar[ButtonsMap];$channelID-$messageID-$replace[$customID;Catch-;].json,;]] 
        ;
        $interactionReply
        $callFunction[ballSuccess;$authorID;false;$get[Country]]
]



]

        ]

        

        
    `
  }