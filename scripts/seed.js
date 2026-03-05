const fs = require('fs')
const path = require('path')
const db = require('../db')

async function seed() {
    try {
        const sql = fs.readFileSync(
            path.join(__dirname, "../seeders/seed.sql"),
            "utf8"
        )

        await db.query(sql)
        console.log("Seeding completed")
        process.exit()

    } catch (error) {
        
        console.error("Seeding Failed:", error)
        process.exit(1)
    }
}

seed()