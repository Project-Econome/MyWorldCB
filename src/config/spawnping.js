module.exports = {
    data: {
        name: "spawn-alerts",
        description: "Toggle The Enabled/Disabled state of spawn alerts",
        options: [
{
    type: 5,
    name: "toggle",
    description:"true or false",
    required: true
},
{
    type: 7,
    name: "role",
    description:"role",
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