import * as funary from 'funary';
import * as _ from "lodash";

export class BitArrayConverter{
    static convert(source: Array<number>, isIntel: boolean): Array<string> {
        return  _.reduce(source,
             (resultSet: Array<string>, decUnsigned: number) => _.concat(resultSet , this.toByte(decUnsigned, isIntel)), []);
    }

    static toByte(decUnsigned: number, isIntel: boolean): Array<string>{
        let byte: Array<string>;
        let row;

        if(isIntel){
            row = funary.little.toUnsignedBinary(decUnsigned);
            byte = funary.addzeros(row, 8 - row.length);
        }
        else{
            row = funary.big.toUnsignedBinary(decUnsigned);
            byte = funary.unshiftzeros(row, 8 - row.length);
        }

        return byte;
    }
}