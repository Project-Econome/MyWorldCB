module.exports = {
    data: {
       name: "bug",
       description: "Report a bug or any unexpected error you come across.",
options: [
  {
     type: 3,
     name: "description",
     description: "Describe the bug",
     choices: [],
     required: true },
  {
     type: 3,
     name: "reproduction",
     description: "Describe how the bug was produced. (so we can test the bug)",
     choices: [],
     required: true },
  {
     type: 3,
     name: "platform",
     description: "What platform did you expereince this bug on?",
     choices: [
     { name: "Android", value: "Android" },
     { name: "Android (Alpha)", value: "Android (Alpha)" },
     { name: "IOS", value: "IOS" },
     { name: "IOS (Testflight)", value: "IOS (Testflight)" },
     { name: "Desktop", value: "Desktop" },
     { name: "Desktop (Canary)", value: "Desktop (Canary)" },
     { name: "Desktop (PTB)", value: "Desktop (PTB)" },
     { name: "Web Client (Browser)", value: "Web Client (Browser)" }],
     required: true },
  {
     type: 11,
     name: "image",
     description: "Provide a screenshot of the bug",
     required: false },

]
  },
  code: `
    
$jsonLoad[config;$readFile[./config.json]] $let[report;$env[config;Report]]

$!createForumPost[$get[report];$option[platform]-$username;$title[New Bug Report!]
$addField[Description;$option[description]]
$addField[Reproduction;$option[reproduction]]
$addField[Platform;$option[platform]]
$image[$option[image]]
$color[5865F2]
$author[$username;$userAvatar]
$footer[$authorID]
$timestamp

 $addActionRow
    $addButton[low;Low Priority;Danger;🔴;]
	$addButton[med;Medium Priority;Secondary;🟡;]
	$addButton[high;High Priority;Success;🟢;]

]



$addField[Thank You!;
Your report has been sent, Our staff team will answer as soon as possible! Please stand by.

**Note:** Any invalid report could result in a temporary ban or a permanent restriction from accessing this feature!]
$color[5865F2]


     `}