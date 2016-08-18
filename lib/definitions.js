var capability = require("."),
    define = capability.define,
    test = capability.test;

define("arguments.callee.caller", function () {
    return (function () {
            return arguments.callee.caller;
        })() === arguments.callee;
});

define("es5", function () {
    return test("Array.prototype.forEach") &&
        test("Error.prototype.stack") &&
        test("Function.prototype.bind") &&
        test("Object.create") &&
        test("Object.defineProperties") &&
        test("Object.defineProperty") &&
        test("Object.prototype.hasOwnProperty");
});

define("Array.prototype.forEach", function () {
    return Array.prototype.forEach;
});

define("Error.prototype.stack", function () {
    try {
        throw new Error();
    }
    catch (e) {
        return e.stack;
    }
});

define("Function.prototype.bind", function () {
    return Function.prototype.bind;
});

define("Object.create", function () {
    return Object.create;
});

define("Object.defineProperties", function () {
    return Object.defineProperties;
});

define("Object.defineProperty", function () {
    return Object.defineProperty;
});

define("Object.prototype.hasOwnProperty", function () {
    return Object.prototype.hasOwnProperty;
});

define("Error.captureStackTrace", function () {
    return Error.captureStackTrace;
});