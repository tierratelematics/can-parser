import { BitArrayConverter } from "./BitArrayConverter";
import * as _ from "lodash";
import * as funary from 'funary';

export class MaskedBitStringConverter {
    bitArrayConverter : BitArrayConverter;

    constructor(bitArrayConverter : BitArrayConverter = new BitArrayConverter()){
        this.bitArrayConverter = bitArrayConverter;
    }

    public convert(source: Array<number>, isIntel: boolean, startbit: number, bitlen: number): string {
        let sourceBitArrayConverter: Array<string> =  this.bitArrayConverter.convert(source, isIntel);
        let start: number = (isIntel) ? startbit : _.size(sourceBitArrayConverter) - startbit - bitlen;
        let end: number = (isIntel) ? start + bitlen : _.size(sourceBitArrayConverter) - startbit;
        
        let bitArrayMasked: Array<string> = _.slice(sourceBitArrayConverter, start, end);
        if(!isIntel)
            bitArrayMasked = _.reverse(bitArrayMasked);
            
        return funary.arrayToString(bitArrayMasked);
    }

}