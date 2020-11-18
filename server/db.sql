CREATE TABLE logins(
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(20) NOT NULL,
  email VARCHAR(70) NOT NULL,
  password VARCHAR(170) NOT NULL,
  created_at BIGINT NOT NULL,
  modified_at BIGINT NOT NULL
);

CREATE TABLE devices(
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  created_at BIGINT NOT NULL,
  modified_at BIGINT NOT NULL
);

CREATE TABLE sensors(
  id BIGSERIAL PRIMARY KEY,
  ph REAL,
  tds REAL,
  turb REAL,
  temp REAL,
  flow REAL,
  device_id BIGINT REFERENCES devices(id) NOT NULL,
  created_at BIGINT NOT NULL
);

CREATE TABLE users(
  id BIGINT REFERENCES logins(id),
  first_name VARCHAR(70) ,
  last_name VARCHAR(70),
  dob VARCHAR(30),
  prov VARCHAR(50),
  region VARCHAR(50),
  plan INT NOT NULL,
  created_at BIGINT NOT NULL,
  modified_at BIGINT NOT NULL
);

CREATE TABLE calcs
(
  id SERIAL PRIMARY KEY,
  x REAL NOT NULL,
  y REAL NOT NULL,
  z REAL NOT NULL,
  created_at BIGINT NOT NULL,
  modified_at BIGINT NOT NULL
);

CREATE TABLE prices
(
  id BIGSERIAL PRIMARY KEY,
  price REAL NOT NULL,
  device_id_list BIGINT[],
  created_at BIGINT NOT NULL,
  modified_at BIGINT NOT NULL
);

CREATE TABLE binds(
  user_id BIGINT REFERENCES logins(id) PRIMARY KEY NOT NULL,
  primary_dev_id BIGINT,
  device_id BIGINT[]
);

CREATE TABLE bills(
  id SERIAL PRIMARY KEY,
  device_id BIGINT REFERENCES devices(id),
  daily_flow REAL,
  daily_bill REAL,
  payment REAL,
  created_at BIGINT NOT NULL
);

CREATE TABLE dash(
  id SERIAL PRIMARY KEY,
  nominal REAL NOT NULL,
  title VARCHAR (100) NOT NULL
);

CREATE TABLE simplesol(
  checked SERIAL PRIMARY KEY,
  solution VARCHAR (1000) NOT NULL
);

CREATE TABLE notifs(
  id SERIAL PRIMARY KEY,
  device_id BIGINT REFERENCES devices(id),
  msg VARCHAR(100) NOT NULL,
  prevent BOOLEAN,
  prevent_msg VARCHAR(100),
  created_at BIGINT NOT NULL
);

-- DUMMY DATA

-- LOGINS TABLE
INSERT INTO logins(username, email, password, created_at, modified_at) VALUES('admin', 'admin@siagaairbersih.com', '$2b$07$4IgftelgOEHon2Y5.GIsfuFqg2QFk/VZh/LNviN5.KmJSMM12W/jq', ROUND(EXTRACT(EPOCH FROM NOW()) * 1000), ROUND(EXTRACT(EPOCH FROM NOW())) * 1000);
INSERT INTO logins(username, email, password, created_at, modified_at) VALUES('test', 'test@siagaairbersih.com', '$2b$07$B6mJq5YiCrEM4jCFmhpUYe4l4CRYiwbAC7zWlVM5lOskvu/lcuZ4a', ROUND(EXTRACT(EPOCH FROM NOW()) * 1000), ROUND(EXTRACT(EPOCH FROM NOW())) * 1000);
INSERT INTO logins(username, email, password, created_at, modified_at) VALUES('premium', 'premium@siagaairbersih.com', '$2b$07$QXn.jXQxFA7e4Ru9pS3oWOlSgHiDQGNbCzTPiJ9tsKuWqf5SSUx82', ROUND(EXTRACT(EPOCH FROM NOW()) * 1000), ROUND(EXTRACT(EPOCH FROM NOW())) * 1000);
INSERT INTO logins(username, email, password, created_at, modified_at) VALUES('pengelola', 'pengelola@siagaairbersih.com', '$2b$07$/TJeNoiUh5/UwD0rAz79QuuMqQtcEsxhRehW9mrX6RaJeEbTsTKX2', ROUND(EXTRACT(EPOCH FROM NOW()) * 1000), ROUND(EXTRACT(EPOCH FROM NOW())) * 1000);


