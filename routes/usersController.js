 (function(usersController) {
    var data = require("../data");
    var hasher = require("../auth/hasher");
    var auth = require("../auth");

    usersController.init = function(app) {

       app.route('/api/users')
          .get(auth.isAdministrator, function(req, res) {
             console.log(req.user.role);
             data.getUsers(function(err, users) {
                if (users) {
                   res.send({
                      success: true,
                      users: users
                   });
                }
                else {
                   res.send({
                      success: false,
                      error: err || "users retrieve error"
                   });
                }
             });
          })
          .put(auth.isAdministrator, function(req, res) {
             var user = req.body.user;
             data.updateUser(user, function(err, documentsUpdated) {
                if (documentsUpdated == 1) {
                   delete user.passwordHashed;
                   delete user.salt;
                   res.send({
                      success: true,
                      user: user
                   });
                }
                else {
                   res.send({
                      success: false,
                      error: err || "user update error"
                   });
                }
             });
          }).post(function(req, res) {
             var user = req.body.user;
             var salt = hasher.createSalt();
             user.passwordHashed = hasher.computeHash(user.password, salt);
             user.salt = salt;
             user.role = 'guest';
             delete user.password;
             data.createUser(user, function(err, records) {
                if (err) {
                   res.send({
                      success: false,
                      error: err || 'user creation error'
                   });
                }
                else {
                   res.send({
                      success: true
                   });
                }
             });
          }).delete(auth.isAdministrator, function(req, res) {
             var user = req.body.user;
             data.removeUser(user.userName, function(err, documentsDeleted) {
                if (documentsDeleted > 0) {
                   res.send({
                      success: true
                   });
                }
                else {
                   res.send({
                      success: false,
                      error: err || "user deletion error"
                   });
                }
             });
          });

       app.get("/api/users/:userName", auth.isAdministrator, function(req, res) {
          var userName = req.params.userName;
          data.getUser(userName, function(err, user) {
             if (user) {
                delete user.passwordHashed;
                delete user.salt;
                res.send({
                   success: true,
                   user: user
                });
             }
             else {
                res.send({
                   success: false,
                   error: err || "users retrieve error"
                });
             }
          });
       });


       /*app.post('/api/users', auth.isAdministrator, function(req, res) {
          var user = req.body.user;
          if (!existingUser(user)) {
             setNewUserProperties(user);
          }
          data.saveUser(user, function(err, user) {
             if (err) {
                res.send({
                   success: false,
                   error: err || 'user save error'
                });
             }
             else {
                delete user.passwordHashed;
                delete user.salt;
                res.send({
                   success: true,
                   user: user
                });
             }
          });
       });
       function existingUser(user){
          return user._id;
       }
       function setNewUserProperties(user) {
          var salt = hasher.createSalt();
          user.passwordHashed = hasher.computeHash(user.password, salt);
          user.salt = salt;
          user.role = 'guest';
          delete user.password;
       }*/
    };

 })(module.exports);