const scrapper = new (require('../app/GalnetScrapper.js'))();
const fs = require('fs');
const moment = require('moment');
const knex = require('../app/knex.js');
const async = require('async-q');

let $f_year = 3301 - 1286;
let $first_ever_date = `${$f_year}-06-05`;
let last_irl_date;
const df_us = 'YYYY-MM-DD';

function generateDateArr(beg) {
    let o = [];
    let cont = true;
    let today = moment();
    let i = 0;
    let beg_m = moment(beg, df_us);
    while(cont === true) {
        curr_date = beg_m.clone().add(i, 'days');
        o.push(curr_date.clone().format(df_us));
        let diff = today.diff(curr_date, 'days');
        cont = diff > 0;
        i++;
    }
    return o;
}

return knex('articles')
    .orderBy('date', 'desc')
    .limit(1)
    .then(rows => {
        if (!rows || !rows.length)
            last_irl_date = $first_ever_date;
        else
            last_irl_date = rows[0].date;
        let dates = generateDateArr(last_irl_date);
        return async.eachLimit(dates, 10, date => {
            if (dates.indexOf(date) % 100 === 0) console.log(date);
            return scrapper.dailyArticles(date)
                .then(out => {
                    if (!out || !out.data || !out.date.length) return;
                    let ins = [];
                    out.data.forEach(o => {
                        o.date = date;
                        o.created_at = new Date();
                        o.date = date;
                        ins.push(o);
                    });
                    return knex('articles').insert(ins);
                });
        });
    }).then(() => {
        console.log('done');
        process.exit(0);
    });

