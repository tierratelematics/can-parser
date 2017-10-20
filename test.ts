const inputBufferIntel:Buffer = Buffer.from([0xC4,0xFF,0x00,0x00,0x00,0x00,0x00,0x00]);
var funary = require ("funary");

let hex = inputBufferIntel[0].toString(16);
let dec = parseInt(hex, 16);
let bitArray: Array<number> = funary.little.toUnsignedBinary(dec).reverse();
funary.unshiftzeros(bitArray, 8 - bitArray.length);

//POSITIVE WAY
let bitString = funary.arrayToString(bitArray);
let unsignedDecimal = parseInt(bitString,2);
console.log(hex);
console.log(dec);
console.log(bitArray);
console.log(bitString);
console.log(unsignedDecimal);

//NEGATIVE WAY
let bitArrayNot = funary.bitwise.xor([1,1,1,1,1,1,1,1],bitArray);
let bitArrayNegative = funary.big.NADDER(bitArrayNot,[0,0,0,0,0,0,0,1]);
let bitStringNegative = funary.arrayToString(bitArrayNegative);
let unsignedDecimalNegative = - parseInt(bitStringNegative,2);

console.log(hex);
console.log(dec);
console.log(bitArrayNegative);
console.log(bitStringNegative);
console.log(unsignedDecimalNegative);
