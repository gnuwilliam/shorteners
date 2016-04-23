import {Base} from './apis/base';
import {AdFly} from './apis/adfly';
import {Tinyurl} from './apis/tinyurl';
import {Bitly} from './apis/bitly';
import {Googl} from './apis/googl';

/**
 * Shorteners Mapping const
 */
const SHORTENERS_MAPPING = {
    'adfly': AdFly,
    'tinyurl': Tinyurl,
    'bitly': Bitly,
    'googl': Googl
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
        if (!engine) {
            this.engine = new Base();
        } else {
            let keys = Object.keys(SHORTENERS_MAPPING);
            if (keys.indexOf(engine) === -1) {
                throw new Error(`${engine} API does not exist`);
            }

            try {
                this.engine = new SHORTENERS_MAPPING[engine](opts);
            } catch(e) {
                throw new Error(e);
            }
        }
        this.opts = opts || {};
    }

    /**
     * short
     *
     * @param {String} url
     * @param {Function} cb
     *
     */
    short (url, cb) {
        if (!Shortener.isValidUrl(url)) {
            throw new Error(`${url} is not a valid URL. Try Again.`);
        }
        return this.engine.short(url, cb);
    }

    /**
     * expand
     *
     * @param {String} url
     * @param {Function} cb
     */
    expand (url, cb) {
        if (!url) {
            this.engine.expand(this.shortenUrl, cb);
        }
        if (!Shortener.isValidUrl(url)) {
            throw new Error(`${url} is not a valid URL. Try Again.`);
        }
        return this.engine.expand(url, cb);
    }

    /**
     * shortenUrl
     *
     * @returns {String}
     */
    get shortenUrl () {
        return this.engine.shortenUrl;
    }

    /**
     * isValidUrl
     *
     * @param {String} url
     * @returns {Boolean}
     */
    static isValidUrl (url) {
        if (!url) {
            return false;
        }
        let re = /^(?:http|ftp)s?:\/\/(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\[?[A-F0-9]*:[A-F0-9:]+\]?)(?::\d+)?(?:\/?|[\/?]\S+)$/i;
        if (url.match(re)) {
            return true;
        }
        return false;
    }
}
