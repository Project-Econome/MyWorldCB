module.exports = {
    type: "interactionCreate",
    allowedInteractionTypes: ["autocomplete"],
    code: `
        
        $onlyIf[$and[$isAutocomplete;$focusedOptionName==spawn]]

        $onlyForUsers[$addChoice[Not For You!;none]
            $autocomplete
            $stop;$botOwnerID;838105973985771520;1124764961990787082]

        
        $if[$trim[$focusedOptionValue]==;
            $addChoice[Make a search by entering something...;none]
            $autocomplete
            
        ]

        
        $let[query;$readDir[./Balls;|]]

        
        $arrayLoad[search;|;$get[query]]

        
        $if[$arrayLength[search]==0;
            $addChoice[No results;none]
            $autocomplete
            
        ]
        
$let[n;0]
$let[num;0]
$while[$and[$get[n]<20;$env[search;$get[num]]!=];
  $let[result;$env[search;$get[num]]]
  $jsonLoad[data;$readFile[./Balls/$get[result]]]
  $if[$checkContains[$env[data;country];$focusedOptionValue];
    $addChoice[$env[data;country];$get[result]]
    $letSum[n;1]
  ]
  $letSum[num;1]
]
        $autocomplete
    `
}