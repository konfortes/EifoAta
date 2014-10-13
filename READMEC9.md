
    ,-----.,--.                  ,--. ,---.   ,--.,------.  ,------.
    '  .--./|  | ,---. ,--.,--. ,-|  || o   \  |  ||  .-.  \ |  .---'
    |  |    |  || .-. ||  ||  |' .-. |`..'  |  |  ||  |  \  :|  `--, 
    '  '--'\|  |' '-' ''  ''  '\ `-' | .'  /   |  ||  '--'  /|  `---.
     `-----'`--' `---'  `----'  `---'  `--'    `--'`-------' `------'
    ----------------------------------------------------------------- 


1) mongodb was installed on mongoHQ. the connection string : mongodb://konfortes:konfortes@kahana.mongohq.com:10021/konfortes.
     can be accessed also via console : mongo kahana.mongohq.com:10021/konfortes -u konfortes -p konfortes

2) Open the server.js file

3) Click the 'Run' button at the top to start your server OR run nodemon server.js

4) Click the URL that is emitted to the Output tab of the console

in case of Error: listen EADDRINUSE
run kill $(ps ax | grep '[j]s' | awk '{ print $1 }')