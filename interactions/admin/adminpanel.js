module.exports = {
    type: "interactionCreate",
    code: `
    $if[$customID==refresh;
    $ephemeral
    $let[count;$commandCount]
        $updateCommands
        $updateApplicationCommands
        $let[add;$sub[$commandCount;$get[count]]]
 
        $color[ff47ff]
        $description[Successfully Refreshed $username[$botID]'s Commands]

        $addActionRow
        $addButton[1;Added: $get[add];Success;✔️;true]
        $addButton[2;Total: $commandCount;Secondary;📃;true];

        $if[$customID==update;

            $modal[updates;Announce Update]
            $addTextInput[added;Added;;true;;$getGlobalVar[added;None]]
            $addTextInput[removed;Removed;;true;;$getGlobalVar[removed;None]]
            $showModal
            ;
            $if[$customID==updates;


                $setGlobalVar[added;$input[added]]
                $setGlobalVar[removed;$input[removed]]
$ephemeral
Updated
;
$if[$customID==refresh;
$title[Resetting Bot Data]

$arrayLoad[variable;,;1,2,3,4,5]

$arrayForEach[variable;number;
$sendMessage[$randomGuildChannelID[$env[number];GuildText];$title[Hello User,] $description[We are Sorry For Any Inconviences But $username[$botID]'s Data For Your and Others Servers has been reset due to a bug within our systems so we have proceeded with reseting users data This Excludes(Gtokens Balance, Server Slots, Badges)]]
$deleteGuildVar[logs_chan;$env[number]]
$deleteGuildVar[adchan;$env[number]]
$deleteGuildVar[module1;$env[number]]

$let[tmp;1]

$loop[$getGuildVar[Server-Count;$guildID;3];
    $deleteGuildVar[Server-$get[tmp];$env[number]]
	$deleteGuildVar[Color-$get[tmp];$env[number]]
	$deleteGuildVar[Edition-$get[tmp];$env[number]]
$letSum[tmp;1]]



]

                ]]]]
    `
  }