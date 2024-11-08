module.exports = {
    data: {
       name: "lost-data",
       description: "Report CountryBall Data you have lost previously from WorldCB",
options: [
  {
     type: 3,
     name: "description",
     description: "List your CB's Lost",
     choices: [],
     required: true },
  {
     type: 11,
     name: "image",
     description: "Provide a screenshot",
     required: true },

]
  },
  code: `
    
$jsonLoad[config;$readFile[./config.json]] $let[report;$env[config;Report]]

$!createForumPost[$get[report];LOSTDATA-$username;$title[New Data Report!]
$addField[Description;$option[description]]
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