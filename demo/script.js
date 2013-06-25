module("Types");
test("basic objects", function() {
    var number = 1,
        string = "foo",
        array = ["foo"],
        object = {},
        fn = function(){};

    qh.typeNumber(number);
    qh.typeString(string);
    qh.typeArray(array);
    qh.typeObject(object);
    qh.typeFunction(fn);
});