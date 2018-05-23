'use strict';

const assert = require('chai').assert;

const splunk_json = require('./splunk-export').json_event;

describe('array', function () {
    it('should start empty', function () {
        assert.equal([].length, 0);
    });
});

describe('Json Payload', function () {
    it('should not be empty', function () {
        assert.notEqual(splunk_json.length, 0);
    });
});

