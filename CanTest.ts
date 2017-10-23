var can = require('socketcan');
import { CanParse } from "./CanParse"
import { IInstruction,enumEndianess } from "./ICanParse"

var channel0 = can.createRawChannel("vcan0", true);
var channel1 = can.createRawChannel("vcan1", true);

var InstructionCh0:IInstruction = {
    issigned:     true,
    startbit:     0,
    bitlen:       16,
    endianess:    enumEndianess.Intel,
    resolution:   1,
    offset:       0
}

var InstructionCh1:IInstruction = {
    issigned:     true,
    startbit:     64,
    bitlen:       16,
    endianess:    enumEndianess.Motorola,
    resolution:   1,
    offset:       0
}

let canParse = new CanParse();

// Log any message 
channel0.addListener("onMessage", function(msg) { 
    console.log(canParse.retrieveNumberFromBuffer(msg.data,InstructionCh0)); 
});
channel0.start();

// Log any message 
channel1.addListener("onMessage", function(msg) { 
    console.log(canParse.retrieveNumberFromBuffer(msg.data,InstructionCh1)); 
});
channel1.start();
