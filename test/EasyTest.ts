// import { CanParser } from "../scripts/CanParser";
// import { IInstruction, enumEndianess } from "../scripts/Types";

// let testCanParser = new CanParser();
// // INTEL TEST
// const inputBufferIntel: Buffer = Buffer.from([0xa1, 0xb2, 0xc3, 0xd4, 0xe5, 0xf6, 0x78, 0x9a]);
// const instructionIntel: IInstruction = {
//     "issigned": true,
//     "startbit": 27,
//     "bitlen": 9,
//     "endianess": enumEndianess.Intel,
//     "resolution": 1,
//     "offset": 0
// }
// console.log("INTEL:", JSON.stringify(testCanParser.retrieveNumberFromBuffer(inputBufferIntel, instructionIntel)));

// // MOTOROLA TEST
// const inputBufferMotorola: Buffer = Buffer.from([0x9a, 0x78, 0xf6, 0xe5, 0xd4, 0xc3, 0xb2, 0xa1]);
// const instructionMotorola: IInstruction = {
//     "issigned": true,
//     "startbit": 60,
//     "bitlen": 13,
//     "endianess": enumEndianess.Motorola,
//     "resolution": 1,
//     "offset": 0
// }
// console.log("MOTOROLA:", JSON.stringify(testCanParser.retrieveNumberFromBuffer(inputBufferMotorola, instructionMotorola)));
