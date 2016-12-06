'use strict';
/**
 * @file A base class for all event-emitters
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
  events: require('events'),
  util: require('util')
};
const primitives = {
  Object: require('./object')
};
const _ = require('lodash');


/**
 * A base class for all event-emitters
 *
 * This class inherits from the node.js EventEmitter class, and then
 * parasitically inherits from PrimitiveObject. Multiple inheritance isn't
 * pretty!
 *
 * @param {Object} properties Default properties for the object
 * @constructor
 */
function PrimitiveEventEmitter(properties) {
  PrimitiveEventEmitter.super_.call(this);

  /**
   * Backing field to store an object's state
   *
   * @type {Object}
   * @private
   */
  this._properties = properties || {};
}
node.util.inherits(PrimitiveEventEmitter, node.events.EventEmitter);
_.forOwn(primitives.Object.prototype, function (value, key) {
  PrimitiveEventEmitter.prototype[key] = value;
});


/**
 * Export the PrimitiveEventEmitter class
 * @type {PrimitiveEventEmitter}
 */
module.exports = PrimitiveEventEmitter;
