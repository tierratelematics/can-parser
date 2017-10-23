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
            let array;
            if(this.instruction.endianess === enumEndianess.Intel){
                let row = funary.little.toUnsignedBinary(element);
                array = funary.addzeros(row, 8 - row.length);
            }else if(this.instruction.endianess === enumEndianess.Motorola){
                let row = funary.big.toUnsignedBinary(element);
                array = funary.unshiftzeros(row, 8 - row.length);
            }
            array.forEach(element => {
                this.bitArray = this.bitArray.concat(element);
            })
        })

        //Evaluate the bitArray based on startBit and bitlen
        if(this.instruction.endianess == enumEndianess.Intel){
            for (var count = this.instruction.bitlen + this.instruction.startbit - 1; count != this.instruction.startbit - 1; count--) {
                this.bitArrayMasked.push(this.bitArray[count]);
            }
        }else if(this.instruction.endianess == enumEndianess.Motorola){
            for (var count = this.instruction.startbit - this.instruction.bitlen; count != this.instruction.startbit ; count++) {
                this.bitArrayMasked.push(this.bitArray[count]);
            }
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
                return parseInt(this.binaryString, 2) * this.instruction.resolution + this.instruction.offset;
            } else if (this.binaryString.charAt(0) === "1") {
                return - parseInt(this.binaryStringNot, 2) * this.instruction.resolution + this.instruction.offset;
            }
        } else {
            return parseInt(this.binaryString, 2) * this.instruction.resolution + this.instruction.offset;
        }

    }
}


//INTEL TEST
// const inputBufferIntel: Buffer = Buffer.from([0xa1, 0xb2, 0xc3, 0xd4, 0xe5, 0xf6, 0x78, 0x9a]);
// const instructionIntel: IInstruction = {
//     "issigned": true,
//     "startbit": 17,
//     "bitlen": 47,
//     "endianess": enumEndianess.Intel,
//     "resolution": 1,
//     "offset": 0
// }
// var myObjIntel = new CanParse(inputBufferIntel, instructionIntel);
// console.log("INTEL:", JSON.stringify(myObjIntel.bitArrayMasked));

// //MOTOROLA TEST
// const inputBufferMotorola: Buffer = Buffer.from([0x9a, 0x78, 0xf6, 0xe5, 0xd4, 0xc3, 0xb2, 0xa1]);
// const instructionMotorola: IInstruction = {
//     "issigned": true,
//     "startbit": 47,
//     "bitlen": 47,
//     "endianess": enumEndianess.Motorola,
//     "resolution": 1,
//     "offset": 0
// }
// var myObjMotorola = new CanParse(inputBufferMotorola, instructionMotorola);
// console.log("MOTOROLA:", JSON.stringify(myObjMotorola.bitArrayMasked));
