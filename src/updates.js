module.exports = {
    data: {
        name: "updates",
        description: "View The Latest Updates On The Bot!",
        type: 1
     },
    code: `

    $title[Latest Updates!]
    $addField[<:emoji:1300073930236756048> What's New?;$getGlobalVar[added;None]]
    $addField[<:emoji:1300073949849194527> Notes;$getGlobalVar[removed;None]]
    $footer[Lots Of Effort and love <3 -Dev Team]
    
    `
}