-- USERS TABLE
INSERT INTO users(id, first_name, last_name, dob, prov, region, plan, created_at, modified_at) VALUES(1, 'Admin', 'SIAB', '', 'Jawa Tengah', 'Surakarta', 7, ROUND(EXTRACT(EPOCH FROM NOW()) * 1000), ROUND(EXTRACT(EPOCH FROM NOW())) * 1000);
INSERT INTO users(id, first_name, last_name, dob, prov, region, plan, created_at, modified_at) VALUES(2, 'Free', 'User', '', 'Jawa Tengah', 'Klaten', 0, ROUND(EXTRACT(EPOCH FROM NOW()) * 1000), ROUND(EXTRACT(EPOCH FROM NOW())) * 1000);
INSERT INTO users(id, first_name, last_name, dob, prov, region, plan, created_at, modified_at) VALUES(3, 'Premium', 'User', '', 'Jawa Tengah', 'Semarang', 1, ROUND(EXTRACT(EPOCH FROM NOW()) * 1000), ROUND(EXTRACT(EPOCH FROM NOW())) * 1000);
INSERT INTO users(id, first_name, last_name, dob, prov, region, plan, created_at, modified_at) VALUES(4, 'Pengelola', 'User', '', 'Jawa Tengah', 'Semarang', 2, ROUND(EXTRACT(EPOCH FROM NOW()) * 1000), ROUND(EXTRACT(EPOCH FROM NOW())) * 1000);

-- DEVICE TABLE
INSERT INTO devices(name, lat, lng, created_at, modified_at) VALUES('Cawengkal 1', -7.307236, 110.622135,  ROUND(EXTRACT(EPOCH FROM NOW()) * 1000), ROUND(EXTRACT(EPOCH FROM NOW())) * 1000);
INSERT INTO devices(name, lat, lng, created_at, modified_at) VALUES('Cawengkal 2', -7.3073592, 110.622243,  ROUND(EXTRACT(EPOCH FROM NOW()) * 1000), ROUND(EXTRACT(EPOCH FROM NOW())) * 1000);
INSERT INTO devices(name, lat, lng, created_at, modified_at) VALUES('Cawengkal 3', -7.307134, 110.6224333,  ROUND(EXTRACT(EPOCH FROM NOW()) * 1000), ROUND(EXTRACT(EPOCH FROM NOW())) * 1000);

-- SENSORS TABLE
INSERT INTO sensors(ph, tds, turb, temp, flow, device_id, created_at) VALUES(7.12, 80.43, 23.12, 28.43, 1.4, 1, ROUND(EXTRACT(EPOCH FROM NOW()) * 1000));
INSERT INTO sensors(ph, tds, turb, temp, flow, device_id, created_at) VALUES(7.15, 80.49, 23.13, 28.49, 1.7, 1, ROUND(EXTRACT(EPOCH FROM NOW()) * 1000));
INSERT INTO sensors(flow, device_id, created_at) VALUES(2.9, 2, ROUND(EXTRACT(EPOCH FROM NOW()) * 1000));
INSERT INTO sensors(flow, device_id, created_at) VALUES(3.1, 2, ROUND(EXTRACT(EPOCH FROM NOW()) * 1000));
INSERT INTO sensors(flow, device_id, created_at) VALUES(4.4, 3, ROUND(EXTRACT(EPOCH FROM NOW()) * 1000));
INSERT INTO sensors(flow, device_id, created_at) VALUES(6.7, 3, ROUND(EXTRACT(EPOCH FROM NOW()) * 1000));

-- COMPARISON TABLE
INSERT INTO calcs(x, y, z, created_at, modified_at) VALUES(0.5, 0.6, 0.7, ROUND(EXTRACT(EPOCH FROM NOW()) * 1000), ROUND(EXTRACT(EPOCH FROM NOW())) * 1000);

-- PRICES TABLE
INSERT INTO prices(price, device_id_list, created_at, modified_at) VALUES(1100, ARRAY[1, 2, 3], ROUND(EXTRACT(EPOCH FROM NOW()) * 1000), ROUND(EXTRACT(EPOCH FROM NOW())) * 1000);

