'use strict';
/**
 * @file Base classes for all streams
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
  stream: require('stream'),
  util: require('util')
};
const primitives = {
  Object: require('./object')
};
const _ = require('lodash');


const STREAMS = ['Readable', 'Writable', 'Transform', 'PassThrough', 'Duplex'];


module.exports = _.zipObject(STREAMS, _.map(STREAMS, function (base) {
  function PrimitiveStream(properties) {
    PrimitiveStream.super_.call(this, properties);

    /**
     * Backing field to store an object's state
     *
     * @type {Object}
     * @private
     */
    this._properties = properties || {};
  }
  node.util.inherits(PrimitiveStream, node.stream[base]);
  _.forOwn(primitives.Object.prototype, function (value, key) {
    PrimitiveStream.prototype[key] = value;
  });

  return PrimitiveStream;
}));
