INSERT INTO audio (title, network_id, mformat, channel_id)
VALUES
('Audio 001',1,'music',101),
('Audio 002',1,'music',102),
('Audio 003',2,'podcast',101),
('Audio 004',2,'podcast',102),
('Audio 005',3,'music',101);

INSERT INTO promotions ( audio_id, network_id, mformat, channel_id, priority, version, visible, start_at, end_at)
VALUES
(1,1,'music',101,10,1,true,NOW() - INTERVAL '1 day',NOW() + INTERVAL '7 day'),
(3,2,'podcast',101,50,1,true,NOW() - INTERVAL '1 day',NOW() + INTERVAL '7 day');