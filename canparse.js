"use strict";

var funary = require('funary');
var binary = require('binary');

const WORD_16_BIT = 16;
const ARRAY_8_BIT_EMPTY = [0,0,0,0,0,0,0,0];

var enumEndianess = {
    "Intel": "Intel",
    "Motorola": "Motorola"
}

// const inputBufferMotorola = new Buffer([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0xE8]);
// const inputBufferIntel = new Buffer([0xE8, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
// const instructionIntel = {
//     "issigned":     false,
//     "startbit":     0,
//     "bitlen":       64,
//     "endianess":    "Intel",
//     "resolution":   0.05,
//     "offsett":      5
// }
// const instructionMotorola = {
//     "issigned":     false,
//     "startbit":     0,
//     "bitlen":       64,
//     "endianess":    "Motorola",
//     "resolution":   0.05,
//     "offsett":      5
// }


var myClass = class {
    constructor(buffer, instruction) {
        this.buffer = buffer;
        this.instruction = instruction;
        this.hexString = new Array();
        this.hexNumber = new Array();
        this.bitMatrix = new Array();
        this.bitArray = new Array();

        this.buffer.forEach(function(element) {
            this.hexString.push(element.toString(WORD_16_BIT));
        }, this);

        this.hexString.forEach(function(element) {
            this.hexNumber.push(parseInt(element, WORD_16_BIT))
        }, this);

        this.hexNumber.forEach((element, index, arr) => {
            this.bitMatrix.push(funary.bitwise.or(ARRAY_8_BIT_EMPTY, funary.little.toUnsignedBinary(element)).reverse());
        })

        this.bitMatrix.forEach((element, index, arr) => {
            if(this.instruction.endianess === enumEndianess.Intel)
                this.bitArray = this.bitArray.concat(element.reverse())
            else if( this.instruction.endianess === enumEndianess.Motorola){
                this.bitArray = this.bitArray.concat(element)
            }
        })

        if(this.instruction.endianess === enumEndianess.Motorola)
            this.bitArray.reverse();

    }

    printBuf(){
        console.log(this.buffer);
    }
    printHex(){
        console.log(this.hexString);
    }
    printNum(){
        console.log(this.hexNumber);
    }
    printbitMatrix(){
        console.log(this.bitMatrix);
    }
    printbitArray(){
        console.log(this.bitArray);
    }

    getSignal(){
        var signalArray = new Array();
        for(var count = 0; count != this.instruction.bitlen; count ++){
            signalArray = signalArray.concat(this.bitArray[count + this.instruction.startbit])
        }
        return funary.little.toUnsignedDecimal(signalArray) * this.instruction.resolution + this.instruction.offsett;
    }
};


// var myObjIntel = new myClass(inputBufferIntel, instructionIntel);
// console.log(myObjIntel.getSignal())

// var myObjMotorola = new myClass(inputBufferMotorola, instructionMotorola);
// console.log(myObjMotorola.getSignal())



exports.myClass = myClass;