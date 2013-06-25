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
 * Return the name of the method as a string using the parent object name if any.
 * @param property
 * @param [object]
 * @returns {*}
 */
qh.getNameAsString = function(property, object) {
    return object ? ((object.name + '.' || "") + property) : property;
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
 * Check that the tested item is of type "function"
 * @param property
 * @param [object]
 */
qh.typeFunction = function(property, object) {
    equal(typeof this.getItem(property, object), 'function', this.getNameAsString(property, object) + qh.msg.isFunction);
};

/**
 * Check that the tested item is of type "number"
 * @param property
 * @param [object]
 */
qh.typeNumber = function(property, object) {
    equal(typeof this.getItem(property, object), 'number', this.getNameAsString(property, object) + qh.msg.isNumber);
};

/**
 * Check that the tested item is of type "string"
 * @param property
 * @param [object]
 */
qh.typeString = function(property, object) {
    equal(typeof this.getItem(property, object), 'string', this.getNameAsString(property, object) + qh.msg.isString);
};

/**
 * Check that the tested item is of type "object"
 * @param property
 * @param [object]
 */
qh.typeObject = function(property, object) {
    equal(typeof this.getItem(property, object), 'object', this.getNameAsString(property, object) + qh.msg.isObject);
};

/**
 * Check that the tested item is of type "object" and its constructor is Array
 * @param property
 * @param [object]
 */
qh.typeArray = function(property, object) {
    deepEqual(this.getItem(property, object).constructor, Array, this.getNameAsString(property, object) + qh.msg.isObject);
};

/**
 * Check a method exist, is a function and has the expected number of arguments
 * @param method
 * @param [object]
 * @param [len]
 */
qh.method = function(method, object, len) {
    var name = this.getNameAsString(method, object);
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
    var instance = new object();
    equal(instance[method], undefined, this.getNameAsString(method, object) + qh.msg.isNotInherited);
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