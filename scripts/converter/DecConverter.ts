const WORD_16_BIT = 16;
import * as _ from "lodash";

export class DecConverter {
    public from(buffer: Buffer): Array<number> {
        return _.map(buffer, (element) => parseInt(element.toString(WORD_16_BIT), WORD_16_BIT));
    }
}