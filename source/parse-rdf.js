(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "cheerio"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var cheerio = require("cheerio");
    function parseRDF(rdf) {
        var $ = cheerio.load(rdf);
        var id = +$('pgterms\\:ebook').attr('rdf:about').replace('ebooks/', '');
        var title = $('dcterms\\:title').text();
        var authors = $('pgterms\\:agent pgterms\\:name')
            .toArray().map(function (elem) { return $(elem).text(); });
        var subjects = $('[rdf\\:resource$="/LCSH"]')
            .parent().find('rdf\\:value')
            .toArray().map(function (elem) { return $(elem).text(); });
        return { id: id, title: title, authors: authors, subjects: subjects };
    }
    exports.parseRDF = parseRDF;
});
//# sourceMappingURL=parse-rdf.js.map