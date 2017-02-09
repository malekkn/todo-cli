var fs = require('fs');
var options = process.argv.slice(2);
var command = options[0];
var string = options [1];

var tasks = fs.readFileSync('./tasks.txt','utf-8');
var help = fs.readFileSync('./help.txt','utf-8');

switch(command) {
	case 'help': default :
		showHelp();
		break;
	case 'list':
		listAll();
		break;
	case 'add':
		addTask(string);
		break;
	case 'reset':
		reset();
		break;	
}





function showHelp(){
	console.log(help);
}

function addTask(string){
 	fs.appendFile('tasks.txt', '\n'+string , (err) => {
  	if (err) throw err; 
  });

}
function listAll(){
	console.log(tasks);
}
function reset(){
	fs.writeFile('./tasks.txt','', function (err) {
        if (err) {
            return console.log("Error writing file: " + err);
        }
    });
}