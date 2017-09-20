module.exports = function(){

const waiterList = [];

  const waiters = function(req, res){
    var waiter = req.body.waiter;

  var foundWaiter =  waiterList.find(function(currentWaiter){
      return currentWaiter === waiter;
    });

    if(!waiter){
      req.flash('error', 'Text field should not be blank')
    }

  else if (!foundWaiter) {
      waiterList.push(waiter);
    }

    res.render('waiter-app/waiters', {waiters : waiterList})
  }

  const waiter = function(req, res){
    res.render('waiter-app/waiter');
  }

  return {
    waiters,
    waiter
  }

};