-- BILLS TABLE
INSERT INTO bills(device_id, daily_flow, daily_bill, payment, created_at) VALUES(2, 1, 1100, 0, ROUND(EXTRACT(EPOCH FROM NOW()) * 1000));
INSERT INTO bills(device_id, daily_flow, daily_bill, payment, created_at) VALUES(2, 0, 0, 1000, ROUND(EXTRACT(EPOCH FROM NOW()) * 1000));
INSERT INTO bills(device_id, daily_flow, daily_bill, payment, created_at) VALUES(3, 2.5, 2750, 0, ROUND(EXTRACT(EPOCH FROM NOW()) * 1000));
INSERT INTO bills(device_id, daily_flow, daily_bill, payment, created_at) VALUES(3, 1.5, 1650, 0, ROUND(EXTRACT(EPOCH FROM NOW()) * 1000));
INSERT INTO bills(device_id, daily_flow, daily_bill, payment, created_at) VALUES(3, 0, 0, 1000, ROUND(EXTRACT(EPOCH FROM NOW()) * 1000));
INSERT INTO bills(device_id, daily_flow, daily_bill, payment, created_at) VALUES(3, 5.5, 2750, 0, ROUND(EXTRACT(EPOCH FROM NOW()) * 1000));
INSERT INTO bills(device_id, daily_flow, daily_bill, payment, created_at) VALUES(3, 7.5, 1650, 0, ROUND(EXTRACT(EPOCH FROM NOW()) * 1000));
INSERT INTO bills(device_id, daily_flow, daily_bill, payment, created_at) VALUES(3, 3, 0, 1000, ROUND(EXTRACT(EPOCH FROM NOW()) * 1000));
INSERT INTO bills(device_id, daily_flow, daily_bill, payment, created_at) VALUES(3, 5, 2750, 0, ROUND(EXTRACT(EPOCH FROM NOW()) * 1000));
INSERT INTO bills(device_id, daily_flow, daily_bill, payment, created_at) VALUES(3, 7, 1650, 0, ROUND(EXTRACT(EPOCH FROM NOW()) * 1000));
INSERT INTO bills(device_id, daily_flow, daily_bill, payment, created_at) VALUES(3, 3.12, 0, 1000, ROUND(EXTRACT(EPOCH FROM NOW()) * 1000));

-- SIMPLE SOLUTION TABLE
INSERT INTO simplesol(solution) VALUES('Air yang berwarna kuning pada umumnya disebabkan oleh kandungan logam Fe yang berlebih. Keadaan tersebut dapat di antisipasi dengan melakukan aerasi (mengalirkan gas oksigen ke dalam tempat penampungan air) yang dilanjutkan dengan pengendapan air selama satu hari satu malam. Akan tetapi, hal tersebut harus diimbangi dengan pembersihan tempat penampungan air secara rutin (Wiyono dkk., 2017)');
INSERT INTO simplesol(solution) VALUES('Kerak pada kran menunjukkan bahwa air mengandung mineral. Jika hal tersebut tidak segera diatasi maka air sadah secara perlahan akan menyumbat pipa air, memperpendek pipa masa pakai pipa, dan menurunkan tekanan air. Jika kerak yang terbentuk masih sedikit dan pipa air masih berfungsi dengan baik, maka Anda bisa mengatasinya dengan cara menggosokkan cuka atau bahan pembersih abrasif seperti baking powder ke alat rumah tangga atau kran yang berkerak, merebus air sampai mendidih dan mendiamkan air tersebut selama satu haru satu malam sebelum digunakan untuk konsumsi, dan menggunakan filter dengan yang menggunakan komponen resin kation (Said dan Ruliasih, 2007)');
INSERT INTO simplesol(solution) VALUES('Rasa yang timbul pada air dapat disebabkan oleh adanya mineral dalam air tersebut, rasa yang menyebabkan konsumen air tidak nyaman dapat dihilangkan dengan memanfaatkan karbon aktif pada toren atau memasangkan filter karbon aktif pada system perpipaan sebelum air masuk ke toren (Surest dkk., 2010)');
INSERT INTO simplesol(solution) VALUES('Air yang keruh dapat disebabkan karena TDS (Total Dissolved Solids) yang berlebih pada air. Hal tersebut dapat disiasati dengan melakukan penyaringan air secara sederhana yang memanfaatkan sabut kelapa, karbon aktif, dan kain yang dilapiskan pada spons. Ketiga material terebut dapat disusun secara pada tempat penampungan air (toren) sehingga air yang mengalir ke kran sudah tersaring (Yudi Ayunanta, 2019)');

--INSERT NOTIF TABLE
INSERT INTO notifs(device_id, msg, prevent, prevent_msg, created_at) VALUES(2, 'Listrik nonaktif!', FALSE, '', ROUND(EXTRACT(EPOCH FROM NOW()) * 1000));
INSERT INTO notifs(device_id, msg, prevent, prevent_msg, created_at) VALUES(2, 'Listrik nonaktif!', FALSE, '', (ROUND(EXTRACT(EPOCH FROM NOW()) * 1000) + 3210));
INSERT INTO notifs(device_id, msg, prevent, prevent_msg, created_at) VALUES(3, 'Listrik nonaktif!', FALSE, '', (ROUND(EXTRACT(EPOCH FROM NOW()) * 1000) + 3210));
