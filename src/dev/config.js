module.exports = {
    data: {
        name: "config",
        description: "Developer Only Config",
        type: 1,
       
     },
    code: `
    $onlyForUsers[$ephemeral This is not for you!;$botOwnerID;838105973985771520]
$title[Current Config:]

$jsonLoad[config;$readFile[./config.json]] $let[name;$env[config;Name]]
$let[Log;$env[config;Log]]
$let[Report;$env[config;Report]]
$let[Version;$env[config;Version]]


$description[$get[Name]]

$addField[Name: ;$get[name];true]
$addField[Reports Forum: ;$get[Report];true]
$addField[Catch Log: ;$get[Log];true]
$addField[Version: ;$get[Version];true]
    `
}