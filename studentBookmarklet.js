/* object of students */
var students = [
  /* Student Detail objects are populated here by Students.js */
  {
      "name": "",
      "classCode": "",
      "email": "",
      "github": ""
  } 
];

var surveyIdentifier = document.querySelector(".freebirdMaterialHeaderbannerPagebreakText");
var adpIdentifier = document.title;
var clockingNotesIdentifier = document.getElementById('divClockingWithNotes');

if (adpIdentifier === "ADP") {
  if (clockingNotesIdentifier.style.display !== 'none') {
    clockOutNotes();
  } else {
    getClockTimes();
  }
} else if(surveyIdentifier) {
  sessionDetails();
} else {
  studentDetails();
  storeData();
}

function clockOutNotes() {
  var myDiv = document.getElementById('dvClockInOutOverlay');
  var notesTextArea = document.getElementById('txtClockingCustomNote');
  myDiv.appendChild(createSelectList());
  var studentSelect = document.getElementById('studentSelect');

  studentSelect.onchange = function() {
    var studentVal = studentSelect.value;

    for (var i = 0; i < students.length; i++) {
      if (studentVal === students[i].name) {
        notesTextArea.value = students[i].classCode + '\r\n' + students[i].name;

        myDiv.removeChild(studentSelect);

        return;
      }
    }
  }
}

function getClockTimes() {
  var clockInString = document.querySelectorAll('#divActivities tbody tr:nth-last-child(2) td:nth-child(2)')[0].innerText;
  var clockOutString = document.querySelectorAll('#divActivities tbody tr:nth-last-child(1) td:nth-child(2)')[0].innerText;

  var inTime = {}, outTime = {};

  inTime.hours = clockInString.match(/([0-9]+):/)[1];
  inTime.minutes = clockInString.match(/:([0-9]+)/)[1];

  outTime.hours = clockOutString.match(/([0-9]+):/)[1];
  outTime.minutes = clockOutString.match(/:([0-9]+)/)[1];
  
  var surveyURL = /* Tutor Survey Google form URL goes here */
  surveyURL = surveyURL + '#' + JSON.stringify({inTime, outTime});
  window.open(surveyURL, '_blank');
}

function storeData() {
  var clock = decodeURI(window.location.hash.match(/[^#][^]+/));
  sessionStorage.setItem('clock', clock);
}

function sessionDetails() {
  var styleWrap = document.createElement("style");
  var styleCode = document.createTextNode(".quantumWizTextinputPaperinputPlaceholder{display:none;}");
  styleWrap.appendChild(styleCode);
  document.body.appendChild(styleWrap);

  var tutorName = document.querySelector(".quantumWizTextinputPaperinputInput.exportInput");

  tutorName.value = "Chapman, Stephen";
  tutorName.text = "Chapman, Stephen";
  
  var Hour = document.querySelectorAll('.quantumWizTextinputPaperinputInput.exportInput[aria-label=Hour]');
  var inHour = Hour[0];
  var outHour = Hour[1];
  
  var Minute = document.querySelectorAll('.quantumWizTextinputPaperinputInput.exportInput[aria-label=Minute]');
  var inMinute = Minute[0];
  var outMinute = Minute[1];
  
  var AM = document.querySelectorAll('.quantumWizMenuPaperselectOption[data-value=AM]');
  var inAM = AM[0];
  var outAM = AM[1];

  var PM = document.querySelectorAll('.quantumWizMenuPaperselectOption[data-value=PM]');
  var inPM = PM[0];
  var outPM = PM[1];
  
  var clock = JSON.parse(sessionStorage.getItem('clock'));

  inHour.value = clock.inTime.hours;
  inHour.text = clock.inTime.hours;

  inMinute.value = clock.inTime.minutes;
  inMinute.text = clock.inTime.minutes;

  outHour.value = clock.outTime.hours;
  outHour.text = clock.outTime.hours;

  outMinute.value = clock.outTime.minutes;
  outMinute.text = clock.outTime.minutes;

  inAM.classList.remove('isSelected');
  outAM.classList.remove('isSelected');
  inPM.classList.add('isSelected');
  outPM.classList.add('isSelected');

  inAM.setAttribute('aria-selected','false');
  outAM.setAttribute('aria-selected','false');
  inPM.setAttribute('aria-selected', 'true');
  outPM.setAttribute('aria-selected', 'true');
}	

function studentDetails() {

  /* insert styles to hide placeholders */
  var styleWrap = document.createElement("style");
  var styleCode = document.createTextNode(".quantumWizTextinputPaperinputPlaceholder{display:none;}");
  styleWrap.appendChild(styleCode);
  document.body.appendChild(styleWrap);

  /* grab div and append select */
  var myDiv = document.getElementsByClassName("freebirdFormviewerViewHeaderDescription")[0];
  myDiv.appendChild(createSelectList());

  /* grab input classes and set to variables */
  var inputClass = document.getElementsByClassName("quantumWizTextinputPaperinputInput exportInput");
  var studentClassCode = inputClass[0];
  var studentFirstLast = inputClass[1];
  var studentEmail = inputClass[2];
  var studentGithub = inputClass[3];

  /* populate student info */
  function populateStudent() {
    for (var i = 0; i < students.length; i++) {
      var studentVal = document.getElementById('studentSelect').value;
      if (studentVal == students[i].name) {
          studentFirstLast.value = (students[i].name);
          studentClassCode.value = (students[i].classCode);
          studentEmail.value = (students[i].email);
          studentGithub.value = (students[i].github);
      }
    }
  }
  
  document.getElementById("studentSelect").onchange = function() {
      populateStudent();
  };
}

function createSelectList() {
  var selectList = document.createElement("select");
  selectList.id = "studentSelect";
  
  var blank = document.createElement("option");
  selectList.appendChild(blank);

  for (var i = 0; i < students.length; i++) {
      var option = document.createElement("option");
      option.value = students[i].name;
      option.text = students[i].name;
      selectList.appendChild(option);
  }

  return selectList;
}