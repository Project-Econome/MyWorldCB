module.exports = {
    data: {
        name: "channel",
        description: "The new text channel to set.",
        options: [
            {
                type: 7,
                name: "channel",
                description: "Channel",
                required: true,
                channelTypes: [0]
            }
        ]
    },
     code: `$onlyForUsers[$ephemeral
 This is not for you!;$botOwnerID;838105973985771520]

 $title[Setup For WorldCB - Done]
 $description[By Adding/Setting this bot up you hereby agree to our ToS and Privacy Policy]
 $setGuildVar[SpawnChan;$option[channel]]
 $setGuildVar[SpawnChanEnabled;true]
 `
 }