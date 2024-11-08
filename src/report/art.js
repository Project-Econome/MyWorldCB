module.exports = {
    data: {
       name: "submit-artwork",
       description: "Submit artwork to the bot",
options: [
  {
     type: 3,
     name: "description",
     description: "Describe the stats",
     choices: [],
     required: true },
{
     type: 11,
     name: "image",
     description: "Provide a image of your work!",
     required: true },

]
  },
  code: `
    
$jsonLoad[config;$readFile[./config.json]] $let[art;$env[config;Artwork]]

$!createForumPost[$get[art];Artwork-$username;$title[New art Submission!]
$addField[Description;$option[description]]
$image[$option[image]]
$color[5865F2]
$author[$username;$userAvatar]
$footer[$authorID]
$timestamp



]



$addField[Thank You!;
Your artwork has been sent, Our staff team will review it as soon as possible! Please stand by.

**Note:** Any copied/fake artwork could result in a temporary ban or a permanent restriction from accessing this feature!]
$color[5865F2]


     `}