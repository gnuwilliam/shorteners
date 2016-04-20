import {Base} from './base';

const API_URL = 'http://tinyurl.com/api-create.php';

export class Tinyurl extends Base {
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
            }
            throw new Error('Error on TinyUrl short() call, ' + err);
        }).on('error', (err) => {
            throw new Error('Error on TinyUrl short() call, ' + err);
        });
    }

    expand(url) {
        if (!url && !this.shortenUrl) {
            throw new Error('Please add a url or short a url first');
        }

        this.request(url, (err, resp) => {
            if (!err && resp.statusCode === 200) {
                return resp.body;
            } else {
                throw new Error('Error on expanding url , ' + err);
            }
        }).on('error', (err) => {
            throw new Error('Error on expanding url , ' + err);
        });
    }
}
