import { NumberConverter } from "../scripts/converter/NumberConverter"
import expect = require("expect.js");

describe("Given a NumberConverter and a source of numbers", () => {
    let subject: NumberConverter,
        source: string;

    beforeEach(() => {
        subject = new NumberConverter();
        source = "1000";
    });

    context("when the instructions says you're dealing with a signed, and offset 2, resolution 0.5", () => {

        it("it should convert the string into a signed number", () => {
            expect(subject.convert(source, true, 0.5, 2)).to.be.eql(-2)
        })
    })

    context("when the instructions says you're dealing with an usigned, and offset 2, resolution 0.5", () => {

        it("it should convert each number into an unsigned number", () => {
            expect(subject.convert(source, false, 0.5, 2)).to.be.eql(6)
        })
    })
})