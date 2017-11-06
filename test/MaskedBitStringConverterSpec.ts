import { MaskedBitStringConverter } from "../scripts/converter/MaskedBitStringConverter"
import expect = require("expect.js");
import {IMock, Mock, Times, It} from "typemoq";
import { BitArrayConverter } from "../scripts/converter/BitArrayConverter";

describe("Given a MaskedBitStringConverter and a source of numbers", () => {
    let subject: MaskedBitStringConverter,
        source: Array<number>,
        bitArrayConverter: IMock<BitArrayConverter>;

    beforeEach(() => {
        bitArrayConverter = Mock.ofType<BitArrayConverter>();        
        source = [161];
        
        subject = new MaskedBitStringConverter(bitArrayConverter.object);
    });

    context("when the instructions says you're dealing with an Intel endianess and I want only a portion", () => {
        beforeEach(() => {
            bitArrayConverter.setup(b => b.convert(It.isValue(source), true)).returns(() => ["1","0","0","0","0", "1", "0", "1"])
        });

        it("it should convert each number into an unsigned byte", () => {
            expect(subject.convert(source, true, 2, 4)).to.be.eql("0001");
        })
    })

    context("when the instructions says you're dealing with a Motorola endianess and I want only a portion ", () => {
        beforeEach(() => {
            bitArrayConverter.setup(b => b.convert(It.isValue(source), false)).returns(() => ["1","0","1","0","0", "0", "0", "1"])            
        });

        it("it should convert each number into an unsigned byte", () => {
            expect(subject.convert(source, false, 2, 4)).to.be.eql("0001");            
        })
    })
})