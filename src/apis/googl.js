import {Base} from './base';

const API_URL = 'https://www.googleapis.com/urlshortener/v1/url';

export class Googl extends Base {
    constructor(opts) {
        super(opts);
        if (!this.opts.apiKey) {
            throw new Error('Goo.gl API key missing');
        }
        this.apiKey = this.opts.apiKey;
    }

    short(url, cb) {
        let that = this,
            options = {
                'method': 'POST',
                'Content-Type': 'application/json',
                'uri': API_URL + '?=key' + this.apiKey,
                'body': JSON.stringify({longUrl: url})
            };

        this.request(options, (err, res) => {
            if (!err && res.statusCode === 200) {
                let response = JSON.parse(res.body);
                if (response.status === 'OK') {
                    that.shortenUrl = response.longUrl;
                    if (cb && typeof cb === 'function') {
                        cb();
                    } else {
                        return that.shortenUrl;
                    }
                }
            }
            throw new Error('Error on Goo.gl short() call, ' + err);
        }).on('error', (err) => {
            throw new Error('Error on Goo.gl short() call, ' + err);
        });
    }

    expand(url) {
        if (!url && !this.shortenUrl) {
            throw new Error('Please add a url or short a url first');
        }
        let urlRequest = API_URL + '?shortUrl=' + url || this.shortenUrl;
        this.request(urlRequest, (err, resp) => {
            if (!err && resp.statusCode === 200) {
                let response = JSON.parse(resp.body);
                if (response.status === 'OK') {
                    return response.longUrl;
                }
            }
            throw new Error('Error on expanding url , ' + err);
        }).on('error', (err) => {
            throw new Error('Error on expanding url , ' + err);
        });
    }
}
