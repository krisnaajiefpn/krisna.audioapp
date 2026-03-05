# krisna.audioapp (Promotion & Scheduling Engine)

Simple REST API for manage Audio Promotions and Scheduling.
The system is define the promo active for an audio based on time, scope, priority, and version rules

# Tech Stack
- Node.js
- Express.js
- PostgreSQL
- Docker
- Postman for API Tes

---

# Project Setup

## 1. Clone Repo

bash
git clone https://github.com/krisnaajiefpn/krisna.audioapp
cd <folder>

## 2. Install Dependencies

bash
npm install


## 3. Environment Config

Already on ".env"

---

# Run Applicatinn

bash
npm run migrate
npm run seed
npm start
npm start

Server will run at

http://localhost:3000

# Database Serup

bash
CREATE TABLE audio (
	id SERIAL PRIMARY KEY,
	title VARCHAR(200),
	network_id INT,
	mformat VARCHAR(50),
	channel_id INT,
	deleted_at TIMESTAMP
)

CREATE TABLE audio (
	id SERIAL PRIMARY KEY,
	title VARCHAR(200),
	network_id INT,
	mformat VARCHAR(50),
	channel_id INT,
	deleted_at TIMESTAMP
)

---

# API ENDPOINTS

## 1. GET Audio List

Returns all audio informations.

Endpoint
bash
/GET http://localhost:3000/api/audios

Response
bash
{
    "status": 200,
    "message": "Success Get All Audio List",
    "data": [
        {
            "id": 1,
            "title": "Test",
            "network_id": 1,
            "mformat": "mp3",
            "channel_id": 101,
            "has_promo": true,
            "promo": {
                "id": 1,
                "priority": 10,
                "version": 1,
                "start_at": "2026-03-03T09:00:00.000Z",
                "end_at": "2026-03-10T09:00:00.000Z"
            }
        },
        {
            "id": 2,
            "title": "Audio 001",
            "network_id": 1,
            "mformat": "nature",
            "channel_id": 102,
            "has_promo": false,
            "promo": null
        },
        {
            "id": 3,
            "title": "Audio 002",
            "network_id": 1,
            "mformat": "nature",
            "channel_id": 103,
            "has_promo": false,
            "promo": null
        },
        {
            "id": 4,
            "title": "Audio 003",
            "network_id": 2,
            "mformat": "music",
            "channel_id": 104,
            "has_promo": false,
            "promo": null
        },
        {
            "id": 5,
            "title": "Audio 004",
            "network_id": 2,
            "mformat": "podcast",
            "channel_id": 105,
            "has_promo": false,
            "promo": null
        }
    ]
}

## 2. GET Audio List + Active Promo

Returns all audio informations that have valid promotions.

Rules:
- visible = true
- promo is active between start_at and end_at
- delete is null

Endpoint
bash
/GET http://localhost:3000/api/audios/active

Response
bash
{
    "status": 200,
    "message": "Success Get Audio + Active Promo",
    "data": [
        {
            "id": 1,
            "title": "Test",
            "network_id": 1,
            "mformat": "mp3",
            "channel_id": 101,
            "has_promo": true,
            "promo": {
                "id": 1,
                "priority": 10,
                "version": 1,
                "start_at": "2026-03-03T09:00:00.000Z",
                "end_at": "2026-03-10T09:00:00.000Z"
            }
        }
    ]
}

## 3. GET Promo List

Returns all promo informations.

Endpoint
bash
/GET http://localhost:3000/api/promotions

Response
bash
{
    "status": 200,
    "message": "Success Get List All Promo",
    "data": [
        {
            "id": 3,
            "audio_id": 4,
            "network_id": 1,
            "mformat": "music",
            "channel_id": null,
            "priority": 10,
            "version": 1,
            "visible": true,
            "start_at": "2026-03-05T09:00:00.000Z",
            "end_at": "2026-03-10T09:00:00.000Z",
            "created_at": "2026-03-05T08:32:24.959Z",
            "deleted_at": null
        },
        {
            "id": 2,
            "audio_id": 4,
            "network_id": 1,
            "mformat": "music",
            "channel_id": 101,
            "priority": 10,
            "version": 1,
            "visible": true,
            "start_at": "2026-03-05T09:00:00.000Z",
            "end_at": "2026-03-10T09:00:00.000Z",
            "created_at": "2026-03-05T08:32:24.959Z",
            "deleted_at": null
        },
        {
            "id": 1,
            "audio_id": 1,
            "network_id": 1,
            "mformat": "mp3",
            "channel_id": 101,
            "priority": 10,
            "version": 1,
            "visible": true,
            "start_at": "2026-03-03T09:00:00.000Z",
            "end_at": "2026-03-10T09:00:00.000Z",
            "created_at": "2026-03-05T06:25:59.853Z",
            "deleted_at": null
        }
    ]
}

## 4. CREATE Promo

Create new promo.

Endpoint
bash
/POST http://localhost:3000/api/promotions

Body
bash
{
    "audio_id": 4,
    "network_id": 1,
    "mformat": "podcast",
    "channel_id": 102,
    "priority": 50,
    "version": 1,
    "visible": false,
    "start_at": "2026-03-01 10:00:00",
    "end_at": "2026-03-02 10:00:00"

}

Response
bash
{
    "status": 201,
    "message": "Success Create (1) Promo"
}

## 5. UPDATE Promo

Update existing promo.

Endpoint
bash
/PUT http://localhost:3000/api/promotions/1

Body
bash
{
    "priority": 11,
    "visible": true,
    "start_at": "2026-03-05 10:00:00",
    "end_at": "2026-03-10 10:00:00"

}

Response
bash
{
    "status": 200,
    "message": "Success Update (1) Promo"
}

## 5. DELETE Promo

Soft delete promo with delete_at value.

Endpoint
bash
/DELETE http://localhost:3000/api/promotions/1

Response
bash
{
    "status": 200,
    "message": "Success Delete Promo"
}