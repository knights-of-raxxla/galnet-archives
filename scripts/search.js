const moment = require('moment');
const knex = require('../app/knex.js');
const async = require('async-q');
const _ = require('lodash');
const os = require('os');

let args = process.argv;
let term = args.slice(2).join(' ');

function qContent(term) {
    return knex('articles')
        .where('content', 'like', `%${term}%`);
}

function qTitle(term) {
    return knex('articles')
        .where('title', 'like', `%${term}%`);
}

Promise.all([qContent(term), qTitle(term)])
    .then(data => {
        let rows = _.chain(data)
            .flatten()
            .uniqBy('link')
            .orderBy(r => {
                return moment(r.date, moment.ISO_8601).format('YYYY-MM-DD');
            }, 'desc')
            .value();
        let str = `${os.EOL}${rows.length} results for "${term}":`;
        rows.forEach(row => {
            let c = [
                os.EOL,
                '==========================================',
                os.EOL,
                row.title.trim(),
                os.EOL,
                row.date,
                os.EOL,
                'link: ',
                row.link
            ].join('');
            str += c;
        });
        str+= os.EOL;
        console.log(str);
        process.exit(0);
    })





