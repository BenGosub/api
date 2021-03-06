'use strict';

const Condition = require('../../../api/models/condition');

describe('Conditions', () => {
  before(clearDB);

  afterEach(clearDB);

  describe('GET /v1/conditions/{id}', () => {
    it('returns 404 if there\'s no condition with the received ID', () => (
      server.inject('/v1/conditions/eb1af997-3e9c-4f31-895f-002ec1cfa196')
        .then((response) => {
          response.statusCode.should.equal(404);
        })
    ));

    it('returns the Condition', () => (
      factory.create('condition').then((model) => {
        return server.inject('/v1/conditions/' + model.attributes.id)
          .then((response) => {
            response.statusCode.should.equal(200);

            const expectedResult = JSON.parse(JSON.stringify(model.toJSON()));
            const result = JSON.parse(response.result);

            result.should.deepEqual(expectedResult);
          })
      })
    ));
  });
});
