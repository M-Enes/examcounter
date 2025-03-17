var examslist = document.getElementById('examslist')

var exams = [
    { name: 'Physics 2', date: new Date(2025, 2, 18, 17, 0, 0) },
    { name: 'Calculus 2', date: new Date(2025, 2, 20, 17, 0, 0) },
    { name: 'Programming Languages', date: new Date(2025, 2, 20, 13, 0, 0) },
    { name: 'Data Structures', date: new Date(2025, 2, 24, 11, 0, 0) },
]

function createExamList(exams) {
    exams.forEach(exam => {
        var li = document.createElement('li')
        var seconds_left = (((exam.date - new Date()) / 1000) % 60).toFixed(0)
        var minutes_left = (((exam.date - new Date()) / 60000) % 60).toFixed(0)
        var hours_left = ((exam.date - new Date()) / 3600000).toFixed(0)
        if (exam.date < new Date()) {
            minutes_left = hours_left = 0;
        }
        li.textContent = exam.name + ' - Time left: ' + hours_left + ' hours - ' + minutes_left + ' minutes - '+ seconds_left + ' seconds - ' + exam.date.toLocaleString()
        li.style.color = exam.date < new Date() ? 'gray' : 'black'
        li.style.fontWeight = exam.date < new Date() ? 'normal' : 'bold'
        li.style.textDecoration = exam.date < new Date() ? 'line-through' : 'none'
        li.style.fontSize = exam.date < new Date() ? '1em' : '2.5em'
    
        examslist.appendChild(li)
    })
}

exams.sort((a, b) => a.date - b.date)
createExamList(exams)

setInterval(() => {
    examslist.innerHTML = ''
    createExamList(exams)
}, 5000)

