module.exports = function(models){

const waiterList = [];
const waiterFind = models.WaiterModel;

  const waiters = function(req, res, next){
      waiterFind.find({}, function(err, waiters){
        if(err) {
          return next(err);
        }
        console.log(waiters.length);
        res.render('waiter-app/waiters', {
          waiters
        });
      });
}

const add = function(req, res, next) {

  var firstLet = req.body.waiter.substring(0, 1);
  var capLet = req.body.waiter.substring(0, 1).toUpperCase();

      var waiter = {
          username: req.body.waiter.replace(firstLet, capLet)
      };
      // var addBtn = req.body.addBtn;

      // if (addBtn){
      if (!waiter || !waiter.username) {
          req.flash('error', 'Text field should not be blank');
          res.redirect('/waiters');
      } else {
          waiterFind.create(waiter, function(err, results) {
              if (err) {
                  if (err.code === 11000) {
                      req.flash('error', 'Waiter already exists!');
                  } else {
                      return next(err);
                  }
              } else {
                  req.flash('success', 'Waiter added!');
              }
              res.redirect('/waiters');
          });
      }
      // }
  };

  const waiter = function(req, res, next){
    var daysObject = {};
    var days = req.body.day;

    if (!Array.isArray(days)) {
      days = [days]
    }
    days.forEach(function(days) {
      daysObject[days] = true
    });

    waiterFind.findOneAndUpdate({
      username: req.params.username
    },{
      days: daysObject
    }, function(err, waiters){
      if(err){
        return next(err);
      }else if (!waiters) {
        waiterFind.create({
          username: req.params.username,
          days: daysObject
        });
      } else {
        if (waiters){
          var resultOfWaiter = 'Hi, ' + waiters.username + '. Please Select The Days You Are Available To Work:'
        } else {
          var resultOfWaiter = 'Sorry, but this waiter was not found, please add it to the waiter list.'
        }
      }
      console.log(req.params.username);
      res.render('waiter-app/waiter', {resultOfWaiter});
    })
  }

  function dayColor(waiterCounter) {
   if (waiterCounter === 3) {
     return 'bg-success';
   } else if (waiterCounter > 3) {
     return 'bg-warning';
   } else {
     return 'bg-danger';
   }
}


const days = function(req, res, next){
    Monday = [];
    Tuesday = [];
    Wednesday = [];
    Thursday = [];
    Friday = [];
    Saturday = [];
    Sunday = [];
   waiterFind.find({}, function(err, waiters) {
     if (err) {
       return next(err)
     } else {
       for (var i = 0; i < waiters.length; i++) {
         var myDays = waiters[i].days;
         for (var day in myDays) {
           if (day == 'Monday') {
             Monday.push(waiters[i].username);
           } else if (day == 'Tuesday') {
             Tuesday.push(waiters[i].username);
           } else if (day == 'Wednesday') {
             Wednesday.push(waiters[i].username);
           } else if (day == 'Thursday') {
             Thursday.push(waiters[i].username);
           } else if (day == 'Friday') {
             Friday.push(waiters[i].username);
           } else if (day == 'Saturday') {
             Saturday.push(waiters[i].username);
           } else if (day == 'Sunday') {
             Sunday.push(waiters[i].username);
           }
         }
       }
       console.log(Monday);
       console.log(Saturday);
       console.log(Wednesday);
     }
     res.render('waiter-app/days', {
       mondayNames: Monday,
       mondayCounter: Monday.length,
       mondayStyle: dayColor(Monday.length),

       tuesdayNames: Tuesday,
       tuesdayCounter: Tuesday.length,
       tuesdayStyle: dayColor(Tuesday.length),

       wednesdayNames: Wednesday,
       wednesdayCounter: Wednesday.length,
       wednesdayStyle: dayColor(Wednesday.length),

       thursdayNames: Thursday,
       thursdayCounter: Thursday.length,
       thursdayStyle: dayColor(Thursday.length),

       fridayNames: Friday,
       fridayCounter: Friday.length,
       fridayStyle: dayColor(Friday.length),

       saturdayNames: Saturday,
       saturdayCounter: Saturday.length,
       saturdayStyle: dayColor(Saturday.length),

       sundayNames: Sunday,
       sundayCounter: Sunday.length,
       sundayStyle: dayColor(Sunday.length),
     });
   });
 }


  return {
    waiters,
    add,
    waiter,
    dayColor,
    days
  }

};
