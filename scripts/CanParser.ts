// import { enumEndianess, IInstruction } from "./Types";
// import { DecConverter } from './converter/DecConverter';
// import { BitArrayConverter } from "./converter/BitArrayConverter";
// import { MaskedBitStringConverter } from "./converter/MaskedBitStringConverter";
// import { NumberConverter } from "./converter/NumberConverter";
// import { ICanParser } from "./ICanParser";
// import { injectable } from "inversify";

// @injectable()
// export class CanParser implements ICanParser{
//     // constructor(@inject("ICanParser") private canParser: ICanParser)
//     public retrieveNumberFromBuffer(buffer: Buffer, instruction: IInstruction): number {
//         let bitString = MaskedBitStringConverter.convert(DecConverter.from(buffer), instruction.endianess === enumEndianess.Intel, instruction.bitlen, instruction.startbit);
//         return NumberConverter.convert(bitString, instruction.issigned, instruction.resolution, instruction.offset);
//     }
//  }
