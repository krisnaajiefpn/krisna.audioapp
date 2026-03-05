const fs = require('fs')
const path = require('path')
const db = require('../db')

async function migrate() {
    try {
        const sql = fs.readFileSync(
            path.join(__dirname, "../migrations/00001_create_tables.sql"),
            "utf8"
        )

        await db.query(sql)
        console.log("Migration completed")
        process.exit()

    } catch (error) {
        
        console.error("Migration Failed:", error)
        process.exit(1)
    }
}

migrate()