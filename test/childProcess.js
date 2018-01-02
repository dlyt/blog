var exec = require('child_process').exec;

let rz = `asdf是大法官`;
exec("echo '" + rz + "' >> " + './ce.log');

// var ls = exec('dir;/ node -v',function (error, stdout, stderr) {
//   if (error) {
//     console.log(error.stack);
//     console.log('Error code: ' + error.code);
//   }
//   console.log('Child Process STDOUT: ' + stdout);
  
// });

