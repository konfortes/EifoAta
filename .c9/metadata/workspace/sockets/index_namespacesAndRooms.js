{"filter":false,"title":"index_namespacesAndRooms.js","tooltip":"/sockets/index_namespacesAndRooms.js","undoManager":{"mark":99,"position":99,"stack":[[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":25,"column":15},"end":{"row":26,"column":0}},"text":"\n"},{"action":"insertText","range":{"start":{"row":26,"column":0},"end":{"row":26,"column":12}},"text":"            "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":26,"column":12},"end":{"row":27,"column":0}},"text":"\n"},{"action":"insertText","range":{"start":{"row":27,"column":0},"end":{"row":27,"column":12}},"text":"            "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":27,"column":12},"end":{"row":27,"column":73}},"text":"            socket.on('location update', function(location) {"},{"action":"insertText","range":{"start":{"row":27,"column":73},"end":{"row":28,"column":0}},"text":"\n"},{"action":"insertLines","range":{"start":{"row":28,"column":0},"end":{"row":33,"column":0}},"lines":["                console.log('the user ' + location.userName + ' has just updated location');","                if(connectedUsers.indexOf(location.userName) == -1){","                    connectedUsers.push(location.userName);","                }","                io.emit('location update', location);"]},{"action":"insertText","range":{"start":{"row":33,"column":0},"end":{"row":33,"column":15}},"text":"            });"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":27,"column":16},"end":{"row":27,"column":24}},"text":"        "}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":141,"column":0},"end":{"row":141,"column":4}},"text":"};*/"},{"action":"removeLines","range":{"start":{"row":0,"column":0},"end":{"row":141,"column":0}},"nl":"\n","lines":["(function(updater) {","    var socketio = require('socket.io');","    var _ = require('underscore');","    var connectedUsers = [];","    var connectedSockets = [];","    updater.init = function(server) {","        var io = socketio.listen(server);","        io.on('connection', function(socket) {","            console.log('client connected');","            connectedSockets.push(socket);","","            socket.on('disconnect', function() {","                console.log('disconnect event');","                connectedSockets.splice(connectedSockets.indexOf(socket), 1);","                /*  connectedSockets = _.filter(connectedSockets, function(s){","                    return s.id == socket.id;","                });*/","            });","","            socket.on('location update', function(location) {","                console.log('the user ' + location.userName + ' has just updated location');","                if(connectedUsers.indexOf(location.userName) == -1){","                    connectedUsers.push(location.userName);","                }","                io.emit('location update', location);","            });","            ","                socket.on('location update', function(location) {","                console.log('the user ' + location.userName + ' has just updated location');","                if(connectedUsers.indexOf(location.userName) == -1){","                    connectedUsers.push(location.userName);","                }","                io.emit('location update', location);","            });","        });","    }","})(module.exports);","","","","/*// Keep track of which names are used so that there are no duplicates","var userNames = (function () {","  var names = {};","","  var claim = function (name) {","    if (!name || names[name]) {","      return false;","    } else {","      names[name] = true;","      return true;","    }","  };","","  // find the lowest unused \"guest\" name and claim it","  var getGuestName = function () {","    var name,","      nextUserId = 1;","","    do {","      name = 'Guest ' + nextUserId;","      nextUserId += 1;","    } while (!claim(name));","","    return name;","  };","","  // serialize claimed names as an array","  var get = function () {","    var res = [];","    for (user in names) {","      res.push(user);","    }","","    return res;","  };","","  var free = function (name) {","    if (names[name]) {","      delete names[name];","    }","  };","","  return {","    claim: claim,","    free: free,","    get: get,","    getGuestName: getGuestName","  };","}());*/","","","","/*// export function for listening to the socket","module.exports = function (socket) {","  var name = userNames.getGuestName();","","  // send the new user their name and a list of users","  socket.emit('init', {","    name: name,","    users: userNames.get()","  });","","  // notify other clients that a new user has joined","  socket.broadcast.emit('user:join', {","    name: name","  });","","  // broadcast a user's message to other users","  socket.on('send:message', function (data) {","    socket.broadcast.emit('send:message', {","      user: name,","      text: data.message","    });","  });","","  // validate a user's name change, and broadcast it on success","  socket.on('change:name', function (data, fn) {","    if (userNames.claim(data.name)) {","      var oldName = name;","      userNames.free(oldName);","","      name = data.name;","","      socket.broadcast.emit('change:name', {","        oldName: oldName,","        newName: name","      });","","      fn(true);","    } else {","      fn(false);","    }","  });","","  // clean up when a user leaves, and broadcast it to other users","  socket.on('disconnect', function () {","    socket.broadcast.emit('user:left', {","      name: name","    });","    userNames.free(name);","  });"]},{"action":"insertText","range":{"start":{"row":0,"column":0},"end":{"row":0,"column":20}},"text":"(function(updater) {"},{"action":"insertText","range":{"start":{"row":0,"column":20},"end":{"row":1,"column":0}},"text":"\n"},{"action":"insertLines","range":{"start":{"row":1,"column":0},"end":{"row":141,"column":0}},"lines":["  var socketio = require('socket.io');","  var _ = require('underscore');","  var connectedUsers = [];","  var connectedSockets = [];","  updater.init = function(server) {","    var io = socketio.listen(server);","    io.on('connection', function(socket) {","      console.log('client connected');","      connectedSockets.push(socket);","","      socket.on('disconnect', function() {","        console.log('disconnect event');","        connectedSockets.splice(connectedSockets.indexOf(socket), 1);","        /*  connectedSockets = _.filter(connectedSockets, function(s){","                    return s.id == socket.id;","                });*/","      });","","      socket.on('location update', function(location) {","        console.log('the user ' + location.userName + ' has just updated location');","        if (connectedUsers.indexOf(location.userName) == -1) {","          connectedUsers.push(location.userName);","        }","        io.emit('location update', location);","      });","","      socket.on('location update', function(location) {","        console.log('the user ' + location.userName + ' has just updated location');","        if (connectedUsers.indexOf(location.userName) == -1) {","          connectedUsers.push(location.userName);","        }","        io.emit('location update', location);","      });","    });","  }","})(module.exports);","","","","/*// Keep track of which names are used so that there are no duplicates","var userNames = (function () {","  var names = {};","","  var claim = function (name) {","    if (!name || names[name]) {","      return false;","    } else {","      names[name] = true;","      return true;","    }","  };","","  // find the lowest unused \"guest\" name and claim it","  var getGuestName = function () {","    var name,","      nextUserId = 1;","","    do {","      name = 'Guest ' + nextUserId;","      nextUserId += 1;","    } while (!claim(name));","","    return name;","  };","","  // serialize claimed names as an array","  var get = function () {","    var res = [];","    for (user in names) {","      res.push(user);","    }","","    return res;","  };","","  var free = function (name) {","    if (names[name]) {","      delete names[name];","    }","  };","","  return {","    claim: claim,","    free: free,","    get: get,","    getGuestName: getGuestName","  };","}());*/","","","","/*// export function for listening to the socket","module.exports = function (socket) {","  var name = userNames.getGuestName();","","  // send the new user their name and a list of users","  socket.emit('init', {","    name: name,","    users: userNames.get()","  });","","  // notify other clients that a new user has joined","  socket.broadcast.emit('user:join', {","    name: name","  });","","  // broadcast a user's message to other users","  socket.on('send:message', function (data) {","    socket.broadcast.emit('send:message', {","      user: name,","      text: data.message","    });","  });","","  // validate a user's name change, and broadcast it on success","  socket.on('change:name', function (data, fn) {","    if (userNames.claim(data.name)) {","      var oldName = name;","      userNames.free(oldName);","","      name = data.name;","","      socket.broadcast.emit('change:name', {","        oldName: oldName,","        newName: name","      });","","      fn(true);","    } else {","      fn(false);","    }","  });","","  // clean up when a user leaves, and broadcast it to other users","  socket.on('disconnect', function () {","    socket.broadcast.emit('user:left', {","      name: name","    });","    userNames.free(name);","  });"]},{"action":"insertText","range":{"start":{"row":141,"column":0},"end":{"row":141,"column":4}},"text":"};*/"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":27,"column":17},"end":{"row":27,"column":32}},"text":"location update"},{"action":"insertText","range":{"start":{"row":27,"column":17},"end":{"row":27,"column":18}},"text":"m"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":27,"column":18},"end":{"row":27,"column":19}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":27,"column":19},"end":{"row":27,"column":20}},"text":"s"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":27,"column":20},"end":{"row":27,"column":21}},"text":"s"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":27,"column":21},"end":{"row":27,"column":22}},"text":"a"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":27,"column":22},"end":{"row":27,"column":23}},"text":"g"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":27,"column":23},"end":{"row":27,"column":24}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":27,"column":36},"end":{"row":27,"column":44}},"text":"location"},{"action":"insertText","range":{"start":{"row":27,"column":36},"end":{"row":27,"column":37}},"text":","}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":27,"column":37},"end":{"row":27,"column":38}},"text":"s"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":27,"column":38},"end":{"row":27,"column":39}},"text":"g"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":27,"column":38},"end":{"row":27,"column":39}},"text":"g"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":27,"column":37},"end":{"row":27,"column":38}},"text":"s"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":27,"column":36},"end":{"row":27,"column":37}},"text":","}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":27,"column":36},"end":{"row":27,"column":37}},"text":"m"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":27,"column":37},"end":{"row":27,"column":38}},"text":"s"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":27,"column":38},"end":{"row":27,"column":39}},"text":"g"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":28,"column":34},"end":{"row":28,"column":42}},"text":"location"},{"action":"insertText","range":{"start":{"row":28,"column":34},"end":{"row":28,"column":35}},"text":"m"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":28,"column":35},"end":{"row":28,"column":36}},"text":"s"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":28,"column":36},"end":{"row":28,"column":37}},"text":"g"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":28,"column":60},"end":{"row":28,"column":76}},"text":"updated location"},{"action":"insertText","range":{"start":{"row":28,"column":60},"end":{"row":28,"column":61}},"text":"s"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":28,"column":61},"end":{"row":28,"column":62}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":28,"column":62},"end":{"row":28,"column":63}},"text":"n"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":28,"column":63},"end":{"row":28,"column":64}},"text":"t"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":28,"column":64},"end":{"row":28,"column":65}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":28,"column":65},"end":{"row":28,"column":66}},"text":"t"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":28,"column":66},"end":{"row":28,"column":67}},"text":"h"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":28,"column":67},"end":{"row":28,"column":68}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":28,"column":68},"end":{"row":28,"column":69}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":28,"column":69},"end":{"row":28,"column":70}},"text":"m"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":28,"column":70},"end":{"row":28,"column":71}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":28,"column":71},"end":{"row":28,"column":72}},"text":"s"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":28,"column":72},"end":{"row":28,"column":73}},"text":"s"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":28,"column":73},"end":{"row":28,"column":74}},"text":"a"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":28,"column":74},"end":{"row":28,"column":75}},"text":"g"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":28,"column":75},"end":{"row":28,"column":76}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":28,"column":76},"end":{"row":28,"column":77}},"text":":"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":28,"column":78},"end":{"row":28,"column":79}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":28,"column":79},"end":{"row":28,"column":80}},"text":"+"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":28,"column":80},"end":{"row":28,"column":81}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":28,"column":81},"end":{"row":28,"column":82}},"text":"m"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":28,"column":82},"end":{"row":28,"column":83}},"text":"s"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":28,"column":83},"end":{"row":28,"column":84}},"text":"g"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":28,"column":84},"end":{"row":28,"column":85}},"text":"."}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":28,"column":85},"end":{"row":28,"column":86}},"text":"t"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":28,"column":86},"end":{"row":28,"column":87}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":28,"column":87},"end":{"row":28,"column":88}},"text":"x"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":28,"column":88},"end":{"row":28,"column":89}},"text":"t"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":31,"column":0},"end":{"row":31,"column":9}},"text":"        }"},{"action":"removeLines","range":{"start":{"row":29,"column":0},"end":{"row":31,"column":0}},"nl":"\n","lines":["        if (connectedUsers.indexOf(location.userName) == -1) {","          connectedUsers.push(location.userName);"]}]}],[{"group":"doc","deltas":[{"action":"removeLines","range":{"start":{"row":29,"column":0},"end":{"row":30,"column":0}},"nl":"\n","lines":[""]}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":29,"column":17},"end":{"row":29,"column":32}},"text":"location update"},{"action":"insertText","range":{"start":{"row":29,"column":17},"end":{"row":29,"column":18}},"text":"m"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":29,"column":18},"end":{"row":29,"column":19}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":29,"column":19},"end":{"row":29,"column":20}},"text":"s"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":29,"column":20},"end":{"row":29,"column":21}},"text":"s"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":29,"column":21},"end":{"row":29,"column":22}},"text":"a"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":29,"column":22},"end":{"row":29,"column":23}},"text":"g"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":29,"column":23},"end":{"row":29,"column":24}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":29,"column":27},"end":{"row":29,"column":35}},"text":"location"},{"action":"insertText","range":{"start":{"row":29,"column":27},"end":{"row":29,"column":28}},"text":"m"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":29,"column":28},"end":{"row":29,"column":29}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":29,"column":29},"end":{"row":29,"column":30}},"text":"s"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":29,"column":30},"end":{"row":29,"column":31}},"text":"s"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":29,"column":31},"end":{"row":29,"column":32}},"text":"a"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":29,"column":32},"end":{"row":29,"column":33}},"text":"g"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":29,"column":33},"end":{"row":29,"column":34}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":29,"column":27},"end":{"row":29,"column":34}},"text":"message"},{"action":"insertText","range":{"start":{"row":29,"column":27},"end":{"row":29,"column":28}},"text":"m"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":29,"column":28},"end":{"row":29,"column":29}},"text":"s"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":29,"column":29},"end":{"row":29,"column":30}},"text":"g"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":138,"column":0},"end":{"row":138,"column":4}},"text":"};*/"},{"action":"removeLines","range":{"start":{"row":36,"column":0},"end":{"row":138,"column":0}},"nl":"\n","lines":["","/*// Keep track of which names are used so that there are no duplicates","var userNames = (function () {","  var names = {};","","  var claim = function (name) {","    if (!name || names[name]) {","      return false;","    } else {","      names[name] = true;","      return true;","    }","  };","","  // find the lowest unused \"guest\" name and claim it","  var getGuestName = function () {","    var name,","      nextUserId = 1;","","    do {","      name = 'Guest ' + nextUserId;","      nextUserId += 1;","    } while (!claim(name));","","    return name;","  };","","  // serialize claimed names as an array","  var get = function () {","    var res = [];","    for (user in names) {","      res.push(user);","    }","","    return res;","  };","","  var free = function (name) {","    if (names[name]) {","      delete names[name];","    }","  };","","  return {","    claim: claim,","    free: free,","    get: get,","    getGuestName: getGuestName","  };","}());*/","","","","/*// export function for listening to the socket","module.exports = function (socket) {","  var name = userNames.getGuestName();","","  // send the new user their name and a list of users","  socket.emit('init', {","    name: name,","    users: userNames.get()","  });","","  // notify other clients that a new user has joined","  socket.broadcast.emit('user:join', {","    name: name","  });","","  // broadcast a user's message to other users","  socket.on('send:message', function (data) {","    socket.broadcast.emit('send:message', {","      user: name,","      text: data.message","    });","  });","","  // validate a user's name change, and broadcast it on success","  socket.on('change:name', function (data, fn) {","    if (userNames.claim(data.name)) {","      var oldName = name;","      userNames.free(oldName);","","      name = data.name;","","      socket.broadcast.emit('change:name', {","        oldName: oldName,","        newName: name","      });","","      fn(true);","    } else {","      fn(false);","    }","  });","","  // clean up when a user leaves, and broadcast it to other users","  socket.on('disconnect', function () {","    socket.broadcast.emit('user:left', {","      name: name","    });","    userNames.free(name);","  });"]}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":6,"column":4},"end":{"row":7,"column":0}},"text":"\n"},{"action":"insertText","range":{"start":{"row":7,"column":0},"end":{"row":7,"column":4}},"text":"    "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":7,"column":4},"end":{"row":8,"column":0}},"text":"\n"},{"action":"insertText","range":{"start":{"row":8,"column":0},"end":{"row":8,"column":4}},"text":"    "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":6,"column":4},"end":{"row":6,"column":5}},"text":"v"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":6,"column":5},"end":{"row":6,"column":6}},"text":"a"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":6,"column":6},"end":{"row":6,"column":7}},"text":"r"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":6,"column":7},"end":{"row":6,"column":8}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":6,"column":8},"end":{"row":6,"column":9}},"text":"l"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":6,"column":9},"end":{"row":6,"column":10}},"text":"o"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":6,"column":10},"end":{"row":6,"column":11}},"text":"c"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":6,"column":11},"end":{"row":6,"column":12}},"text":"a"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":6,"column":12},"end":{"row":6,"column":13}},"text":"t"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":6,"column":13},"end":{"row":6,"column":14}},"text":"i"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":6,"column":14},"end":{"row":6,"column":15}},"text":"o"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":6,"column":15},"end":{"row":6,"column":16}},"text":"n"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":6,"column":16},"end":{"row":6,"column":17}},"text":"I"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":6,"column":17},"end":{"row":6,"column":18}},"text":"o"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":6,"column":18},"end":{"row":6,"column":19}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":6,"column":19},"end":{"row":6,"column":20}},"text":"="}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":6,"column":20},"end":{"row":6,"column":21}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":6,"column":21},"end":{"row":6,"column":22}},"text":"s"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":6,"column":22},"end":{"row":6,"column":23}},"text":"o"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":6,"column":23},"end":{"row":6,"column":24}},"text":"c"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":6,"column":24},"end":{"row":6,"column":25}},"text":"k"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":6,"column":25},"end":{"row":6,"column":26}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":6,"column":26},"end":{"row":6,"column":27}},"text":"t"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":6,"column":27},"end":{"row":6,"column":28}},"text":"i"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":6,"column":28},"end":{"row":6,"column":29}},"text":"o"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":5,"column":2},"end":{"row":6,"column":0}},"text":"\n"},{"action":"insertText","range":{"start":{"row":6,"column":0},"end":{"row":6,"column":2}},"text":"  "}]}]]},"ace":{"folds":[],"customSyntax":"javascript","scrolltop":0,"scrollleft":0,"selection":{"start":{"row":9,"column":37},"end":{"row":9,"column":37},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1407677298000,"hash":"7564f9619f5b280d9f33feb23c4656d91270f70f"}