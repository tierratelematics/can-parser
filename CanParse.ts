import * as funary from 'funary';
import { enumEndianess, IInstruction } from "./ICanParse";
const WORD_16_BIT = 16;

export class CanParse {
    private buffer: Buffer;
    private instruction: IInstruction;
    public hexString = new Array();
    public hexNumber = new Array();

    public bitArray = new Array();

    public bitArrayMasked = new Array();
    public binaryString: string = "";

    public bitArrayMaskedNot = new Array();
    public binaryStringNot: string = "";

    constructor(buffer: Buffer, instruction: IInstruction) {
        this.buffer = buffer;
        this.instruction = instruction;

        //HEX STRING
        this.buffer.forEach(function (element) {
            this.hexString.push(element.toString(WORD_16_BIT));
        }, this);

        //HEX NUMBER
        this.hexString.forEach(function (element) {
            this.hexNumber.push(parseInt(element, WORD_16_BIT))
        }, this);

        //BIT ARRAY
        this.hexNumber.forEach((element, index, arr) => {
            let array = funary.bitwise.or(funary.zeros(8), funary.little.toUnsignedBinary(element))
            array.forEach(element => {
                this.bitArray = this.bitArray.concat(element);
            })
        })

        //Evaluate the bitArray based on startBit and bitlen
        for (var count = this.instruction.bitlen + this.instruction.startbit - 1; count != this.instruction.startbit - 1; count--) {
            this.bitArrayMasked.push(this.bitArray[count]);
        }
        //Translate the bitArray into a string
        this.binaryString = funary.arrayToString(this.bitArrayMasked);
        //Generate the bitArray of the CA2 value
        funary.stringToArray(this.binaryString).forEach(element => {
            this.bitArrayMaskedNot.push(funary.not(element))
        })
        this.bitArrayMaskedNot = funary.big.NADDER(this.bitArrayMaskedNot, funary.unshiftzeros([1], this.bitArrayMaskedNot.length - 1));
        //Translate the bitArray of negative value into a string
        this.binaryStringNot = funary.arrayToString(this.bitArrayMaskedNot);
    }

    getNumericValue() {
        if (this.instruction.issigned === true) {
            if (this.binaryString.charAt(0) === "0") {
                console.log("Positive value")
                return parseInt(this.binaryString, 2) * this.instruction.resolution + this.instruction.offset;
            } else if (this.binaryString.charAt(0) === "1") {
                console.log("Negative value")
                return - parseInt(this.binaryStringNot, 2) * this.instruction.resolution + this.instruction.offset;
            }
        } else {
            console.log("Unsigned value")
            return parseInt(this.binaryString, 2) * this.instruction.resolution + this.instruction.offset;
        }

    }
}


//INTEL TEST
const inputBufferIntel: Buffer = Buffer.from([0xDC, 0xFF, 0xFF, 0xFF, 0x00, 0x00, 0x00, 0x00]);
const instructionIntel: IInstruction = {
    "issigned": true,
    "startbit": 0,
    "bitlen": 32,
    "endianess": enumEndianess.Intel,
    "resolution": 1,
    "offset": 0
}
var myObjIntel = new CanParse(inputBufferIntel, instructionIntel);
console.log(myObjIntel.getNumericValue());

// const inputBufferMotorola:Buffer = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x04, 0x5B]);
// const instructionMotorola:IInstruction = {
//     "issigned": false,
//     "startbit": 0,
//     "bitlen": 12,
//     "endianess": enumEndianess.Motorola,
//     "resolution": 0.05,
//     "offset": 5
// }
// var myObjMotorola = new CanParse(inputBufferMotorola, instructionMotorola);
// console.log(myObjMotorola.getSignal())




