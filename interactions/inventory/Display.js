module.exports = {
    type: "interactionCreate",
    code: `
$onlyIf[$checkContains[$customID;balls-list-]==true]
    $let[server;$selectMenuValues[0]]

$textSplit[$get[server];-]
$if[$authorID==$splitText[0];
$interactionReply



$let[info;$splitText[1]]
$textSplit[$get[info];|]

$jsonLoad[data;$readFile[./Balls/$splitText[0].json]]

Caught On: <t:$round[$math[$splitText[3]/1000]]:f> (<t:$round[$math[$splitText[3]/1000]]:R>)

ATK: $splitText[1]
HP: $splitText[2]

$createCanvas[card;
$setCanvasSize[720;303.5]

$drawRect[;fill;#000000;0;0;720;303.5]

$drawImage[;.$env[data;imagePath];80;80;$math[($imageSize[.$env[data;imagePath];width]*2)/10];$math[($imageSize[.$env[data;imagePath];height]*2)/10]]

$drawImage[;./cards/$env[data;type];0;0;720;303.5]

$drawText[;fill;$env[data;country];30px DejaVu Sans;#000000;380;111.65]

$drawText[;fill;$splitText[1];19px DejaVu Sans;#FFFFFF;490;256]
$drawText[;fill;$splitText[2];19px DejaVu Sans;#FFFFFF;400;256]
$drawText[;fill;$env[data;credits];10px DejaVu Sans;#FFFFFF;430;280]
]
$attachCanvas[card;card.png]


;
$interactionReply
$ephemeral This isn't your Menu!]

    `
}
