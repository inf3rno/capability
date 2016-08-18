var expect = require("expect.js"),
    sinon = require("sinon"),
    CapabilityDetector = require("../../lib/CapabilityDetector");

module.exports = function () {
    var detector = new CapabilityDetector();
    var isError;
    var hasSupported = false,
        hasUnsupported = false;

    this.When(/^I try to define a capability with a name and a test$/, function (next) {
        isError = false;
        try {
            detector.define("a", function () {
                return true;
            });
        } catch (e) {
            isError = true;
        }
        next();
    });

    this.Then(/^a new capability should be defined$/, function (next) {
        expect(isError).to.be(false);
        next();
    });

    this.When(/^I try to define a capability without enough parameters$/, function (next) {
        var failureCount = 0;
        ([
            function () {
                detector.define("b", null);
            },
            function () {
                detector.define(null, function () {
                    return true;
                });
            }
        ]).forEach(function (defineCapability) {
            try {
                defineCapability();
            } catch (e) {
                ++failureCount;
            }
        });
        isError = (failureCount == 2);
        next();
    });

    this.When(/^I try to define a capability with the same name I already used$/, function (next) {
        isError = false;
        try {
            detector.define("duplicated", function () {
                return true;
            });
            detector.define("duplicated", function () {
                return true;
            });
        }
        catch (e) {
            isError = true;
        }
        next();
    });

    this.When(/^I try to test a capability I did not define previously$/, function (next) {
        isError = false;
        try {
            detector.test("undefined");
        }
        catch (e) {
            isError = true;
        }
        next();
    });

    this.When(/^I try to check a capability I did not define previously$/, function (next) {
        isError = false;
        try {
            detector.check("undefined");
        }
        catch (e) {
            isError = true;
        }
        next();
    });

    this.Then(/^I should get an error$/, function (next) {
        expect(isError).to.be(true);
        next();
    });

    this.When(/^I have a supported capability defined$/, function (next) {
        if (!hasSupported) {
            detector.define("supported", function () {
                return true;
            });
            hasSupported = true;
        }
        next();
    });

    this.Then(/^I should get true by testing this capability$/, function (next) {
        expect(detector.test("supported")).to.be(true);
        next();
    });

    this.When(/^I have an unsupported capability defined$/, function (next) {
        if (!hasUnsupported) {
            detector.define("unsupported", function () {
                return false;
            });
            hasUnsupported = true;
        }
        next();
    });

    this.Then(/^I should get false by testing this capability$/, function (next) {
        expect(detector.test("unsupported")).to.be(false);
        next();
    });

    this.Then(/^I should not get error by checking this capability$/, function (next) {
        expect(function () {
            detector.check("supported");
        }).to.not.throwException();
        next();
    });

    this.Then(/^I should get error by checking this capability$/, function (next) {
        expect(function () {
            detector.check("unsupported");
        }).to.throwException();
        next();
    });

};