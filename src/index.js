import {TinyUrl} from './apis/tinyurl';
import {BitLy} from './apis/bitly';

const SHORTENERS_MAPPING = {
    'tinyurl': TinyUrl,
    'bitly': BitLy
};

/**
 * @class Shortener
 * @description Main Factory shortener class.
 * @example
 *
 * var Shortener = require('shorteners');
 * var s = Shortener('tinyurl');
 * s.short('http://www.facebook.com');
 * s.shortenUrl
 * 'http://tinyurl/123456'
 */
export default class Shortener {

    /**
     * @constructs Shortener
     * @param engine String for API shortener engine
     * @param opts API engine extra options. E.g: token, username, password
     */
    constructor (engine, opts) {
        if (!SHORTENERS_MAPPING[engine]) {
            throw engine + ' API not found.';
        }
        this.engine = new SHORTENERS_MAPPING[engine](opts);
        this.opts = opts || {};
    }

    /**
     * short
     *
     * @param url
     * @param cb
     *
     */
    short(url, cb) {
        if (!Shortener.isValidUrl(url)) {
            throw url + ' is not a valid URL. Try Again.';
        }
        return this.engine.short(url, cb);
    }

    /**
     * expand
     *
     * @param url
     * @param cb
     */
    expand(url, cb) {
        if (!url) {
            this.engine.expand(this.shortenUrl, cb);
        }
        if (!Shortener.isValidUrl(url)) {
            throw url + ' is not a valid URL. Try Again.';
        }
        return this.engine.expand(url, cb);
    }

    /**
     * shortenUrl
     *
     * @returns {String}
     */
    get shortenUrl() {
        return this.engine.shortenUrl;
    }

    /**
     * isValidUrl
     *
     * @param url
     * @returns {Boolean}
     */
    static isValidUrl(url) {
        if (!url) {
            return false;
        }
        return true;
    }
}
