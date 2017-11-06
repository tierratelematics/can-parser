import { CanParser } from "../scripts/CanParser";
import { IInstruction, enumEndianess } from "../scripts/Types";
import { Observable } from "rxjs";
import { SourceFileWriter } from "./SourceFileWriter";
import * as _ from "lodash";
var requireg = require('requireg');
var can = requireg('socketcan');
let microsecond = require('microsecond');
let fs = require("fs");
const sourcePath = "./source";

let canParser = new CanParser();

let arrayOfParseValue: Array<number> = [];
let counter = -1;
let Instruction: IInstruction = {
    issigned: true,
    startbit: 0,
    bitlen: 8,
    endianess: enumEndianess.Intel,
    resolution: 1,
    offset: 0
}

function getBufferSliceFromFile() {
    let myBuffer = fs.readFileSync(sourcePath)
    return Observable.interval(1).map(number => {
        counter++;
        return { timestamp: microsecond.start(), buffer: myBuffer.slice(counter * 8, counter * 8 + 8) }
    })
        .filter(data => data.buffer.length != 0)
}

SourceFileWriter.writeFile().then((val) => {
    getBufferSliceFromFile().subscribe(data => {
        fs.appendFile("./destination",
            canParser.retrieveNumberFromBuffer(data.buffer, Instruction) +  " in " + microsecond.diff(data.timestamp)  + " us\n");
    })
})