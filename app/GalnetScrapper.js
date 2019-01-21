const cheerio = require('cheerio');
const _ = require('lodash');
const rq = require('request');
const moment = require('moment');
const async = require('async-q');

const $year_diff = 1286; // years
const $domain = 'https://community.elitedangerous.com';
const $base_url = 'https://community.elitedangerous.com/en/galnet';
// ex :
// https://community.elitedangerous.com/en/galnet/17-JAN-3305

module.exports = class GalnetScrapper {

    /**
     * @param {String} YYYY-DD-MM date of today's era (2018, 2019 etc..)
     */
    dailyArticles(day) {
        let suffix = moment(day, 'YYYY-MM-DD')
            .add($year_diff, 'years')
            .format('DD-MMM-YYYY')
            .toUpperCase();
        let url = $base_url + '/' + suffix;
        return this._requestPage(url)
        .then(body => {
            let data = this._scrapPage(body, day)
            return {
                url,
                date: day,
                data
            };
        });
    }

    _requestPage(url) {
        return new Promise((resolve, reject) => {
            rq({
                method: 'GET',
                uri: url
            }, (err,res, body) => {
                if (err) return reject(err);
                return resolve(body);
            });
        });
    }

    _scrapPage(html) {
        let o = [];
        let $ = cheerio.load(html);
        let articles = $('.article');

        $(articles).each(i => {
            let article = articles[i];
            let link_item = $(article).find(`.galnetNewsArticleTitle`).find('a');
            let title = $(link_item).text();
            let link = $domain + $(link_item).attr('href');
            let content = $(article).find('p').text();
            content = content.trim().replace('\\', '/');
            let date_ed = $(article).find('.i_right').text();
            let href = $(article).find('.gal')
            o.push({
                title,
                link,
                content,
                date_ed
            });
        });
        return o;
    }
};
