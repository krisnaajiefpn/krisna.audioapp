const express = require('express')
const router = express.Router()
const db = require('../db')
const { sendRes } = require('../helpers/functionHelper')

// Core audio query is used by multiple endpoints
async function getAudioList() {
    const result = await db.query(`
        SELECT
            a.id,
            a.title,
            a.network_id,
            a.mformat,
            a.channel_id,
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
        ORDER BY a.id
    `)
    // const result = await db.query(`
    //     SELECT DISTINCT ON (a.id)
    //         a.id,
    //         a.title,
    //         a.network_id,
    //         a.mformat,
    //         a.channel_id,
    //         p.id AS promotion_id,
    //         p.priority,
    //         p.version,
    //         p.start_at,
    //         p.end_at
    //     FROM audio a
    //     LEFT JOIN promotions p 
    //         ON p.audio_id = a.id
    //         AND p.visible = true
    //         AND p.deleted_at IS NULL
    //         AND NOW() BETWEEN p.start_at AND p.end_at

    //     WHERE a.deleted_at IS NULL
    //     ORDER BY 
    //         p.priority DESC,
    //         p.version DESC,
    //         p.created_at DESC
        
    // `)

    return result.rows.map(row=> ({
        id: row.id,
        title: row.title,
        network_id: row.network_id,
        mformat: row.mformat,
        channel_id: row.channel_id,
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
        sendRes(res, 200, "Success Get All Audio List", data)

    } catch (error) {
        console.error(error)
        sendRes(res, 500, "Failed to retrieve Audio List")
    }
})

// AUDIO LIST + ACIVE PROMO
router.get('/active', async (req,res)=>{
    console.log('MASUP-ACT')
    try {
        
        const data = await getAudioList()
        const active = data.filter(a => a.has_promo)

        sendRes(res, 200, "Success Get Audio + Active Promo", active)

    } catch (error) {
        console.error(error)
        sendRes(res, 500, "Failed to retrieve Audio List + Active Promo")
    }
})

module.exports=router
