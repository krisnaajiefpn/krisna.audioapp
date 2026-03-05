const express = require('express')
const router = express.Router()
const db = require('../db')

// LIST ALL PROMO
router.get('/', async (req,res)=>{
    console.log('MASUP-PRO')
    try {
        
        const result = await db.query(`
            SELECT * FROM promotions
            WHERE deleted_at IS NULL
            ORDER BY id DESC    
        `)

        res.json(result.rows)

    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

// CREATE PROMOTIONS
router.post('/', async (req,res)=>{
    console.log('MASUP-CRPRO')
    try {
        
       const {
        audio_id,
        network_id,
        mformat,
        channel_id,
        priority,
        version,
        visible,
        start_at,
        end_at
       } = req.body

       const result = await db.query(
        `INSERT INTO promotions
        (audio_id, network_id, mformat, channel_id, priority, version, visible, start_at, end_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *`,
        [audio_id, network_id, mformat, channel_id, priority, version, visible, start_at, end_at]
       )

       res.json(result.rows[0])

    } catch (error) {
        res.status(500).json({error:error.message})
    }
})


module.exports = router
