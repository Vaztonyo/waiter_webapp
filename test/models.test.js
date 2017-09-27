const assert = require('assert');
const Models = require('../models');
describe('Models should be able to', function() {

  var models = Models('mongodb://localhost/waiters-tests');

  beforeEach(function(done) {
  models.WaiterModel.remove({}, function(err) {
      done(err);
    });
  });
  it('store Waiters to mongodb', function(done) {

    var WaiterData = {
      username: 'the test waiter'
    };
    models.WaiterModel.create(WaiterData, function(err) {
      // done(err);

      models.WaiterModel.find({
        username: 'the test waiter'
      }, function(err, waiters) {
        assert.equal(1, waiters.length);
        done(err);
      });


    });
  });

  it('should not allow dupicate Waiters', function(done){
  var WaiterData = {
    username: 'the test waiter'
  };
  models.WaiterModel.create(WaiterData, function(err) {
    var WaiterData = {
      username: 'the test waiter'
    };
      models.WaiterModel.create(WaiterData, function(err) {
        assert.ok(err, 'should give an error for duplicates Waiters')
        done();
  });
});
});
});
