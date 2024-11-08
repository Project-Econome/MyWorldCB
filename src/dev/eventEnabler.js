module.exports = {
    data: {
        name: "event",
        description: "Developer Only Event Controller.",
        type: 1,
        options: [

            {

                type: 5,
                name: "enabled",
                description: "Enabled?",
                required: true
                },
                {

type: 3,
name: "name",
description: "Event Name",
required: true
}

        ]
     },
    code: `
    $onlyForUsers[$ephemeral This is not for you!;$botOwnerID;838105973985771520]

$if[$option[enabled]==true;
$ephemeral Enabled And Set Event
$setGlobalVar[EventActive;true]
$setGlobalVar[Event;$option[name]]

;
$ephemeral Disabled Events
$setGlobalVar[EventActive;false]

]

    `
}