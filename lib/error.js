'use strict';
/**
 * @file A base class for all errors
 *
 * @author Anand Suresh <anandsuresh@gmail.com>
 * @copyright Copyright (C) 2017 Anand Suresh
 * @license Apache-2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const node = {
  util: require('util')
};
const primitives = {
  Object: require('./object')
};
const _ = require('lodash');


/**
 * A base class for all errors
 *
 * This class inherits from the JavaScript Error class, and then parasitically
 * inherits from PrimitiveObject. Multiple inheritance isn't pretty!
 *
 * @param {String} code A unique code identifying the error
 * @param {Object} [metadata] Metadata related to the error
 * @param {Error} [cause] The original error, if any, to be wrapped
 */
function PrimitiveError(code, metadata, cause) {
  if (code === undefined || code === null) {
    throw new TypeError('`code` is a required argument!');
  }

  PrimitiveError.super_.call(this, this.constructor.ERRORS[code]);

  if (metadata instanceof Error) {
    cause = metadata;
    metadata = undefined;
  }

  /**
   * Backing field to store an object's state
   *
   * @type {Object}
   * @private
   */
  this._properties = {
    code: code,
    metadata: metadata,
    cause: cause
  };
}
node.util.inherits(PrimitiveError, Error);
_.forOwn(primitives.Object.prototype, function (value, key) {
  PrimitiveError.prototype[key] = value;
});


/**
 * The name of the error
 *
 * @name PrimitiveError#name
 * @type {String}
 */
Object.defineProperty(PrimitiveError.prototype, 'name', {
  enumerable: true,
  get: function () {
    return 'InceptionError';
  }
});


/**
 * The error code for the error
 *
 * @name PrimitiveError#code
 * @type {String}
 */
Object.defineProperty(PrimitiveError.prototype, 'code', {
  enumerable: true,
  get: function () {
    return this._properties.code;
  }
});


/**
 * The metadata for the error
 *
 * @name PrimitiveError#metadata
 * @type {Object}
 */
Object.defineProperty(PrimitiveError.prototype, 'metadata', {
  enumerable: true,
  get: function () {
    return this._properties.metadata;
  }
});


/**
 * The cause of the error
 *
 * @name PrimitiveError#cause
 * @type {Error}
 */
Object.defineProperty(PrimitiveError.prototype, 'cause', {
  enumerable: true,
  get: function () {
    return this._properties.cause;
  }
});


/**
 * List of error codes and associated metadata
 *
 * Error codes, though defined as a static property are inherited by sub-classes
 * of the PrimitiveError class. See the source of the [subclass()]
 * {@PrimitiveError.subclass} method to understand how the inheritance is
 * implemented.
 *
 * @name PrimitiveError.ERRORS
 * @type {Object}
 */
PrimitiveError.ERRORS = {
  'Unexpected': 'An unexpected error occurred!',
  'BadArguments': 'Arguments provided are not valid!'
};


/**
 * Creates a sub-class of the PrimitiveError class with the specified errors and
 * a subclass() method like this one, to allow for further inheritance.
 *
 * @name PrimitiveError.subclass
 * @param {String} name The name of the sub-class
 * @param {Object} [errorMetadata] Additional error codes for the sub-class
 */
PrimitiveError.subclass = function (name, errorMetadata) {
  function Ctor() {
    Ctor.super_.apply(this, arguments);
  }
  node.util.inherits(Ctor, PrimitiveError);

  Object.defineProperty(Ctor.prototype, 'name', {
    writable: false,
    value: name
  });
  Ctor.subclass = Ctor.super_.subclass;
  Ctor.ERRORS = _.extend({}, Ctor.super_.ERRORS, errorMetadata);

  _.forIn(Ctor.ERRORS, function (message, code) {
    Object.defineProperty(Ctor.prototype, 'is' + code, {
      get: function () {
        return (this.code === code);
      }
    });

    Ctor[code] = function (metadata, cause) {
      return new Ctor(code, metadata, cause);
    };
  });

  return Ctor;
};


/**
 * Export the PrimitiveError class
 * @type {PrimitiveError}
 */
module.exports = PrimitiveError;
