import request from 'request';

export class Base {
    constructor(opts) {
        this.request = request;
        this.shortenUrl = '';
        this.opts = opts || {};
    }

    short() {
        throw 'Not Implemented';
    }

    expand(url, cb) {
        this.request(url, (err, res, body) => {
            if (!err && res.statusCode === 200) {
                console.log('Request ok', body);
                if (cb && typeof cb === 'function') {
                    cb(res);
                } else {
                    return res.body;
                }
            }
        }).on('error', (err) => {
            throw 'Error on expanding, ' + err;
        });
    }
}
