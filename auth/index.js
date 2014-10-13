(function(auth) {
   var data = require("../data");
   var hasher = require("./hasher");
   var passport = require("passport");
   var LocalStrategy = require("passport-local").Strategy;

   function verifyUser(userName, password, next) {
      data.getUser(userName, function(err, user) {
         if (err || !user || !user.salt) {
            console.log('invalid credentials : ' + userName + ' : ' + password);
            return next(null, false, {message: "Invalid Credentials"});
         }
         else {
            var testHash = hasher.computeHash(password, user.salt);
            if (testHash === user.passwordHashed) {
               return next(null, user);
            }
            else {
               return next(null, false);
            }
         }
      });
   }

   auth.isAdministrator = function(req, res, next){
      if(req.isAuthenticated() && req.user.role == "admin"){
         next();
      }
      else
      {
         res.send(401, "Not authorized");
      }
   };

   auth.ensureAuthenticated = function(req, res, next){
      if(req.isAuthenticated()){
         next();
      }
      else
      {
         res.send(401, "Not authorized");
      }
   };

   auth.init = function(app) {
      passport.use(new LocalStrategy({
         usernameField: 'userName'
      }, verifyUser));

      passport.serializeUser(function(user, next) {
         next(null, user.userName);
      });

      passport.deserializeUser(function(key, next) {
         data.getUser(key, function(err, user) {
            if (err) {
               return next(null, false, {message: "Failed to deserialize user " + err});
            }
            else {
               return next(null, user);
            }
         });
      });
      app.use(passport.initialize());
      app.use(passport.session());

      app.post("/api/login/loginUser", function(req, res, next) {
         var authFunction = passport.authenticate('local', function(err, user, info) {
            if (err || !user) {
               //return next(err);
               res.send({success : false, error : info ? info : err});
            }

            else {
               req.logIn(user, function(err) {
                  if (err) {
                     //next(err);
                     res.send({success : false, error : err});
                  }
                  else {
                     delete user.passwordHashed;
                     delete user.salt;
                     res.send({
                        id: "id",
                        success: true,
                        user: user
                     });
                  }
               });
            }
         });

         authFunction(req, res, next);
      });
   };
})(module.exports);