var examslist = document.getElementById('examslist')

var exams = []

function createExamList() {
    exams.forEach(exam => {
        var li = document.createElement('li')
        var seconds_left = Math.floor(((exam.date - new Date()) / 1000) % 60)
        var minutes_left = Math.floor(((exam.date - new Date()) / 60000) % 60)
        var hours_left = Math.floor((exam.date - new Date()) / 3600000)
        li.className = 'examElement active'
        if (exam.date < new Date()) {
            minutes_left = hours_left = 0;
            li.className = 'examElement past'
        }

        var date = exam.date.toLocaleDateString() + ' ' + exam.date.toLocaleTimeString()

        li.textContent = exam.name + ' - Time left: ' + hours_left + ' hours - ' + minutes_left + ' minutes - ' + seconds_left + ' seconds - ' + date
        li.addEventListener('click', function () {
            promptForRemoval(exam.name)
        });

        examslist.appendChild(li)
    })
}

function saveExams() {
    exams.sort((a, b) => a.date - b.date)
    localStorage.setItem('exams', JSON.stringify(exams))
}

function loadExams() {
    exams = JSON.parse(localStorage.getItem('exams'))
    if (exams == null) {
        exams = []
        return
    }
    exams.forEach(exam => {
        exam.date = new Date(Date.parse(exam.date))
    })
}

function addExam() {
    var name = document.getElementById('examname').value
    var date = document.getElementById('examdate').value
    date = date.split('/')
    date = date.map((date) => parseInt(date))

    var time = document.getElementById('examtime').value
    var hours = parseInt(time.split(':')[0])
    var minutes = parseInt(time.split(':')[1])
    hours = (time.split(' ')[1] == 'pm') ? hours + 12 : hours
    hours = (hours == 12 || hours == 24) ? hours - 12 : hours

    date = new Date(date[2], date[1] - 1, date[0], hours, minutes, 0)
    exams.push({ name: name, date: date })
    saveExams()
    updateExams()
}


function promptForRemoval(examName) {
    var remove = confirm("Do you want to remove " + examName + " from the list?");
    if (remove) {
        removeExam(examName);
    }
}


function removeExam(examName) {

    exams.forEach((exam, index) => {
        if (exam.name === examName) {
            exams.splice(index, 1);
        }
    })
    saveExams();
    updateExams();
}

function updateExams() {
    examslist.innerHTML = ''
    createExamList(exams)
}

function main() {

    loadExams()
    createExamList()

    setInterval(() => {
        updateExams()
    }, 5000)
}


main()
