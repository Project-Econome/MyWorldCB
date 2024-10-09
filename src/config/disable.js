module.exports = {
    data: {
        name: "disable",
        description: "Toggle The Enabled/Disabled stage of spawning",
        options: []
    },
     code: `$onlyForUsers[$ephemeral
 This is not for you!;$botOwnerID;838105973985771520]
 $if[$option[toggle]==true;
 $title[Spawning Enabled]
 $description[Balls Will Start Spawning in the server]
 $setGuildVar[SpawnChanEnabled;true];
 
 $title[Spawning Disabled]
 $description[Balls Will Stop Spawning in the server]
 $setGuildVar[SpawnChanEnabled;false]]
 `
 }