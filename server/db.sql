CREATE TABLE logins(
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(20) NOT NULL,
  email VARCHAR(70) NOT NULL,
  password VARCHAR(170) NOT NULL,
  created_at VARCHAR(50) NOT NULL,
  modified_at VARCHAR(50) NOT NULL
);

CREATE TABLE devices(
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  user_id BIGINT REFERENCES logins(id) NOT NULL,
  created_at VARCHAR(50) NOT NULL,
  modified_at VARCHAR(50) NOT NULL
);

CREATE TABLE sensors(
  id BIGSERIAL PRIMARY KEY,
  ph REAL NOT NULL,
  tds REAL NOT NULL,
  turb REAL NOT NULL,
  temp REAL NOT NULL,
  flow REAL NOT NULL,
  device_id BIGINT REFERENCES devices(id) NOT NULL,
  created_at VARCHAR(50) NOT NULL
);

CREATE TABLE users(
  id BIGINT REFERENCES logins(id),
  first_name VARCHAR(70) ,
  last_name VARCHAR(70),
  dob VARCHAR(30),
  prov VARCHAR(50),
  region VARCHAR(50),
  plan INT NOT NULL,
  created_at VARCHAR(50) NOT NULL,
  modified_at VARCHAR(50) NOT NULL
);

CREATE TABLE calcs
(
  id SERIAL PRIMARY KEY,
  x REAL NOT NULL,
  y REAL NOT NULL,
  z REAL NOT NULL,
  created_at VARCHAR(50) NOT NULL,
  modified_at VARCHAR (50) NOT NULL
);

-- DUMMY DATA
INSERT INTO devices(name, lat, lng, user_id, created_at, modified_at) VALUES('Pondok 1', 12.12, 13.13, 2, ROUND(EXTRACT(EPOCH FROM NOW()) * 1000), ROUND(EXTRACT(EPOCH FROM NOW())) * 1000);
INSERT INTO devices(name, lat, lng, user_id, created_at, modified_at) VALUES('Pondok 2', 12.13, 13.14, 2, ROUND(EXTRACT(EPOCH FROM NOW()) * 1000), ROUND(EXTRACT(EPOCH FROM NOW())) * 1000);
INSERT INTO devices(name, lat, lng, user_id, created_at, modified_at) VALUES('Pondok 3', 12.14, 13.15, 2, ROUND(EXTRACT(EPOCH FROM NOW()) * 1000), ROUND(EXTRACT(EPOCH FROM NOW())) * 1000);

INSERT INTO sensors(ph, tds, turb, temp, flow, device_id, created_at) VALUES(7.12, 80.43, 23.12, 28.43, 52.4, 1, ROUND(EXTRACT(EPOCH FROM NOW()) * 1000));
INSERT INTO sensors(ph, tds, turb, temp, flow, device_id, created_at) VALUES(7.15, 80.49, 23.13, 28.49, 42.4, 1, ROUND(EXTRACT(EPOCH FROM NOW()) * 1000));
INSERT INTO sensors(ph, tds, turb, temp, flow, device_id, created_at) VALUES(6.15, 85.49, 23.11, 27.79, 66.4, 2, ROUND(EXTRACT(EPOCH FROM NOW()) * 1000));

INSERT INTO calcs(x, y, z, created_at, modified_at) VALUES(0.5, 0.6, 0.7, ROUND(EXTRACT(EPOCH FROM NOW()) * 1000), ROUND(EXTRACT(EPOCH FROM NOW())) * 1000);