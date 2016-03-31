import {Base} from './base';

const API_URL = 'http://tinyurl.com/api-create.php';

export class TinyUrl extends Base {
    short(url, cb) {
        let params = '?url=' + encodeURIComponent(url),
            that = this;
        this.request(API_URL + params, (err, res) => {
            if (!err && res.statusCode === 200) {
                that.shortenUrl = res.body;
                if (cb && typeof cb === 'function') {
                    cb();
                } else {
                    return that.shortenUrl;
                }
            } else {
                throw 'Error on TinyUrl short() call, ' + err;
            }
        }).on('error', (err) => {
            throw 'Error on TinyUrl short() call, ' + err;
        });
    }

    expand(url) {
        if (!url && !this.shortenUrl) {
            throw 'Please add a url or short a url first';
        }
        this.request(url, (err, resp) => {
            if (!err && resp.statusCode === 200) {
                return resp.body;
            } else {
                throw 'Error on expanding url , ' + err;
            }
        }).on('error', (err) => {
            throw 'Error on expanding url , ' + err;
        });
    }
}
