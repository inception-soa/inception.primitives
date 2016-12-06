'use strict';
/**
 * @file Unit tests for PrimitiveEventEmitter
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

const chai = require('chai');
const expect = chai.expect;
const PrimitiveEventEmitter = require('../lib/event_emitter');


describe('PrimitiveEventEmitter', function () {
  describe('new', function () {
    it('should be callable', function () {
      expect(PrimitiveEventEmitter).to.be.a('function');
    });

    it('should be instantiable without arguments', function () {
      expect(() => new PrimitiveEventEmitter()).to.not.throw;
      expect(() => new PrimitiveEventEmitter(null)).to.not.throw;
    });

    it('should be instantiable with arguments', function () {
      expect(() => new PrimitiveEventEmitter({})).to.not.throw;
      expect(() => new PrimitiveEventEmitter({ key: 'value' })).to.not.throw;
    });
  });

  describe('#toJSON', function () {
    it('should return the properties of the object', function () {
      const props = { key: 'value' };
      const obj = new PrimitiveEventEmitter(props);

      expect(obj.toJSON()).to.deep.equal(props);
    });
  });
});
