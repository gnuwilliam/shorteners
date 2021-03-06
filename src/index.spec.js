import {assert} from 'chai';
import {Base} from './apis/base';
import {AdFly} from './apis/adfly';
import {Tinyurl} from './apis/tinyurl';
import {Bitly} from './apis/bitly';
import {Googl} from './apis/googl';
import Shortener from './index';

describe('Base Class Tests', () => {
    it('check instance properties', () => {
        let b = new Base();
        assert(b instanceof Base);
        assert.equal(b.shortenUrl, '', 'Base shortenUrl property is an empty string by default');
        assert(b.request !== undefined, 'Base response property is not undefined');
    });
});

describe('Shortener Class Tests', () => {
    it('check instance properties', () => {
        let s = new Shortener();
        assert(s instanceof Shortener);
        assert.equal(s.shortenUrl, '', 'shortenUrl property is an empty string by default');
    });

    it('isValidUrl tests', () => {
        assert.isOk(Shortener.isValidUrl('http://www.facebook.com'),
                    'http://www.facebook.com is a valid url');
        assert.isNotOk(Shortener.isValidUrl(''),
                       'Empty string is not a valid url');
    });

    it('no engine param tests', () => {
        let s = new Shortener();
        assert(s instanceof Shortener);
        assert(s.engine instanceof Base, 'Shortener Engine is instance of Base');
        let fn = () => {
            s.short('http://www.google.com');
        };
        assert.throws(fn, Error, 'Not Implemented');
    });

    it('wrong engine param tests', () => {
        let fn = () => {
            let s = new Shortener('wrong');
            s.short('http://www.google.com');
        };
        assert.throws(fn, Error);
    });
});

describe('Tinyurl tests', () => {
    it('instantiation test', () => {
        let s = new Shortener('tinyurl');
        assert(s instanceof Shortener);
        assert(s.engine instanceof Tinyurl, 'Shortener Engine is instance of TinyUrl');
    });
});

describe('Bit.ly tests', () => {
    it('instantiation test', () => {
        let s = new Shortener('bitly', {token: '123456'});
        assert(s instanceof Shortener);
        assert(s.engine instanceof Bitly, 'Shortener Engine is instance of Bitly');
    });

    it('wrong instantiation raises error', () => {
        let fn = () => {
           let s = new Shortener('bitly');
           s.short('test');
        };
        assert.throws(fn, Error);
    });
});

describe('Goo.gl tests', () => {
    it('instantiation test', () => {
        let s = new Shortener('googl', {apiKey: '123456'});
        assert(s instanceof Shortener);
        assert(s.engine instanceof Googl, 'Shortener Engine is instance of Googl');
    });

    it('wrong instantiation raises error', () => {
        let fn = () => {
           let s = new Shortener('googl');
           s.short('test');
        };
        assert.throws(fn, Error);
    });
});

describe('AdFly tests', () => {
    it('instantiation test', () => {
        let s = new Shortener('adfly', {key: '123456', uid: '123456'});
        assert(s instanceof Shortener);
        assert(s.engine instanceof AdFly, 'Shortener Engine is instance of AdFly');
    });

    it('wrong instantiation raises error', () => {
        let fn = () => {
           let s = new Shortener('adfly');
           s.short('test');
        };
        assert.throws(fn, Error);
    });
});
