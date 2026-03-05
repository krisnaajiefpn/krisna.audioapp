CREATE TABLE IF NOT EXISTS audio (
	id SERIAL PRIMARY KEY,
	title VARCHAR(200),
	network_id INT,
	mformat VARCHAR(50),
	channel_id INT,
	deleted_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS promotions (
	ID SERIAL PRIMARY KEY,
	audio_id INT,
	network_id INT,
	mformat VARCHAR(50),
	channel_id INT,
	priority INT,
	version INT,
	visible BOOLEAN,
	start_at TIMESTAMP,
	end_at TIMESTAMP,
	created_at TIMESTAMP DEFAULT NOW(),
	deleted_at TIMESTAMP,

    CONSTRAINT fk_audio
    FOREIGN KEY (audio_id)
    REFERENCES audio(id)
);