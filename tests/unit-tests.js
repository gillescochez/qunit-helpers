module("qh");
test("basic", function() {
    ok(window.qh, 'qh exists');
    equal(typeof window.qh, 'object', 'qh is object');

    ok(window.qh.msg, 'qh.msg exists');
    equal(typeof window.qh.msg, 'object', 'qh.msg is object');

    'exists,isFunction,isNumber,isObject,isString,isStatic,isNotInherited,argumentsCount'
        .split(',')
        .forEach(function(prop) {
            ok(window.qh.msg[prop], 'qh.msg.' + prop + ' exists');
            equal(typeof window.qh.msg[prop], 'string', 'qh.msg.' + prop + ' is string');
        });
});

test("helpers", function() {
    function a() {}
    a.b = function b(){};

    equal(qh.getName("b", a), "a.b", 'getName');
    deepEqual(qh.getItem("b", a), a.b, 'getItem');
});