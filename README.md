# can-parser

## Installation

`$ npm install can-parser`

## Introduction

can-parser allows to parse buffers according to the instruction set provided.
It is intended as parser for buffers produced by socketcan raw channels (https://www.npmjs.com/package/socketcan)
It works with numeric values in CAN messages with "unlimited" DLC.
The instruction required is composed by the following fields:
```typescript
export type IInstruction = {
    issigned: boolean,
    startbit: number,
    bitlen: number,
    endianess: enumEndianess,
    resolution: number,
    offset: number
}
```
`issigned` states if the value is intended as "Two's complement" or unsigned
the `startbit` represents the first bit
the `bitlen` states the datum length
the `endianess` states the datum endianess (Intel - little-endian or Motorola - big-endian)
`resolution` and `offset` are used to convert the raw value with the correct interpretation 

```typescript
/*
The start bit in IInstruction is the absolute start bit. This can be retrieved, if not available,
from the relative start bit information (Byte Index = BI and Start Bit = SB)
Intel:       startbit = (8 x BI) + SB
Motorola:    startbit = [8 x (BI + 1)] - SB

Example Intel:     
             7___________1_0
           0|0 0 0 0 0 0 | 0
            |0 0 0 0 0 0 | 0
           2|- - - - - - X 0
            |0 0 0 0 0 0 0 0
            |0 0 0 0 0 0 0 0
            |0 0 0 0 0 0 0 0
            |0 0 0 0 0 0 0 0
           7|0 0 0 0 0 0 0 0

X is placed in BI = 2 and SB = 1
startbit = (8 x 2) + 1 = 17


Example Motorola:
             7___________1_0
           0|0 0 0 0 0 0 | 0
            |0 0 0 0 0 0 | 0
            |0 0 0 0 0 0 | 0
            |0 0 0 0 0 0 | 0
            |0 0 0 0 0 0 | 0
           5|- - - - - - X 0
            |0 0 0 0 0 0 0 0
           7|0 0 0 0 0 0 0 0

 X is placed in BI = 5 and SB = 1
startbit = [8 x (5 + 1)] - 1 = 47
*/
```

## Get started

Please follow the seed available [here](https://github.com/tierratelematics/can-parser) to get some tips.

## How to use?
javascript
```javascript
var cp = require("can-parser");
var canParser = new (cp.CanParser);

var myBuffer = Buffer.from([0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
var myInstruction = {
    issigned: true,
    startbit: 0,
    bitlen: 64,
    endianess: cp.enumEndianess.Intel,
    resolution: 1,
    offset: 0
};

var numericValue = canParser.retrieveNumberFromBuffer(myBuffer, myInstruction);

console.log(numericValue);
```
typescript
```typescript
import { CanParser, enumEndianess, IInstruction } from "can-parser";

let canParser = new (CanParser);

let myBuffer = Buffer.from([0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
let myInstruction: IInstruction = {
    issigned: true,
    startbit: 0,
    bitlen: 64,
    endianess: enumEndianess.Intel,
    resolution: 1,
    offset: 0
}

let numericValue = canParser.retrieveNumberFromBuffer(myBuffer, myInstruction);

console.log(numericValue);
```
## License

Copyright 2016 Tierra SpA

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.