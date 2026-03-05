const express = require('express')
const router = express.Router()
const db = require('../db')

async function getAudioList() {
    const result = await db.query(`
        SELECT
            a.id,
            a.title,
            p.id AS promotion_id,
            p.priority,
            p.version,
            p.start_at,
            p.end_at
        FROM audio a
        LEFT JOIN LATERAL (
            SELECT * 
            FROM promotions p 
            WHERE
                p.audio_id = a.id
                AND p.visible = true
                AND p.deleted_at IS NULL
                AND NOW() BETWEEN p.start_at AND p.end_at
            ORDER BY 
                p.priority DESC,
                p.version DESC,
                p.created_at DESC
            LIMIT 1
        ) p ON true
        WHERE a.deleted_at IS NULL
    `)

    return result.rows.map(row=> ({
        id: row.id,
        title: row.title,
        has_promo: row.promotion_id ? true : false,
        promo: row.promotion_id 
            ? {
                id: row.promotion_id,
                priority: row.priority,
                version: row.version,
                start_at: row.start_at,
                end_at: row.end_at
            }
            : null
    }))
}

// AUDIO LIST
router.get('/', async (req,res)=>{
    console.log('MASUP')
    try {
        
        const data = await getAudioList()
        res.json(data)

    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

// AUDIO LIST + ACIVE PROMO
router.get('/active', async (req,res)=>{
    console.log('MASUP-ACT')
    try {
        
        const data = await getAudioList()
        const active = data.filter(a => a.has_promo)
        res.json(active)

    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

module.exports = router
