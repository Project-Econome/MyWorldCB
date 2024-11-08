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
     code: `$onlyIf[$or[$hasPerms[$guildID;$authorID;Administrator]==true;$authorID==$botOwnerID];$ephemeral Sorry Admin Only Command]

 $title[Setup For $username[$botID] - Done]
 $description[By Adding/Setting this bot up you hereby agree to our ToS and Privacy Policy]
 $setGuildVar[SpawnChan;$option[channel]]
 $setGuildVar[SpawnChanEnabled;true]
 `
 }