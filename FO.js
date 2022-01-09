const fs = require('fs')
const path = require('path')
let helpObj = require('./commands/help')
let treeObj = require('./commands/tree')
let organizeObj = require('./commands/organize')
// let input = process.argv[2]
// console.log(input);

let inputArr = process.argv.slice(2)
//console.log(inputArr)

let command = inputArr[0];
//console.log(command)


switch(command){
    case 'tree' :
        treeObj.treeFnKey(inputArr[1])
        break
    case 'organize' :
        organizeObj.organizeFnKey(inputArr[1])
        break
    case 'help' :
        helpObj.helpFnKey()
        break
    default :
        console.log("Please Enter A Valid Command 😒")
        break  
}





