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

app.get('/employees', (req, res, next) => {
  var restaurantData;
  var managerData;
  var employeeData;
  getRestaurantData(mysql)
  .then((data) => {
    restaurantData = data;
    return getEmployeeData(mysql)
  })
  .then((data) => {
    employeeData = data;
    return getManagerData(mysql)
  })
  .then((data) => {
    managerData = data;
    handleObj = {
      restaurant: restaurantData,
      manager: managerData,
      employee: employeeData
    };
    res.render('employee', handleObj);
  })
  .catch((err) => {
    console.log(err);
    res.render('500');
  });
});

function getEmployeeData(mysql) {
  return new Promise((resolve, reject) => {
    mysql.pool.query("SELECT * FROM Employees", (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

app.post("/searchemployee", (req, res, next) => {
  searchEmployee(req.body.name, req.body.pos, req.body.res)
  .then((data) => {
    handleObj = {
      employee: data
    };
    res.render('employeeResult', handleObj);
  })
  .catch((err) => {
    console.log(err);
    res.render('500');
  });
});

function searchEmployee(name, pos) {
  return new Promise((resolve, reject) => {
    if (name == "" && !(pos == "")) {
      mysql.pool.query("SELECT * FROM Employees WHERE role=?", [pos], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    } else if (pos == "" && !(name == "")) {
      mysql.pool.query("SELECT * FROM Employees WHERE name=?", [name], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    } else if (!(pos == "" && name == "")) {
      mysql.pool.query("SELECT * FROM Employees WHERE name=? AND role=?", [name, pos], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    } else {
      mysql.pool.query("SELECT * FROM Employees", (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    }
  });
}

app.put("/assignemployee", (req, res, next) => {
  changeEmployeeRestaurant(req.body.rid, req.body.eid)
  .then((data) => {
    console.log(data);
    res.json({
      status: 204
    });
  })
  .catch((err) => {
    console.log(err);
    res.render('500');
  });
});

function changeEmployeeRestaurant(rid, eid) {
  return new Promise((resolve, reject) => {
    mysql.pool.query("UPDATE Employees SET rid=? WHERE eid=?", [rid, eid], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

app.post("/createemployee", (req, res, next) => {
  createNewEmployee(req.body.name, req.body.position, req.body.managerid, req.body.rid)
  .then((data) => {
    res.json({
      status: 201
    });
  })
  .catch((err) => {
    console.log(err);
    res.render('500');
  });
});

function createNewEmployee(name, position, managerid, rid) {
  return new Promise((resolve, reject) => {
    mysql.pool.query("INSERT INTO Employees VALUES(?, ?, ?, ?, ?)", [null, name, position, rid, managerid], (err, results) => {
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
    res.json({
      status: 201
    });
  })
  .catch((err) => {
    console.log(err);
    res.render('500');
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
  changeManager(req.body.managerid, req.body.rid)
  .then((data) => {
    res.json({
      status: 204
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(500);
  })
});

function changeManager(mid, rid) {
  return new Promise((resolve, reject) => {
    mysql.pool.query("UPDATE Manager SET rid=? WHERE managerid=?", [mid, rid], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

app.get('/users', (req, res, next) => {
  var UserData;
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
    res.json({
      status: 201}
    );
  })
  .catch((err) => {
    console.log(err);
    res.render('500');
  });
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
  var searchterm = req.body.name;
  searchUser(searchterm)
  .then((data) => {
    handleObj = {
      user: data
    };
    res.render("userResult", handleObj);
  })
  .catch((err) => {
    console.log(err);
    res.render('500');
  });
});

function searchUser(name) {
  if(name == ""){
    return new Promise((resolve, reject) => {
      mysql.pool.query("SELECT * FROM Users", (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
  else{
    return new Promise((resolve, reject) => {
      mysql.pool.query("SELECT * FROM Users WHERE name=?", [name], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
}

app.get('/menu', (req, res, next) => {
  var managerData;
  var restaurantData;
  var dishdata;
  var menudata;
  getManagerData(mysql)
  .then((data) => {
    managerData = data;
    return getRestaurantData(mysql)
  })
  .then((data) => {
    restaurantData = data;
    return getdishData(mysql)
  })
  .then((data) => {
    dishData = data;
    return getmenuData(mysql)
  })
  .then((data) => {
    menuData = data;
    handleObj = {
      restaurant: restaurantData,
      manager: managerData,
      menu: menuData,
      dish: dishData
    };
    res.render("menu", handleObj);
  })
  .catch((err) => {
    console.log(err);
    res.render('500');
  });
});

function getdishData(mysql) {
  return new Promise((resolve, reject) => {
    mysql.pool.query('SELECT * FROM Dishes', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

function getmenuData(mysql) {
  return new Promise((resolve, reject) => {
    mysql.pool.query('SELECT * FROM Menu', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

app.post('/createmenu', (req, res, next) => {
  createmenu(req.body.mid,req.body.managerid)
  .then((data) => {
    res.status(201);
  })
  .catch((err) => {
    console.log(err);
    res.status(500);
  })
});

function createmenu(mid,managerid) {
  return new Promise((resolve, reject) => {
    mysql.pool.query("INSERT INTO Menu VALUES(?, ?, ?)", [mid, 0, managerid], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

app.post('/addtomenu', (req, res, next) => {
  addtomenu(req.body.mid,req.body.did)
  .then((data) => {
    res.status(201);
  })
  .catch((err) => {
    console.log(err);
    res.status(500);
  })
});

function addtomenu(mid,did) {
  return new Promise((resolve, reject) => {
    mysql.pool.query("INSERT INTO MenuContainsDish VALUES(?, ?)", [did,mid], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

app.post('/setrmenu', (req, res, next) => {
  setrmenu(req.body.rid,req.body.mid)
  .then((data) => {
    res.status(201);
  })
  .catch((err) => {
    console.log(err);
    res.status(500);
  })
});

function setrmenu(rid,mid) {
  return new Promise((resolve, reject) => {
    mysql.pool.query("UPDATE Restaurant SET mid=? WHERE rid=?", [mid, rid], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

app.get('/customerrewards', (req, res, next) => {
  var rewardsData;
  var restaurantData;
  getDeliveryData(mysql)
  .then((data) => {
    rewardsData = data;
    return getRestaurantData(mysql)
  })
  .then((data) => {
    restaurantData = data;
    handleObj = {
      restaurant: restaurantData,
      rewards: rewardsData
    };
    res.render("customerrewards", handleObj);
  })
  .catch((err) => {
    console.log(err);
    res.render('500');
  });
});

function getrewardsData(mysql) {
  return new Promise((resolve, reject) => {
    mysql.pool.query('SELECT * FROM CustomerRewards', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

app.post('/createreward', (req, res, next) => {
  createreward(req.body.rd,req.body.desc,req.body.rid)
  .then((data) => {
    res.status(201);
  })
  .catch((err) => {
    console.log(err);
    res.status(500);
  })
});

function createreward(rd,desc,rid) {
  return new Promise((resolve, reject) => {
    mysql.pool.query("INSERT INTO CustomerRewards VALUES(?, ?, ?, ?)", [null,desc, rd, rid], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

app.post('/searchreward', (req, res, next) => {
  searchreward(req.body.rid)
  .then((data) => {
   obj = {
      reward: data
      };
    res.render('customerrewardsresult',obj);
  })
  .catch((err) => {
    console.log(err);
    res.status(500);
  })
});

function searchreward(rid) {
  if(rid == ""){
     return new Promise((resolve, reject) => {
       mysql.pool.query("SELECT * FROM CustomerRewards", (err, results) => {
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
       mysql.pool.query("SELECT * FROM CustomerRewards Where rid = ?", [rid], (err, results) => {
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

app.get('/delivery', (req, res, next) => {
  var deliveryData;
  var restaurantData;
  getDeliveryData(mysql)
  .then((data) => {
    deliveryData = data;
    return getRestaurantData(mysql)
  })
  .then((data) => {
    restaurantData = data;
    handleObj = {
      restaurant: restaurantData,
      delivery: deliveryData
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
    res.json({
      status: 201
    });
  })
  .catch((err) => {
    console.log(err);
    res.render('500');
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
app.get('/dish', (req, res, next) => {
  var dishData;
  getDishData(mysql)
  .then((data) => {
    dishData = data;
    handleObj = {
      dishes: dishData
    };
    res.render("dishes", handleObj);
  })
  .catch((err) => {
    console.log(err);
    res.render('500');
  });
});

function getDishData(mysql) {
  return new Promise((resolve, reject) => {
    mysql.pool.query('SELECT * FROM Dishes', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}
app.post('/createdish', function(req,res,next){
  createDish(req.body.name, req.body.lunchprice, req.body.dinnerprice)
  .then((data) => {
    res.status(204);
  })
  .catch((err) => {
    console.log(err);
    res.status(500);
  })
});

function createDish (name, lunchprice, dinnerprice){
  return new Promise((resolve, reject) => {
    mysql.pool.query("INSERT INTO Dishes VALUES(?, ?, ?, ?)", [null, name, lunchprice, dinnerprice], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

app.post('/searchdish', function(req,res,next){
  console.log(req.body.name, req.body.lunchprice, req.body.dinnerprice);
  searchDish(req.body.name, req.body.lunchprice, req.body.dinnerprice)
  .then((data) => {
    handleObj = {
      dish: data
    }
    res.render('dishesResult', handleObj)
  })
  .catch((err) => {
    console.log(err);
    res.render('500');
  });
});

function searchDish(name, lunchprice, dinnerprice) {
  console.log(name, lunchprice, dinnerprice);
  return new Promise((resolve, reject) =>{
    if(!(lunchprice == "" && dinnerprice == "") && name) {
      mysql.pool.query("SELECT * FROM Dishes WHERE name=?", [name], (err, results) =>{
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    } else if ((lunchprice || dinnerprice) && !name) {
      mysql.pool.query("SELECT * FROM Dishes WHERE lunchprice=? OR dinnerprice=?", [lunchprice, dinnerprice], (err, results) => {
        if (err) {
          reject(err);
        } else {
          console.log("456")
          console.log(results)
          resolve(results);
        }
      });
    }else{
      mysql.pool.query("SELECT * FROM Dishes WHERE name=? AND lunchprice=? AND dinnerprice=?", [name, lunchprice, dinnerprice], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    }
  });
}

app.get('/',function(req,res,next){
  res.render('home');
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
