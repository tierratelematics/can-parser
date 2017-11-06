import { BitArrayConverter } from "../scripts/converter/BitArrayConverter"
import expect = require("expect.js");

describe("Given a BitArrayConverter and a source of numbers", () => {
    let subject: BitArrayConverter,
        source: Array<number>;

    beforeEach(() => {
        subject = new BitArrayConverter();
        source = [161];
    });

    context("when the instructions says you're dealing with an Intel endianess,", () => {

        it("it should convert each number into an unsigned byte", () => {
            expect(subject.convert(source, true)).to.be.eql(["1","0","0","0","0", "1", "0", "1"])
        })
    })

    context("when the instructions says you're dealing with a Motorola endianess,", () => {
        
        it("it should convert each number into an unsigned byte", () => {
            expect(subject.convert(source, false)).to.be.eql(["1","0","1","0","0", "0", "0", "1"])
        })
    })
})