import {Base} from './base';

const API_URL = 'http://api.adf.ly/api.php';

export class AdFly extends Base {
    constructor (opts) {
        super(opts);
        if (!this.opts.uid) {
            throw new Error('AdFly uid missing');
        }
        if (!this.opts.key) {
            throw new Error('AdFly key missing');
        }
        this.key = this.opts.key;
        this.uid = this.opts.uid;
        this.type = this.opts.type || 'int';
    }

    short (url, cb) {
        let apiShortUrl = API_URL,
            params = {
                domain: 'adf.ly',
                advert_type: this.type,
                key: this.key,
                uid: this.uid,
                url: url
            },
            that = this;

        this.request({url: apiShortUrl, qs: params}, (err, res) => {
            console.log(res.body);
            if (!err && res.statusCode === 200) {
                that.shortenUrl = res.body;
                if (cb && typeof cb === 'function') {
                    cb();
                } else {
                    return that.shortenUrl;
                }
            } else {
                throw `Error on AdFly short() call, ${err}`;
            }
        }).on('error', (err) => {
            throw `Error on AdFly short() call, ${err}`;
        });
    }

    expand (url) {
        if (!url && !this.shortenUrl) {
            throw new Error('Please add a url or short a url first');
        }

        this.request(url, (err, resp) => {
            if (!err && resp.statusCode === 200) {
                return resp.body;
            } else {
                throw new Error(`Error on expanding url, ${err}`);
            }
        }).on('error', (err) => {
            throw new Error(`Error on expanding url, ${err}`);
        });
    }
}
