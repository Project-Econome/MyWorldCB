module.exports = {
    data: {
        name: "disable",
        description: "Toggle The Enabled/Disabled stage of spawning",
        options: [
{
    type: 5,
    name: "toggle",
    description:"true or false",
    required: true
}
]
    },
     code: `$onlyIf[$or[$hasPerms[$guildID;$authorID;Administrator]==true;$authorID==$botOwnerID];$ephemeral Sorry Admin Only Command]
 $if[$option[toggle]==true;
 $title[Spawning Enabled]
 $description[$getGlobalVar[BallName;CountryBall]'s Will Start Spawning in the server]
 $setGuildVar[SpawnChanEnabled;true];
 
 $title[Spawning Disabled]
 $description[$getGlobalVar[BallName;CountryBall]'s Will Stop Spawning in the server]
 $setGuildVar[SpawnChanEnabled;false]]
 `
 }