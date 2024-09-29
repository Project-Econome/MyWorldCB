module.exports = {
    data: {
        name: "eval",
        description: "Evaluate a code.",
        options: [
            {
                type: 3,
                name: "code",
                description: "Your code goes here.",
                required: true,
            },
            {
                type: 5,
                name: "ephemeral",
                description: "Make the response ephemeral?"
            }
        ]
    },
     code: `$onlyForUsers[$ephemeral
 This is not for you!;$botOwnerID;838105973985771520]
 $if[$or[$option[ephemeral]==true;$option[ephemeral]==];$ephemeral
 $title[Eval]$description[Eval Some Code]$addField[code:;$option[code]]
 $interactionReply[$eval[$option[code]]];$eval[$option[code]]]
 `
 }