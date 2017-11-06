import { BitArrayConverter } from "./BitArrayConverter";
import * as _ from "lodash";
import * as funary from 'funary';

export class MaskedBitStringConverter {
    bitArrayConverter: BitArrayConverter;

    constructor(bitArrayConverter: BitArrayConverter = new BitArrayConverter()) {
        this.bitArrayConverter = bitArrayConverter;
    }

    public convert(source: Array<number>, isIntel: boolean, startbit: number, bitlen: number): string {
        let sourceBitArrayConverter: Array<string> = this.bitArrayConverter.convert(source, isIntel);
        let end: number = (isIntel) ? _.size(sourceBitArrayConverter) - startbit : startbit;
        let start: number = (isIntel) ? end - bitlen : startbit - bitlen;

        return funary.arrayToString(_.slice(sourceBitArrayConverter, start, end));
    }

}