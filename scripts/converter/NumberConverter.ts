import * as _ from "lodash";
import * as funary from "funary";

export class NumberConverter {
    static convert(binaryString: string, issigned: boolean, resolution: number, offset: number): number {
        if (issigned && _.startsWith(binaryString, "1"))
            return - parseInt(NumberConverter.retrieveStringNot(binaryString), 2) * resolution + offset;
        
        return parseInt(binaryString, 2) * resolution + offset;
    }

    static retrieveStringNot(binaryString: string): string {
        let bitArrayMaskedNot = _.map(<Array<string>>funary.stringToArray(binaryString), (element: string) => funary.not(element))
        bitArrayMaskedNot = funary.big.NADDER(bitArrayMaskedNot, funary.unshiftzeros([1], bitArrayMaskedNot.length - 1));
        return funary.arrayToString(bitArrayMaskedNot);
    }
}