import * as funary from 'funary';

const WORD_16_BIT = 16;
const ARRAY_8_BIT_EMPTY = [0,0,0,0,0,0,0,0];

enum enumEndianess {
    Intel = "Intel",
    Motorola = "Motorola"
}

export class canparse {
    private buffer;
    private instruction;
    private hexString = new Array();
    private hexNumber = new Array();
    private bitMatrix = new Array();
    private bitArray = new Array();

    constructor(buffer, instruction) {
        this.buffer = buffer;
        this.instruction = instruction;

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
}

const inputBufferMotorola = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0xE8];
const inputBufferIntel = [0xE8, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
const instructionIntel = {
    "issigned":     false,
    "startbit":     0,
    "bitlen":       64,
    "endianess":    "Intel",
    "resolution":   0.05,
    "offsett":      5
}
const instructionMotorola = {
    "issigned":     false,
    "startbit":     0,
    "bitlen":       64,
    "endianess":    "Motorola",
    "resolution":   0.05,
    "offsett":      5
}


var myObjIntel = new canparse(inputBufferIntel, instructionIntel);
console.log(myObjIntel.getSignal())

var myObjMotorola = new canparse(inputBufferMotorola, instructionMotorola);
console.log(myObjMotorola.getSignal())
