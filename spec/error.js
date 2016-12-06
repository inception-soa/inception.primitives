'use strict';
/**
 * @file Unit tests for PrimitiveError
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
const PrimitiveError = require('../lib/error');


describe('PrimitiveError', function () {
  describe('new', function () {
    it('should be callable', function () {
      expect(PrimitiveError).to.be.a('function');
    });

    it('should not be instantiable without required arguments', function () {
      expect(() => new PrimitiveError()).to.throw;
      expect(() => new PrimitiveError(null)).to.throw;
    });

    it('should be instantiable with arguments', function () {
      expect(() => new PrimitiveError('code')).to.not.throw;
    });
  });

  describe('properties', function () {
    const err = new PrimitiveError('code', { key: 'value' }, new Error('err'));

    it('should have a `code` property', function () {
      expect(err).to.have.property('code');
      expect(err.code).to.equal('code');
    });

    it('should have a `metadata` property', function () {
      expect(err).to.have.property('metadata');
      expect(err.metadata).to.deep.equal({ key: 'value' });
    });

    it('should have a `cause` property', function () {
      expect(err).to.have.property('cause');
      expect(err.cause).to.be.an.instanceof(Error);
      expect(err.cause.message).to.equal('err');
    });
  });

  describe('#toJSON', function () {
    it('should return the properties of the object', function () {
      const err = new PrimitiveError('code', { key: 'value' });
      const props = {
        code: 'code',
        metadata: { key: 'value' },
        cause: undefined
      };

      expect(err.toJSON()).to.deep.equal(props);
    });
  });
});
