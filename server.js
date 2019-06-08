var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.use(bodyParser.urlencoded( { extended: true } ));

app.use(express.static('public'));


app.get('/users', (req, res, next) => {
  var customerData;
  getUserData(mysql)
  .then((data) => {
    UserData = data;
    handleObj = {
      Users: UserData
    };
    res.render("Users", handleObj);
  })
  .catch((err) => {
    console.log(err);
    res.render('500');
  });
});

function getUserData(mysql) {
  return new Promise((resolve, reject) => {
    mysql.pool.query('SELECT * FROM Users', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

app.post('/createuser', (req, res, next) => {
  createUser(req.body.name)
  .then((data) => {
    res.status(201);
  })
  .catch((err) => {
    console.log(err);
    res.status(500);
  })
});

function createUser(name) {
  return new Promise((resolve, reject) => {
    mysql.pool.query("INSERT INTO Users VALUES(?, ?)", [null, name], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}


app.post('/searchuser', (req, res, next) => {
    res.redirect('/result?name=' + name);
});


app.get('/result', (req, res, next) => {
   
   var searchterm = req.query.name;
   searchUser(searchterm)
   .then((data) => {
     handleObj = {
      col: [{ col: 'uid'}, {col: 'name'}],
      row: data
    };
   res.render("result",handleObj);
  })
  .catch((err) => {
    console.log(err);
    res.render('500');
  })

});


function searchUser(name) {
  if(name == ""){
     return new Promise((resolve, reject) => {
       mysql.pool.query("SELECT * FROM Users", (err, results) => {
         if (err) {
           reject(err);
         } else {
           resolve(results);
           console.log(results);
         }
       });
    }); 
  }
  else{
     return new Promise((resolve, reject) => {
       mysql.pool.query("SELECT * FROM Users Where name = (?)", [name], (err, results) => {
      if (err) {
        reject(err);
        } else {
           resolve(results);
           console.log(results);
         }
       });
     });  
  }
}

app.get('/deliverylocations', (req, res, next) => {
  var DeliveryData;
  var restaurantData;
  getDeliveryData(mysql)
  .then((data) => {
    DeliveryData = data;
    return getRestaurantData(mysql)
  })
  .then((data) => {
    restaurantData = data;
    handleObj = {
      restaurant: restaurantData,
      delivery: DeliveryData
    };
    res.render("deliverylocations", handleObj);
  })
  .catch((err) => {
    console.log(err);
    res.render('500');
  });
});

function getDeliveryData(mysql) {
  return new Promise((resolve, reject) => {
    mysql.pool.query('SELECT * FROM DeliveryLocations', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

app.post('/createdelivery', (req, res, next) => {
  createdelivery(req.body.address,req.body.distance,req.body.rid)
  .then((data) => {
    res.status(201);
  })
  .catch((err) => {
    console.log(err);
    res.status(500);
  })
});

function createdelivery(address,distance,rid) {
  return new Promise((resolve, reject) => {
    mysql.pool.query("INSERT INTO DeliveryLocations VALUES(?, ?, ?)", [address, distance, rid], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

app.get('/restaurant', (req, res, next) => {
  var managerData;
  var restaurantData;
  getManagerData(mysql)
  .then((data) => {
    managerData = data;
    return getRestaurantData(mysql)
  })
  .then((data) => {
    restaurantData = data;
    handleObj = {
      restaurant: restaurantData,
      manager: managerData
    };
    res.render("restaurant", handleObj);
  })
  .catch((err) => {
    console.log(err);
    res.render('500');
  });
});

function getManagerData(mysql) {
  return new Promise((resolve, reject) => {
    mysql.pool.query('SELECT * FROM Manager', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

function getRestaurantData(mysql) {
  return new Promise((resolve, reject) => {
    mysql.pool.query('SELECT * FROM Restaurant', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

app.post('/createrestaurant', (req, res, next) => {
  createRestaurant(req.body.name, req.body.open, req.body.close, req.body.manager)
  .then((data) => {
    res.status(201);
  })
  .catch((err) => {
    console.log(err);
    res.status(500);
  })
});

function createRestaurant(name, open, close, manager) {
  return new Promise((resolve, reject) => {
    mysql.pool.query("INSERT INTO Restaurant VALUES(?, ?, ?, ?, ?)", [null, name, open, close, manager], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

app.post('/changemanager', (req, res, next) => {

});

app.get('/',function(req,res,next){
  var context = {};
  var createString = "CREATE TABLE diagnostic(" +
  "id INT PRIMARY KEY AUTO_INCREMENT," +
  "text VARCHAR(255) NOT NULL)";
  mysql.pool.query('DROP TABLE IF EXISTS diagnostic', function(err){
    if(err){
      next(err);
      return;
    }
    mysql.pool.query(createString, function(err){
      if(err){
        next(err);
		return;
      }
	  mysql.pool.query('INSERT INTO diagnostic (`text`) VALUES ("MySQL is Working!")',function(err){
	    mysql.pool.query('SELECT * FROM diagnostic', function(err, rows, fields){
		  context.results = JSON.stringify(rows);
		  res.render('home',context);
		});
	  });
    });
  });
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
