module.exports = {
    type: "interactionCreate",
    code: `
        $if[$customID==low;

            $modal[submit-low;Priority Comment]
            $addTextInput[submit;Comment;;true;;This is Low Priority Because...]
            $showModal
            ;
$if[$customID==med;

            $modal[submit-med;Priority Comment]
            $addTextInput[submit;Comment;;true;;This is Med Priority Because...]
            $showModal
            ;
$if[$customID==high;

            $modal[submit-high;Priority Comment]
            $addTextInput[submit;Comment;;true;;This is High Priority Because...]
            $showModal
            ;
            $if[$customID==submit-low;

$editButton[low;low-disabled;Low Priority;Danger;🔴;true]
$editButton[med;med-disabled;Medium Priority;Secondary;🟡;true]
$editButton[high;high-disabled;High Priority;Success;🟢;true]

$interactionUpdate

$!httpRequest[https://networkcalc.com/api/encoder/$messageID?encoding=base64url;GET]
$sendDM[$getEmbeds[$channelID;$messageID;0;footerText];
$title[Dev Message Reply!]
$description[Thanks For being Paitent Our Developers Have Provided a Response Below!]

$addField[Priority;Low]

$addField[Reply;$input[submit]]

$color[#808080]
$author[$username;$userAvatar]
$footer[ID: $httpResult[encoded]]
$timestamp
]

$ephemeral
$addField[Thank You!;
Your Bug Reply has been sent.

**Note:** Any invalid use could result in a temporary ban or a permanent restriction from accessing this feature!]
$color[5865F2];
$if[$customID==submit-med;

$editButton[low;low-disabled;Low Priority;Danger;🔴;true]
$editButton[med;med-disabled;Medium Priority;Secondary;🟡;true]
$editButton[high;high-disabled;High Priority;Success;🟢;true]

$interactionUpdate

$!httpRequest[https://networkcalc.com/api/encoder/$messageID?encoding=base64url;GET]
$sendDM[$getEmbeds[$channelID;$messageID;0;footerText];
$title[Dev Message Reply!]
$description[Thanks For being Paitent Our Developers Have Provided a Response Below!]

$addField[Priority;Med]

$addField[Reply;$input[submit]]

$color[#808080]
$author[$username;$userAvatar]
$footer[ID: $httpResult[encoded]]
$timestamp
]

$ephemeral
$addField[Thank You!;
Your Bug Reply has been sent.

**Note:** Any invalid use could result in a temporary ban or a permanent restriction from accessing this feature!]
$color[5865F2];
$if[$customID==submit-high;

$editButton[low;low-disabled;Low Priority;Danger;🔴;true]
$editButton[med;med-disabled;Medium Priority;Secondary;🟡;true]
$editButton[high;high-disabled;High Priority;Success;🟢;true]

$interactionUpdate

$!httpRequest[https://networkcalc.com/api/encoder/$messageID?encoding=base64url;GET]
$sendDM[$getEmbeds[$channelID;$messageID;0;footerText];
$title[Dev Message Reply!]
$description[Thanks For being Paitent Our Developers Have Provided a Response Below!]

$addField[Priority;High]

$addField[Reply;$input[submit]]

$color[#808080]
$author[$username;$userAvatar]
$footer[ID: $httpResult[encoded]]
$timestamp
]

$ephemeral
$addField[Thank You!;
Your Bug Reply has been sent.

**Note:** Any invalid use could result in a temporary ban or a permanent restriction from accessing this feature!]
$color[5865F2]

                ]]]]]]
    `
  }