EifoAta
=======
A location based app enabling to share location with other connected users and watch data layers on map.

instructions:
1. MongoDB connection need to be configured in data/database.js 
   mongodb was installed on mongoHQ(Compose). the connection string : mongodb://user:password@kahana.mongohq.com:10021/konfortes.
   
2. To run with nodemon: nodemon server.js

3. In cloud9 hosting, the app can be accessed by URL that is emitted to the Output tab of the console.

in case of Error: listen EADDRINUSE run kill $(ps ax | grep '[j]s' | awk '{ print $1 }').
