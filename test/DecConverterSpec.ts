import { DecConverter } from "../scripts/converter/DecConverter"
import expect = require("expect.js");

describe("Given a DevConverter", () => {
    let subject: DecConverter,
        buffer: Buffer;

    beforeEach(() => {
        subject = new DecConverter();
    });

    context("And a Buffer", () => {
        beforeEach(() => {
            buffer = Buffer.from([0xa1, 0xb2, 0xc3, 0xd4, 0xe5, 0xf6, 0x78, 0x9a]);
        });

        it("Should convert each buffer value into a decimal one", () => {
            expect(subject.from(buffer)).to.be.eql([161, 178, 195, 212, 229, 246, 120, 154])
        })
    })
})