import * as funary from 'funary';
import { enumEndianess, IInstruction } from "./ICanParse";
const WORD_16_BIT = 16;

export class CanParse {
    public hex = new Array();
    public dec = new Array();
    public bitArray = new Array();
    public bitString: string = "";

    retrieveNumberFromBuffer(buffer: Buffer, instruction: IInstruction): number {
        this.hex = this.retrieveHex(buffer);
        this.dec = this.retrieveDec(this.hex);
        this.bitArray = this.retrieveBitArray(this.dec, instruction.endianess);
        this.bitString = this.retrieveBitString(this.bitArray, instruction.endianess, instruction.bitlen, instruction.startbit);

        return this.retrieveNumericValue(this.bitString, instruction.issigned, instruction.resolution, instruction.offset);
    }

    retrieveHex(buffer: Buffer): Array<string> {
        let hexString = new Array();
        buffer.forEach(function (element) {
            hexString.push(element.toString(WORD_16_BIT));
        });
        return hexString;
    }

    retrieveDec(hexString: Array<string>): Array<string> {
        let hexNumber = new Array();
        hexString.forEach(function (element) {
            hexNumber.push(parseInt(element, WORD_16_BIT))
        });
        return hexNumber;
    }

    retrieveBitArray(hexNumber: Array<string>, endianess: enumEndianess): Array<string> {
        let bitArray = new Array();
        hexNumber.forEach((element, index, arr) => {
            let array;
            if (endianess === enumEndianess.Intel) {
                let row = funary.little.toUnsignedBinary(element);
                array = funary.addzeros(row, 8 - row.length);
            } else if (endianess === enumEndianess.Motorola) {
                let row = funary.big.toUnsignedBinary(element);
                array = funary.unshiftzeros(row, 8 - row.length);
            }
            array.forEach(element => {
                bitArray = bitArray.concat(element);
            })
        })
        return bitArray;
    }

    retrieveBitString(bitArray: Array<string>, endianess: enumEndianess, bitlen: number, startbit: number): string {
        let bitArrayMasked = new Array();
        if (endianess == enumEndianess.Intel) {
            for (var count = bitlen + startbit - 1; count != startbit - 1; count--) {
                bitArrayMasked.push(bitArray[count]);
            }
        } else if (endianess == enumEndianess.Motorola) {
            for (var count = startbit - bitlen; count != startbit; count++) {
                bitArrayMasked.push(bitArray[count]);
            }
        }
        return funary.arrayToString(bitArrayMasked);
    }

    retrieveNumericValue(binaryString: string, issigned: boolean, resolution: number, offset: number): number {
        if (issigned === true) {
            if (binaryString.charAt(0) === "0") {
                return parseInt(binaryString, 2) * resolution + offset;
            } else if (binaryString.charAt(0) === "1") {
                return - parseInt(this.retrieveStringNot(binaryString), 2) * resolution + offset;
            }
        } else {
            return parseInt(binaryString, 2) * resolution + offset;
        }
    }

    retrieveStringNot(binaryString: string): string {
        let bitArrayMaskedNot = new Array();
        funary.stringToArray(binaryString).forEach(element => {
            bitArrayMaskedNot.push(funary.not(element))
        })
        bitArrayMaskedNot = funary.big.NADDER(bitArrayMaskedNot, funary.unshiftzeros([1], bitArrayMaskedNot.length - 1));
        return funary.arrayToString(bitArrayMaskedNot);
    }
}
