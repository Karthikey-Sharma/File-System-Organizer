const fs = require('fs')
const path = require('path')

let types = {
    media: ["mp4", "mkv","mp3" , "jpg"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex' ],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

function organizeFn(dirpath){
    let destPath;
    // 1) input of a directory Path is required

    if(dirpath == undefined){
        console.log('Please enter a directory path')
        return
    }

    else{
        //1) we will chech if the passed dirpath is right or not
        let doesExist = fs.existsSync(dirpath)
        //console.log(doesExist)

        if(doesExist == true){
            //2.Create an organized file directory

            destPath = path.join(dirpath , 'organized_files')
            if(fs.existsSync(destPath) == false){
                fs.mkdirSync(destPath)
            }
            else{
                console.log("The File Already Exist!")
            }
        }
        else{
            console.log('Please Enter a valid path')
        }
    }
    organizeHelper(dirpath , destPath)
}

function organizeHelper(src , dest){
    let childNames = fs.readdirSync(src)
    //console.log(childNames)

    for(let i = 0 ; i < childNames.length ; i++){
        let childAdress = path.join(src , childNames[i])
        let isFile = fs.lstatSync(childAdress).isFile();

        if(isFile == true){
            let fileCategory = getCategory(childNames[i])
            console.log(childNames[i] + " Belongs to " + fileCategory)
            sendFiles(childAdress , dest , fileCategory)
            
        }
    }
}

function getCategory(name){
    let ext = path.extname(name)
    //console.log(ext)
    ext = ext.slice(1)
    //console.log(ext)

    for(let type in types){
        let cTypeArr = types[type]
        //console.log(cTypeArr)

        for(let i = 0 ; i < cTypeArr.length ; i++){
            if(ext == cTypeArr[i]){
                return type;
            }
        }
    }
    return 'others'
}

function sendFiles(srcFilePath , dest , fileCategory){
    let catPath = path.join(dest , fileCategory)

    if(fs.existsSync(catPath) == false){
        fs.mkdirSync(catPath)
    }
    let fileName = path.basename(srcFilePath)
    let destPath = path.join(catPath , fileName)
    fs.copyFileSync(srcFilePath , destPath)
    fs.unlinkSync(srcFilePath)
    console.log(fileName + "copied to "+ fileCategory)

}

module.exports = {
    organizeFnKey : organizeFn
}

