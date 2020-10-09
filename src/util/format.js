//DATAS
const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

//FUNCTIONALITIES
function getSubject(subjectNumber) {
    const position = +subjectNumber - 1
    return subjects[position]
}

function getWeekday(weekdayNumber) {
    return weekdays[weekdayNumber]
}

function convertHoursToMinutes(time) {
    const [hour, minutes] = time.split(':')
    return (Number(hour) * 60) + Number(minutes)
}

function raffleProffys(proffys) {
    for (let i = 0; i < proffys.length; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        [proffys[i], proffys[j]] = [proffys[j], proffys[i]];
    }
}

function convertWeekdays(weekday) {
    const [day, outhers] = weekday.split('-')
    return day
}

function breakRow(bio) {
    let a = []
    a.push(bio.replace('\r\n'))
    for (let i in a) {
        return a[i] += '<br>'
    }
    //bio.replace(/\\n/g, '<br>')
}

//EXPORT
module.exports = {
    subjects,
    weekdays,
    getSubject,
    getWeekday,
    convertHoursToMinutes,
    raffleProffys,
    convertWeekdays,
    breakRow
}