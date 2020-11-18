module.exports = async function(db, { proffyValue, classValue, classScheduleValues }) {
    //insert data into the proffys table ------
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            '${proffyValue.bio}'
        );
    `)
    //get the proffy ID
    const proffy_id = insertedProffy.lastID

    //insert data into the classes table ------
    const insertedClass = await db.run(`
        INSERT INTO classes (
            subject,
            cost,
            proffy_id
        ) VALUES (
            "${classValue.subject}",
            "${classValue.cost}",
            "${proffy_id}"
        );
    `)
    //get the classes ID
    const class_id = insertedClass.lastID

    //insert data into the class_schedule table
    const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValue) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );
        `)
    })
    
    await Promise.all(insertedAllClassScheduleValues)
    
    //here I will execute all the db.runs () of the class_schedules
}