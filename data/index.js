(function(data) {
   var seedData = require("./seedData");
   var database = require("./database");



   data.createUser = function(user, next) {
      database.getDb(function(err, db) {
         if (err) {
            console.log("Failed to create user: " + err);
         }
         else {
            db.users.insert(user, next);
         }
      });
   };

   data.updateUser = function(user, next) {
      database.getDb(function(err, db) {
         if (err) {
            console.log("Failed to update user");
            next(err);
         }
         else {
            db.users.update({
               userName: user.userName
            }, {
               $set: {
                  userName: user.userName,
                  email: user.email,
                  icon: user.icon,
                  role: user.role
               }
            }, {
               multi: false
            }, next);
         }
      });
   };

   /*   data.saveUser = function(user, next) {
         database.getDb(function(err, db) {
            if (err) {
               console.log("Failed to save user : " + err);
               next(err);
            }
            else {
               db.users.save(user, next);
            }
         });
      };*/

   data.getUsers = function(next) {
      database.getDb(function(err, db) {
         if (err) {
            next(err);
         }
         else {
            db.users.find(null, {passwordHashed : false, salt : false}).toArray(function(err, results) {
               if (err) {
                  next(err);
               }
               else {
                  next(null, results);
               }
            });
         }
      });
   };

   data.getUser = function(username, next) {
      database.getDb(function(err, db) {
         if (err) {
            next(err);
         }
         else {
            db.users.findOne({userName: username}, next);
         }
      });
   };

   data.removeUser = function(userName, next) {
      database.getDb(function(err, db) {
         if (err) {
            next(err);
         }
         else {
            db.users.remove({
               userName: userName
            }, next);
         }
      });
   };



   function seedDatabase() {
      database.getDb(function(err, db) {
         if (err) {
            console.log("Failed to seed database: " + err);
         }
         else {
            // test to see if data exists
            db.users.count(function(err, count) {
               if (err) {
                  console.log("Failed to retrieve database count");
               }
               else {
                  if (count === 0) {
                     console.log("Seeding users to the Database...");
                     seedData.users.forEach(function(item) {
                        db.users.insert(item, function(err) {
                           if (err) {
                              console.log("Failed to insert user into database");
                           }
                        });
                     });
                  }
                  else {
                     console.log("Database already seeded");
                  }
               }
            });
         }
      });
   }

   seedDatabase();

})(module.exports);