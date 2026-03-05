const express = require('express')
const router = express.Router()
const db = require('../db')
const { sendRes } = require('../helpers/functionHelper')

// LIST ALL PROMO
router.get('/', async (req,res)=>{
    console.log('MASUP-PRO')
    try {
        
        const result = await db.query(`
            SELECT * FROM promotions
            WHERE deleted_at IS NULL
            ORDER BY id DESC    
        `)

        const fdata = result.rows
        sendRes(res, 200, "Success Get List All Promo", fdata)

    } catch (error) {
        console.error(error)
        sendRes(res, 500, "Failed to retrieve Audio List + Active Promo")
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

        const result = await db.query(`
            INSERT INTO promotions
            (audio_id, network_id, mformat, channel_id, priority, version, visible, start_at, end_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *`,
            [audio_id, network_id, mformat, channel_id, priority, version, visible, start_at, end_at]
        )

        // res.json(result.rows[0])
        sendRes(res, 201, "Success Create (1) Promo")

    } catch (error) {
        console.error(error)
        sendRes(res, 500, "Failed to retrieve Audio List + Active Promo")
    }
})

// UPDATE PROMOTIONS
router.put('/:id', async (req,res)=>{
    console.log('MASUP-UPPRO')
    try {
        
        const id = req.params.id
        const {
            priority,
            visible,
            start_at,
            end_at
        } = req.body

        const result = await db.query(`
            UPDATE promotions
            SET priority=$1, 
                visible=$2, 
                start_at=$3, 
                end_at=$4
            WHERE ID=$5
            RETURNING *`,
            [priority, visible, start_at, end_at, id]
        )

        // res.json(result.rows[0])
        sendRes(res, 200, "Success Update (1) Promo")

    } catch (error) {
        console.error(error)
        sendRes(res, 500, "Failed to retrieve Audio List + Active Promo")
    }
})

// DELETE PROMOTIONS
router.delete('/:id', async (req,res)=>{
    console.log('MASUP-DLPRO')
    try {
        
        const id = req.params.id

        await db.query(`
            UPDATE promotions
            SET deleted_at = NOW()
            WHERE id=$1`,
            [id]
        )

        // res.json(result.rows[0])
        sendRes(res, 200, "Success Delete Promo")

    } catch (error) {
        console.error(error)
        sendRes(res, 500, "Failed to retrieve Audio List + Active Promo")
    }
})


module.exports=router
