const fs = require('fs');
const xlsxPopulate = require('xlsx-populate');

function readRoster() {
	return xlsxPopulate.fromFileAsync(/* Relative path to Student Records (.xlsx) goes here */).then(workbook => {
		return workbook.sheet('Roster').usedRange().value().slice(1);
	});
}

function createStudentObject(data) {

	let newStudentObject = [];

	data.forEach(student => {

		if (student[2].indexOf(',') === -1) {
			let temp;
			
			student[2] = student[2].split(' ');
			temp = student[2][0];

			student[2][0] = student[2][1];
			student[2][1] = temp;
			student[2] = student[2].join(', ');			
		}

		newStudentObject.push({
			name: student[2],
			classCode: student[0],
			email: student[3],
			github: student[4] 
		});
	});

	newStudentObject = newStudentObject.sort((a, b) => {
		if (a.name < b.name) return -1;
		else if(a.name > b.name) return 1;
		else return 0;
	});

	console.log('******New******');
	console.log(JSON.stringify(newStudentObject, null, 4));
	console.log('***************');

	return newStudentObject;

}

function updateScript(studentObject) {
	fs.readFile('./studentBookmarklet.js', 'utf-8', (err, script) => {
		let existingStudentObject = script.match(/var students =[^]*[\s]+];/)
		
		console.log('*****Existing*****');
		console.log(existingStudentObject[0]);
		console.log('******************');
		
		script = script.replace(existingStudentObject, `var students = ${JSON.stringify(studentObject, null, 4)};`);

	fs.writeFile('./studentBookmarklet.js', script, (err) => {if (err) console.error(err)});
	});
}


readRoster()
	.then(data => createStudentObject(data))
	.then(newStudentObject => updateScript(newStudentObject))



