'use strict'

import fs = require("fs");
import {expect} from 'chai';
import {parseRDF} from "../source/parse-rdf";


const rdf = fs.readFileSync(`${__dirname}/pg132.rdf`);

describe('parseRDF', () => {
    it('should be a function', () => {
        expect(parseRDF).to.be.a('function');
    });

    it('should parse RDF content', () => {
        const book = parseRDF(rdf);

        expect(book).to.be.an('object');
        expect(book).to.have.property('id', 132);
        expect(book).to.have.property('title', 'The Art of War');

        expect(book).to.have.property('authors')
            .that.is.an('array').with.lengthOf(2)
            .and.contains('Sunzi, active 6th century B.C.')
            .and.contains('Giles, Lionel');

        expect(book).to.have.property('subjects')
            .that.is.an('array').with.lengthOf(2)
            .and.contains('Military art and science -- Early works to 1800')
            .and.contains('War -- Early works to 1800');
    });
});