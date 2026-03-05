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
node server.js

Server will run at

http://localhost:3000

# Database Serup

sql
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

## 2. GET Audio List + Active Promo

Returns all audio informations that have valid promotions.

Rules:
- visible = true
- promo is active between start_at and end_at
- delete is null

## 3. GET Promo List

Returns all promo informations.

## 4. CREATE Promo

Create new promo.

## 5. UPDATE Promo

Update existing promo.

## 5. DELETE Promo

Soft delete promo with delete_at value.
