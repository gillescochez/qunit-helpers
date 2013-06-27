/**
 * Namespace for the qunit-helpers
 * @namespace
 * @type {{}}
 */
qh = {};

/**
 * Object to store message strings
 * @namespace
 * @type {{}}
 */
qh.msg = {
    exists: ' exists',
    isFunction: ' is a function',
    isNumber: ' is a number',
    isObject: ' is an object',
    isString: ' is a string',
    isStatic: ' is static',
    isNotInherited: ' is not inherited',
    argumentsCount: ' arguments: '
};

/**
 * Take an object representation of the API and run tests accordingly
 * @param cfg {Object} API configuration object
 */
qh.api = function(cfg) {

    var args, prop, it;

    for (prop in cfg) {

        args = [];
        it = cfg[prop];
        args.push(prop);

        if (it.parent) args.push(it.parent);

        if (it.method) {

            if (it.args) args.push(it.args);

            if (it.static) this.staticMethod.apply(this, args);
            else if (it.global) this.globalMethod.apply(this, args);
            else this.method.apply(this, args);
        }

        if (it.property) {



            this.property.apply(this, args);
        }
    }
};

/**
 * Return the name of the method as a string using the parent object name if any.
 * @param property
 * @param [object]
 * @returns {*}
 */
qh.getName = function(property, object) {

    var name = '';

    if (object && object.name) name += object.name + '.';
    name += property;

    return name;
};

/**
 * Return the item to be tested
 * @param property
 * @param [object]
 * @returns {*}
 */
qh.getItem = function(property, object) {
    return object ? object[property] : property;
};

/**
 * "string" to "String" helper
 * @param str {String}
 * @returns {string}
 */
qh.firstUp = function(str) {
    return str[0].toUpperCase() + str.substring(1, str.length-1);
};

/**
 * Check that the tested item is of type "function"
 * @param property
 * @param [object]
 */
qh.typeFunction = function(property, object) {
    equal(typeof this.getItem(property, object), 'function', this.getName(property, object) + qh.msg.isFunction);
};

/**
 * Check that the tested item is of type "number"
 * @param property
 * @param [object]
 */
qh.typeNumber = function(property, object) {
    equal(typeof this.getItem(property, object), 'number', this.getName(property, object) + qh.msg.isNumber);
};

/**
 * Check that the tested item is of type "string"
 * @param property
 * @param [object]
 */
qh.typeString = function(property, object) {
    equal(typeof this.getItem(property, object), 'string', this.getName(property, object) + qh.msg.isString);
};

/**
 * Check that the tested item is of type "object"
 * @param property
 * @param [object]
 */
qh.typeObject = function(property, object) {
    equal(typeof this.getItem(property, object), 'object', this.getName(property, object) + qh.msg.isObject);
};

/**
 * Check that the tested item is of type "object" and its constructor is Array
 * @param property
 * @param [object]
 */
qh.typeArray = function(property, object) {
    deepEqual(this.getItem(property, object).constructor, Array, this.getName(property, object) + qh.msg.isObject);
};

/**
 * Check a method exist, is a function and has the expected number of arguments
 * @param method
 * @param [object]
 * @param [len]
 */
qh.method = function(method, object, len) {

    var name = this.getName(method, object);
    var item = this.getItem(method, object);
    len = len || 0;

    ok(item, name + qh.msg.exists);
    this.typeFunction(method, object);
    this.argsLength(item, name, len);
};

/**
 * Same as method test but check that the method cannot be found on an instance of the object
 * @param method
 * @param object
 * @param [len]
 */
qh.staticMethod = function(method, object, len) {

    // TODO handle case where the constructor requires arguments
    var instance = new object();

    equal(instance[method], undefined, this.getName(method, object) + qh.msg.isNotInherited);
    this.method(method, object, len);
};

/**
 * Same as method (actually calls method) but on the window object
 * @param method
 * @param [len]
 */
qh.globalMethod = function(method, len) {
    this.method(method, window, len);
};

/**
 * Check the item as the expected amount of arguments
 * @param item
 * @param name
 * @param [len]
 */
qh.argsLength = function(item, name, len) {
    equal(item.length, len, name + qh.msg.argumentsCount + len);
};

qh.property = function(property, object, type, value) {

    var name = this.getName(property, object);
    var item = this.getItem(property, object);

    if (type) {

    }

};