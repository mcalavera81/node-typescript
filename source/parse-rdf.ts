import cheerio = require('cheerio');

interface Book {
    id: number​
    title:string
    authors: string[]
    subjects: string[]
}


function parseRDF(rdf:string|Buffer):Book{
    const $  = cheerio.load(rdf);

    const id = +$('pgterms\\:ebook').attr('rdf:about').replace('ebooks/','');
    const title = $('dcterms\\:title').text();
    const authors = $('pgterms\\:agent pgterms\\:name')
        .toArray().map(elem =>  $(elem).text());
    const subjects = $('[rdf\\:resource$="/LCSH"]')
        .parent().find('rdf\\:value')
        .toArray().map(elem =>  $(elem).text());
    return {id, title, authors, subjects}
}

export {parseRDF, Book}