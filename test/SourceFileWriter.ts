let fs = require('fs');
const sourcePath = "./source";

export class SourceFileWriter{
    static writeFile(){
        return new Promise( (resolve,reject) => {
            if(fs.existsSync(sourcePath)){
                console.log("The source file already exists")
                resolve(false);
            }else{
                console.log("Source file creation")
                fs.open(sourcePath, 'a+',(err,fd) => {
                    fs.writeFile(fd, Buffer.from([0x00,0x11,0x22,0x33,0x44,0x55,0x66,0x77]));
                    let hexValue = 0x00;
                    for(var i = 0 ; i <= 500 ; i ++){
                        fs.appendFile(fd, Buffer.from([hexValue,hexValue+1,hexValue+2,hexValue+3,hexValue+4,hexValue+5,hexValue+6,hexValue+7]))
                        hexValue = hexValue + 8;
                    }
                    resolve(true);
                })
            }
        })
    }
}