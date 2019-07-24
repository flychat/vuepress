//requiring path and fs modules
const path = require('path');
const fs = require('fs');

// https://stackoverflow.com/a/40896897
function flatten(lists) {
  return lists.reduce((a, b) => a.concat(b), []);
}

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath)
    .map(file => path.join(srcpath, file))
    .filter(path => fs.statSync(path).isDirectory());
}

function getDirectoriesRecursive(srcpath) {
  return [srcpath, ...flatten(getDirectories(srcpath).map(getDirectoriesRecursive))];
}



var folders = ['Life','IT']

folders.forEach(function(folder){

	var dir = '/'+folder+'/'
	//joining path of directory 
	const p1Path = path.join(__dirname, dir);

	const allfolders = getDirectoriesRecursive(p1Path)
	//console.log(allfolders);

	allfolders.forEach(function(directoryPath){
		var lastFolderName = directoryPath.replace(p1Path,'');
		if(lastFolderName=='') lastFolderName = folder
		//passsing directoryPath and callback function
		fs.readdir(directoryPath, function (err, files) {
		    //handling error
		    if (err) {
		        return console.log('Unable to scan directory: ' + err);
		    } 
		    //listing all files using forEach
		    var lists = '';
		    files.forEach(function (file) {
		        if(file != 'README.md' && !file.startsWith('_') && !file.startsWith('.')){
		        	var list = ''
		        	if(file.endsWith('.md')){
		        		list = '- [' + file.substr(0,file.length-3) + '](./'+ file + ')\n'	
		        	}else{
		        		list = '- [' + file + '/]('+ dir + file + ')\n'
		        	}
		        	lists += list
		        }
		    });
		    var noSidebar = '---\nsidebar: false\n---\n\n'
		    var contents = noSidebar + '# '+ lastFolderName + '\n\n' + lists
		    
		    var index = directoryPath+'/README.md'
		    console.log(index + ' indexed!');
		    fs.writeFile(index, contents, (err) => {
			  if (err) throw err;
			  console.log(index + ' indexed!');
			});
		});
	})


})