const Database = require('./database/db')

const { subjects, weekdays, getSubject, getWeekday, convertHoursToMinutes, convertWeekdays, breakRow, raffleProffys } = require('./util/format')

//CONFIGURAR O SERVER / APLICAR / ACESSAR
function pageLanding(req, res) {
    return res.render("index.html")
}

async function pageStudy(req, res) {

    const filters = req.query

    //quantidade de proffys
    const queryAmountProffys = "SELECT id FROM proffys"
    const db = await Database
    const idAmountProffys = await db.all(queryAmountProffys)
    const amountProffys = idAmountProffys.length

    //se não usar o form
    if (!filters.subject || !filters.weekday || !filters.time) {
        //selecionar tudo
        const queryAll = `
            SELECT * FROM proffys

            INNER JOIN classes ON (classes.proffy_id = proffys.id)
            INNER JOIN class_schedule ON (class_schedule.class_id = classes.id)
        `

        try {
            const db = await Database
            const proffys = await db.all(queryAll)

            proffys.map((proffy) => {
                proffy.subject = getSubject(proffy.subject)
                proffy.weekday = getWeekday(proffy.weekday)
                proffy.time_from = parseInt(proffy.time_from/60)
                proffy.time_to = parseInt(proffy.time_to/60)
                proffy.bio = breakRow(proffy.bio)
            })

            for (const i in weekdays) {
                weekdays[i] = convertWeekdays(weekdays[i])
            }
            
            console.log(proffys)

            raffleProffys(proffys)

            return res.render("study.html", { filters, subjects, weekdays, amountProffys, proffys })

        } catch (error) {
            console.log(error)
        }
    }

    //converter horas em minutos
    const timeToMinutes = convertHoursToMinutes(filters.time)

    //se preencher todos
    const query =`
        SELECT * FROM proffys
        INNER JOIN classes ON (classes.proffy_id = proffys.id)
        INNER JOIN class_schedule ON (class_schedule.class_id = classes.id)
        WHERE EXISTS(
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = '${filters.subject}'
    `

    //caso haja erro na consulta de dados
    try {
        const db = await Database
        const proffys = await db.all(query)

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject)
            proffy.weekday = getWeekday(proffy.weekday)
            proffy.time_from = parseInt(proffy.time_from/60)
            proffy.time_to = parseInt(proffy.time_to/60)
        })

        for (const i in weekdays) {
            weekdays[i] = convertWeekdays(weekdays[i])
        }

        return res.render("study.html", { proffys, filters, subjects, weekdays, amountProffys })

    } catch (error) {
        console.log(error)
    }
}

function pageGiveClasses(req, res) {
        
    return res.render("give-classes.html", {subjects, weekdays})
    
}

async function saveClasses(req, res) {
    const createProffy = require('./database/createProffy')

    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map((weekday, index) => {

        return {
            weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }

    })

    try {
        const db = await Database
        await createProffy(db, { proffyValue, classValue, classScheduleValues })

        function convertHourToURL(time) {
            const [hour, minutes] = time.split(':')
            return (hour + '%3A' + minutes)
        }

        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + convertHourToURL(req.body.time_from[0])

        return res.render("sucess-page.html", {queryString})
        
    } catch (error) {
        console.log(error)
    }

}

function sucessPage(req, res) {
    
    return res.render("sucess-page.html")
    
}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses,
    sucessPage
}