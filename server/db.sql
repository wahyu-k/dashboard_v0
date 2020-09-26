CREATE DATABASE siab

CREATE TABLE logins(
  id SERIAL PRIMARY KEY,
  username VARCHAR(20) NOT NULL,
  email VARCHAR(70) NOT NULL,
  password VARCHAR(170) NOT NULL,
  created_at VARCHAR(50) NOT NULL
)

CREATE TABLE devices(
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  user_id VARCHAR(20) NOT NULL,
  created_at VARCHAR(50) NOT NULL
)

CREATE TABLE sensors(
  id SERIAL PRIMARY KEY,
  ph REAL NOT NULL,
  tds REAL NOT NULL,
  turb REAL NOT NULL,
  temp REAL NOT NULL,
  flow REAL NOT NULL,
  device_id VARCHAR(20) NOT NULL,
  created_at VARCHAR(50) NOT NULL
)

CREATE TABLE users(
  id BIGINT PRIMARY KEY,
  first_name VARCHAR(70) ,
  last_name VARCHAR(70),
  dob VARCHAR(30),
  prov VARCHAR(50),
  region VARCHAR(50),
  plan INT NOT NULL,
  created_at VARCHAR(50) NOT NULL
)