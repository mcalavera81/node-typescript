(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "fs", "chai", "../source/parse-rdf"], factory);
    }
})(function (require, exports) {
    'use strict';
    Object.defineProperty(exports, "__esModule", { value: true });
    var fs = require("fs");
    var chai_1 = require("chai");
    var parse_rdf_1 = require("../source/parse-rdf");
    var rdf = fs.readFileSync(__dirname + "/pg132.rdf");
    describe('parseRDF', function () {
        it('should be a function', function () {
            chai_1.expect(parse_rdf_1.parseRDF).to.be.a('function');
        });
        it('should parse RDF content', function () {
            var book = parse_rdf_1.parseRDF(rdf);
            chai_1.expect(book).to.be.an('object');
            chai_1.expect(book).to.have.property('id', 132);
            chai_1.expect(book).to.have.property('title', 'The Art of War');
            chai_1.expect(book).to.have.property('authors')
                .that.is.an('array').with.lengthOf(2)
                .and.contains('Sunzi, active 6th century B.C.')
                .and.contains('Giles, Lionel');
            chai_1.expect(book).to.have.property('subjects')
                .that.is.an('array').with.lengthOf(2)
                .and.contains('Military art and science -- Early works to 1800')
                .and.contains('War -- Early works to 1800');
        });
    });
});
//# sourceMappingURL=parse-rdf-test.js.map