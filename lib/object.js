'use strict';
/**
 * @file A base class for all classes
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


/**
 * A base class for all classes
 *
 * @param {Object} properties Default properties for the object
 * @constructor
 */
function PrimitiveObject(properties) {
  /**
   * Backing field to store an object's state
   *
   * @type {Object}
   * @private
   */
  this._properties = properties || {};
}
node.util.inherits(PrimitiveObject, Object);


/**
 * Overrides the default toJSON() method of the Object class
 * @return {Object}
 */
PrimitiveObject.prototype.toJSON = function () {
  return this._properties;
};


/**
 * Export the class
 *
 * @type {PrimitiveObject}
 */
module.exports = PrimitiveObject;
