var expect = require("expect.js"),
    sinon = require("sinon"),
    capability = require("../..");

module.exports = function () {

    var x;

    this.When(/^a$/, function (next) {
        x = "a";
        next();
    });

    this.Then(/^b$/, function (next) {
        expect(x).to.be("a");
        next();
    });
};