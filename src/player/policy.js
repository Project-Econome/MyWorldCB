module.exports = {
    data: {
        name: "privacy",
        description: "Set your privacy policy",
        options: [
            {
                type: 3,
                name: "policy",
                description: "choice",
                required: true,
                choices: [{ name: "Open Inv", value: "open" },
                         { name: "Private Inv", value: "private" }]
            }
        ]
    },
     code: `
$ephemeral

$if[$option[policy]==open;
$setUserVar[inventory;open]
Your privacy policy has been set to **ALLOW**.
;
$setUserVar[inventory;private]
Your privacy policy has been set to **DENY**.
]
 `
 }


