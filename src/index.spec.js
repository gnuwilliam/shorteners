import {assert} from 'chai';
import {Base} from './apis/base';
import {Tinyurl} from './apis/tinyurl';
import {Bitly} from './apis/bitly';
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

    it('tinyurl tests', () => {
        let s = new Shortener('tinyurl');
        assert(s instanceof Shortener);
        assert(s.engine instanceof Tinyurl, 'Shortener Engine is instance of TinyUrl');
    });

    it('bitly tests', () => {
        let s = new Shortener('bitly', {token: '123456'});
        assert(s instanceof Shortener);
        assert(s.engine instanceof Bitly, 'Shortener Engine is instance of Bitly');
    });
});
