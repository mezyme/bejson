const {should, expect, assert} = require('chai');
const b = require('../src/bejson');

describe('#isJsonStrings function', function () {
    it('is must be json strings', function () {
        expect(b.isJsonStrings('{"a":"a"}')).to.equal(true);
        expect(b.isJsonStrings('{"a":123}')).to.equal(true);
    });
    
    it('is can\'t be Null', function () {
        expect(b.isJsonStrings(null)).to.equal(false);
    });
    
    it('is can\'t be Undefined', function () {
        expect(b.isJsonStrings(undefined)).to.equal(false);
    });
    
    it('is can\'t be Number', function () {
        expect(b.isJsonStrings(123)).to.equal(false);
    });
    
    it('is can\'t be Object', function () {
        expect(b.isJsonStrings({})).to.equal(false);
        expect(b.isJsonStrings({a:123})).to.equal(false);
        expect(b.isJsonStrings({'a':123})).to.equal(false);
        expect(b.isJsonStrings({'a':'a'})).to.equal(false);
        expect(b.isJsonStrings({"a":{"a1":"aa"}})).to.equal(false);
    });
    
    it('is can\'t be Array', function () {
        expect(b.isJsonStrings(["a","b"])).to.equal(false);
        expect(b.isJsonStrings(["a",1])).to.equal(false);
        expect(b.isJsonStrings(["a",["b",1]])).to.equal(false);
        expect(b.isJsonStrings([{},"1"])).to.equal(false);
    });
    
    it('is can\'t be illegal json strings', function () {
        expect(b.isJsonStrings('')).to.equal(false);
        expect(b.isJsonStrings('123')).to.equal(false);
        expect(b.isJsonStrings('{')).to.equal(false);
        expect(b.isJsonStrings('{""}')).to.equal(false);
        expect(b.isJsonStrings('{"a""a"}')).to.equal(false);
        expect(b.isJsonStrings('{"a:"a"}')).to.equal(false);
        expect(b.isJsonStrings('{\'a\':\'a\'}')).to.equal(false);
        expect(b.isJsonStrings('{"a":"a",}')).to.equal(false);
        expect(b.isJsonStrings('{"a":"a", "b":["b1":"b111"]}')).to.equal(false);
        // expect(b.isJsonStrings('{"a":"a"}'), false);
    });
});

describe('#bejson function', function () {
    it('is be formatted json strings', function () {
        // expect(b.bejson({"a":"a","b":"b"})).to.equal('\r\n{\r\n    "a": "a",\r\n    "b": "b"\r\n}\r\n\r\n');
        expect(b.bejson('{"a":"a","b":"b"}')).to.equal('\r\n{\r\n    "a": "a",\r\n    "b": "b"\r\n}\r\n\r\n');
        expect(b.bejson('{"a":"a","b":"b","c":["c1","c2"]}')).to.equal('\r\n{\r\n    "a": "a",\r\n    "b": "b",\r\n    "c": [\r\n        "c1",\r\n        "c2"\r\n    ]\r\n}\r\n\r\n');
        expect(b.bejson('{"a":"a","b":"b","c":{"c1":111,"c2":222}}')).to.equal('\r\n{\r\n    "a": "a",\r\n    "b": "b",\r\n    "c": {\r\n        "c1": 111,\r\n        "c2": 222\r\n    }\r\n}\r\n\r\n');
    })
});
