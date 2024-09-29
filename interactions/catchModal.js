module.exports = {
    type: "interactionCreate",
    code: `
        $if[$checkContains[$customID;.json]==true;
        
        
        $modal[Catch-$replace[$customID;.json;];Catch Me]
            $addTextInput[name;Name;;true;;WorldCB]
            $showModal
        ;

        $if[$checkContains[$customID;Catch-]==true;
        
        $let[jsonFile;$readFile[Balls/$replace[$customID;Catch-;].json]]

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