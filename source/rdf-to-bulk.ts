
import dir = require('node-dir');
import {parseRDF} from "./parse-rdf";


const dirname = process.argv[2] || '../data/';

const options = {
    match: /\.rdf$/,       // Match file names that in '.rdf'.
    exclude: ['pg0.rdf'],  // Ignore the template RDF file (ID = 0).
};

dir.readFiles(dirname, options, (error:any, content: string | Buffer, next: ()=> void) => {

    if (error) throw error;

    const doc = parseRDF(content);
    console.log(JSON.stringify({ index: { _id: `pg${doc.id}` } }));
    console.log(JSON.stringify(doc));
    next();
});

process.stdout.on('error', err => process.exit());