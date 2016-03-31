import {assert} from 'chai';
import {Base} from './apis/base';

describe('Base Class Tests', () => {
    it('check instance properties', () => {
        let b = new Base();
        assert(b instanceof Base);
        assert.equal(b.shortenUrl, '', 'Base shortenUrl property is an empty string by default');
        assert(b.request !== undefined, 'Base response property is not undefined');
    });
});
