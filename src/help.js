module.exports = {
    data: {
        name: "help",
        description: "show the list of commands from the bot",
        type: 1,
        integration_types: [0, 1]
     },
    code: `

$title[$username[$botID] Discord Bot - help menu]
$addField[**Config**;</config channel:$botID>
</config disable:$botID>]
$addField[**Info**;</about:$botID>
</help:$botID>
</report bug:$botID>]
$addField[**Player**;</profile:$botID>]
$addField[**Balls**;</completion:$botID>]

    `
}