INSERT INTO audios (title, network_id, mformat, channel_id, deleted_at)
VALUES
('Audio 001',1,'nature',101),
('Audio 002',1,'nature',102),
('Audio 003',2,'music',101),
('Audio 004',2,'podcast',102);

INSERT INTO promotions ( audio_id, network_id, mformat, channel_id, priority, version, visible, start_at, end_at)
VALUES
(3,1,'nature',101,10,1,true,'2026-03-05 10:00:00','2026-03-10 10:00:00'),
(3,1,'music',null,10,1,true,'2026-03-05 10:00:00','2026-03-10 10:00:00');