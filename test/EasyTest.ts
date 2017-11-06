// import { CanParserClass } from "../CanParserClass";
// import { IInstruction, enumEndianess } from "../ICanParser";

// // INTEL TEST
// var myCanParse = new CanParserClass();

// const inputBufferIntel: Buffer = Buffer.from([0xa1, 0xb2, 0xc3, 0xd4, 0xe5, 0xf6, 0x78, 0x9a]);
// const instructionIntel: IInstruction = {
//     "issigned": true,
//     "startbit": 17,
//     "bitlen": 47,
//     "endianess": enumEndianess.Intel,
//     "resolution": 1,
//     "offset": 0
// }
// var myObjIntel = new CanParserClass();
// console.log("INTEL:", JSON.stringify(myCanParse.retrieveNumberFromBuffer(inputBufferIntel, instructionIntel)));

// // MOTOROLA TEST
// const inputBufferMotorola: Buffer = Buffer.from([0x9a, 0x78, 0xf6, 0xe5, 0xd4, 0xc3, 0xb2, 0xa1]);
// const instructionMotorola: IInstruction = {
//     "issigned": true,
//     "startbit": 47,
//     "bitlen": 47,
//     "endianess": enumEndianess.Motorola,
//     "resolution": 1,
//     "offset": 0
// }
// var myObjMotorola = new CanParserClass();
// console.log("MOTOROLA:", JSON.stringify(myCanParse.retrieveNumberFromBuffer(inputBufferMotorola, instructionMotorola)));
