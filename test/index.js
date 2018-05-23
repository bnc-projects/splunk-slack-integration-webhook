'use strict';

const test_input = require('./splunk-export').json_event;

const expect = require('chai').expect;
const nock = require('nock');

const system_under_test = require('../index').handler;

// Initialize some globals for testing.
process.env.SLACK_PATH = "/test/path";
process.env.SLACK_CHANNEL = "test-channel";

describe('First test', () => {
    it('Should assert true to be true', () => {
        expect(true).to.be.true;
    });
});


describe('Test the lambda handler', () => {
    beforeEach(() => {
        nock('https://hooks.slack.com').post('/test/path').reply(200, '{"status": "OK"}');
    });

    it('process a splunk webhook', () => {
        const callback = (error, response) => {

            expect(typeof response).to.equal('string');
            expect(JSON.parse(response).status).to.equal('OK');
        };
        return system_under_test(test_input, {fail: callback}, callback);
    });
});
