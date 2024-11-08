module.exports = {
    data: {
        name: "eval",
        description: "Evaluate a code.",
        options: [
            {
                type: 3,
                name: "type",
                description: "script type",
                required: true,
                choices: [{ name: "Normal", value: "normal" },
                         { name: "Javascript", value: "javascript" }]
            },
            {
                type: 3,
                name: "code",
                description: "Your code goes here.",
                required: true,
            }
        ]
    },
     code: `$onlyForUsers[$ephemeral
 This is not for you!;$botOwnerID;838105973985771520]
 $if[$or[$option[ephemeral]==true;$option[ephemeral]==];$ephemeral
 $title[Eval]$description[Eval Some Code]$addField[code:;$option[code]]
$if[$option[type]==normal;$interactionReply[$eval[$option[code]]];$interactionReply[$djsEval[$option[code]]]]
 ]
 `
 }