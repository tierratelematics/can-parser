// var requireg = require('requireg');
// var can = requireg('socketcan');
// import { CanParser } from "../CanParser"
// import { IInstruction,enumEndianess } from "../Types"

// var channel0 = can.createRawChannel("vcan0", true);
// var channel1 = can.createRawChannel("vcan1", true);
// // var channel0 = can.createRawChannel("can0", true);
// // var channel1 = can.createRawChannel("can1", true);

// var InstructionCh0:IInstruction = {
//     issigned:     true,
//     startbit:     0,
//     bitlen:       8,
//     endianess:    enumEndianess.Intel,
//     resolution:   1,
//     offset:       0
// }

// var InstructionCh1:IInstruction = {
//     issigned:     true,
//     startbit:     64,
//     bitlen:       8,
//     endianess:    enumEndianess.Motorola,
//     resolution:   1,
//     offset:       0
// }

// let canParser = new CanParserClass();

// // Log any message 
// channel0.addListener("onMessage", function(msg) { 
//     try{
//         console.log(canParser.retrieveNumberFromBuffer(msg.data,InstructionCh0)); 
//     }catch(e){

//     }
// });
// channel0.start();

// // Log any message 
// channel1.addListener("onMessage", function(msg) { 
//     try{
//         console.log(canParser.retrieveNumberFromBuffer(msg.data,InstructionCh1)); 
//     }catch(e){

//     }
// });
// channel1.start();
