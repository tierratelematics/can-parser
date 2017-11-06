const WORD_16_BIT = 16;

export class DecConverter {
    static from(buffer: Buffer): Array<number> {
        let resultSet: Array<number> = [];
        buffer.forEach(function (element) {
            resultSet.push(parseInt(element.toString(WORD_16_BIT), WORD_16_BIT))
        });
        return resultSet;
    }
}