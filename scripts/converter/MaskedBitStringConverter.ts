import { BitArrayConverter } from "./BitArrayConverter";
import * as _ from "lodash";
import * as funary from 'funary';

export class MaskedBitStringConverter {
    static convert(source: Array<number>, isIntel: boolean, bitlen: number, startbit: number): string {
        let start: number = (isIntel) ? startbit : startbit-bitlen;
        let end: number = start + bitlen;

        let bitArrayMasked: Array<string> = _.slice(BitArrayConverter.convert(source, isIntel), start, end);
        if(!isIntel)
            bitArrayMasked = _.reverse(bitArrayMasked);

        return funary.arrayToString(bitArrayMasked);
    }

}