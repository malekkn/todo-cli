var fs = require('fs');
var options = process.argv.slice(2);
var command = options[0];
var string = options[1];
var altString = options[2];

var help = fs.readFileSync('./help.txt','utf-8');
var tasks = '';

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
	case 'update':
		editTask(string , altString);
		break;
	case 'delete':
		editTask(string , altString);
		break;
	case 'reset':
		reset();
		break;	
}

function showHelp(){
	console.log(help);
}

function addTask(string){
	checkForFile();
	if(string !== undefined){
		string = string.toLowerCase();
 		fs.appendFile('tasks.txt', '\n'+string , function (err) {
        	if (err) {
				return console.log("Error writing file: " + err);
        	} 
  		});
 	}
 	else{
		console.log("please enter a task") 
	}
}

function listAll(){
	checkForFile();
	if (tasks !== ''){
		console.log(tasks);
	}
	else {
		console.log(`no toDo's yet`);
	}
}

function editTask(string , altString){
	checkForFile();
	if(string !== undefined && altString !== undefined){
		string = string.toLowerCase();
		altString = altString.toLowerCase();
		tasks = tasks.replace(string, altString);
	}else if (altString === undefined){
		tasks = tasks.replace(string +'\n' , '');
	}
	else{
		console.log("please enter a task to be deleted") 
	}	
	
fs.writeFile('./tasks.txt',tasks, function (err) {
	        if (err) {
	            return console.log("Error writing file: " + err);
	        }
	    });
}
function reset(){
	fs.writeFile('./tasks.txt','', function (err) {
        if (err) {
            return console.log("Error writing file: " + err);
        }
    });
}

function checkForFile(){
	try{
		tasks = fs.readFileSync('./tasks.txt','utf-8');
	}
	catch(error){
		if(error){
			if (error.code === 'ENOENT'){
				fs.writeFile('./tasks.txt', '','utf-8');
			}
		} else {
			console.log(error.message);
        }
    }

}