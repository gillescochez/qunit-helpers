test("Types", function() {

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

test("Variables / Properties", function() {
    var fnClass = function() {},
       fnConstructor = function() {
           this.foo = 'foo';
       };

    fnClass.foo = 'foo';

    expect(0);
});

test("Functions / Methods", function() {

    var obj = function obj() {};
    obj.fnNoArgument = function(){};
    obj.fnWithOneArgument = function(arg1) {};
    obj.fnWithTwoArguments = function(arg1, arg2) {};
    obj.fnClass = function() {};

    window.fnGlobal = function(){};

    obj.fnClass.fnStatic = function(){};
    obj.fnClass.prototype.fnInherited = function(){};

    qh.method("fnNoArgument", obj, 0);
    qh.method("fnWithOneArgument", obj, 1);
    qh.method("fnWithTwoArguments", obj, 2);

    qh.globalMethod("fnGlobal", 0);

    qh.staticMethod("fnClass", obj, 0);
    var inst = new obj.fnClass();

});

test("API", function() {

    function mock(){
        this.foo = 'foo';
    }

    mock.prototype.alert = function(msg){};
    mock.boo = function(){};

    var myMock = new mock();

    var apiCfg = {
        alert: {
            method: true,
            parent: myMock,
            args: 1
        },
        boo: {
            method: true,
            static: true,
            parent: mock
        },
        foo: {
            property: true,
            parent: myMock,
            type: 'string',
            value: 'foo'
        }
    };

    qh.api(apiCfg);

});