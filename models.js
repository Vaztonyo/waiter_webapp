const mongoose = require('mongoose');
module.exports = function(mongoUrl){
  mongoose.Promise = global.Promise;

    mongoose.connect(mongoUrl);

    const WaiterSchema = mongoose.Schema({
      username : String,
      days  : Object
    });
    WaiterSchema.index({username : 1}, {unique : true});

    const WaiterModel = mongoose.model('WaiterModel', WaiterSchema);

    return {
        WaiterModel
    };
}
