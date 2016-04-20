import {Base} from './base';
import querystring from 'querystring';

const API_URL = 'https://api-ssl.bit.ly/';

export class Bitly extends Base {
    constructor(opts) {
        super(opts);
        if (!this.opts.token) {
            throw new Error('Bit.ly token missing');
        }
        this.token = this.opts.token;
    }

    short(url, cb) {
        let apiShortUrl = API_URL + 'v3/shorten',
            params = querystring({
                uri: url,
                access_token: this.token,
                format: 'txt'
            }),
            that = this;

        this.request(apiShortUrl + params, (err, res) => {
            if (!err && res.statusCode === 200) {
                that.shortenUrl = res.body;
                if (cb && typeof cb === 'function') {
                    cb();
                } else {
                    return that.shortenUrl;
                }
            } else {
                throw 'Error on Bitly short() call, ' + err;
            }
        }).on('error', (err) => {
            throw 'Error on Bitly short() call, ' + err;
        });
    }

    expand(url, cb) {
        if (!url && !this.shortenUrl) {
            throw 'You need to pass a url or have a shorten url';
        }
        let _url = url || this.shortenUrl;

        let apiExpandUrl = API_URL + 'v3/expand',
            params = querystring({
                shortUrl: _url,
                access_token: this.token,
                format: 'txt'
            }),
            that = this;

        this.request(apiExpandUrl + params, (err, res) => {
            if (!err && res.statusCode === 200) {
                that.shortenUrl = res.body;
                if (cb && typeof cb === 'function') {
                    cb();
                } else {
                    return that.shortenUrl;
                }
            } else {
                throw 'Error on Bitly short() call, ' + err;
            }
        }).on('error', (err) => {
            throw 'Error on Bitly short() call, ' + err;
        });
    }
}
