module.exports = {
    data: {
        name: "panel",
        description: "Developer Only Panel",
        type: 1
     },
    code: `
    
        $onlyForUsers[$ephemeral This is not for you!;$botOwnerID;838105973985771520]
    $ephemeral
	$jsonLoad[config;$readFile[./config.json]] $let[version;$env[config;Version]]


    $title[Welcome Back, $userDisplayName!]
    $description[Please an Action From The Buttons Below Or Look at The Current Data]
    
    $addField[Server Count:;$guildCount;true]
	$addField[User Count:;$userCount;true]
	$addField[Uptime:;$parseMS[$uptime;2;;true];true]
    $addField[Ram:;$round[$ram;2] mb;true]
	$addField[CPU:;$divide[$cpu;1000]%;true]
    $addField[CPU Model;$cpuModel;true]
	$addField[Bot Version;$get[version];true]
    $addField[Node Version:;$nodeVersion;true]
	$addField[ForgeScript Version:;$version;true]
    
$let[cpu;$cpu]
$loop[7;$wait[0.8] $let[cpu;$get[cpu],$cpu]]

$image[https://quickchart.io/chart?c={type:'line',data:{labels:['','','','','','','',''\\],datasets:[{backgroundColor:'rgba(255,99,132,0.5)',borderColor:'rgb(255,99,132)',data:[$get[cpu]\\],label:'Members',fill:'start',},\\],},options:{title:{text:'Statistics',display:true,},},}]

    $addActionRow
    $addButton[refresh;Refresh;Secondary;<:refresh:1236287188992524308>;]
    $addButton[update;Update;Success;<:announce_purple:1236051501307396136>;] 
$addButton[packages;Update Packages;Danger;<:remove_red:1300075239417446431>;]
    
    `
}