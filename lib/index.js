var path = require("path");
var CapabilityDetector = require("./CapabilityDetector");

var detector = new CapabilityDetector();

var capability = function (name) {
    return detector.test(name);
};
capability.define = function (name, test) {
    detector.define(name, test);
};
capability.checkFile = function (filePath) {
    var name = path.basename(filePath, ".js");
    detector.check(name);
};
capability.check = function (name) {
    detector.check(name);
};
capability.test = capability;

module.exports = capability;