import { enumEndianess, IInstruction } from "./Types";
import { DecConverter } from './converter/DecConverter';
import { BitArrayConverter } from "./converter/BitArrayConverter";
import { MaskedBitStringConverter } from "./converter/MaskedBitStringConverter";
import { NumberConverter } from "./converter/NumberConverter";
import { ICanParser } from "./ICanParser";

export class CanParser implements ICanParser {

    public retrieveNumberFromBuffer(buffer: Buffer, instruction: IInstruction): number {
        let maskedBitStringConverter = new MaskedBitStringConverter();
        let decConverter = new DecConverter();
        let numberConverter = new NumberConverter();
        let bitString = maskedBitStringConverter.convert(decConverter.from(buffer), instruction.endianess === enumEndianess.Intel, instruction.startbit, instruction.bitlen);
        return numberConverter.convert(bitString, instruction.issigned, instruction.resolution, instruction.offset);
    }
}
