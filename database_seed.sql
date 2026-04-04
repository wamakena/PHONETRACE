
CREATE TABLE users(
id SERIAL PRIMARY KEY,
email TEXT,
role TEXT
);

CREATE TABLE devices(
id SERIAL PRIMARY KEY,
imei TEXT,
owner_id INT
);

CREATE TABLE reports(
id SERIAL PRIMARY KEY,
device_id INT,
status TEXT
);
