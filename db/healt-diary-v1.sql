DROP DATABASE IF EXISTS HealthDiary;

CREATE DATABASE HealthDiary;

USE HealthDiary;

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_level VARCHAR(10) NOT NULL DEFAULT 'regular'
);

CREATE TABLE DiaryEntries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    entry_date DATE NOT NULL,
    mood VARCHAR(50),
    weight DECIMAL(5,2),
    sleep_hours INT,
    notes TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Comment (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    entry_id INT NOT NULL,
    user_id INT NOT NULL,
    comment VARCHAR(600),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (entry_id) REFERENCES DiaryEntries(entry_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Likes (
    like_id INT AUTO_INCREMENT PRIMARY KEY,
    entry_id INT NOT NULL,
    user_id INT NOT NULL,
    likes INT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (entry_id) REFERENCES DiaryEntries(entry_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Iserting multiple user rows at once
INSERT INTO Users (username, password, email, user_level) VALUES
  ('johndoe', 'temp-pw-1', 'johndoe@example.com', 'regular'),
  ('janedoe', 'temp-pw-2', 'janedoe@example.com', 'admin'),
  ('mike_smith', 'temp-pw-3', 'mike@example.com', 'moderator');

  INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes, created_at) VALUES
  (1, '2024-01-10', 'Happy', 70.5, 8, 'Had a great day, felt energetic', '2024-01-10 20:00:00'),
  (1, '2024-01-11', 'Tired', 70.2, 6, 'Long day at work, need rest', '2024-01-11 20:00:00'),
  (2, '2024-01-10', 'Stressed', 65.0, 7, 'Busy day, a bit stressed out', '2023-01-10 21:00:00');

  INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes, created_at) VALUES
  (1, '2024-01-10', 'Happy', 70.5, 8, 'Had a great day, felt energetic', '2024-01-10 20:00:00'),
  (1, '2024-01-11', 'Tired', 70.2, 6, 'Long day at work, need rest', '2024-01-11 20:00:00'),
  (2, '2024-01-10', 'Stressed', 65.0, 7, 'Busy day, a bit stressed out', '2024-01-10 21:00:00');

  INSERT INTO Comment (entry_id, user_id, comment) VALUES
  (2, 3, 'So awful');

  INSERT INTO Likes (entry_id, user_id, likes) VALUES
  (1, 1, 0);

UPDATE DiaryEntries SET weight = 71 WHERE entry_id = 1;


--Testing that last one insert into query working
SELECT notes,
FROM DiaryEntries;

--Example queries in material
SELECT *
FROM DiaryEntries;

SELECT *
FROM DiaryEntries
ORDER BY created_at
DESC LIMIT 2;

SELECT *
FROM Users
WHERE created_at > '2024-01-01';

SELECT *
FROM Users, DiaryEntries;

SELECT *
FROM Users, DiaryEntries
WHERE Users.user_id = DiaryEntries.user_id;

SELECT DiaryEntries.*, Users.username
FROM DiaryEntries
JOIN Users ON DiaryEntries.user_id = Users.user_id;


--Example queries
  SELECT username, entry_date, mood, notes,
  FROM Users, DiaryEntries,
  WHERE DiaryEntries.user_id = Users.user_id;

  --Same with join

  SELECT Users.username, DiaryEntries.entry_date, DiaryEntries.mood, DiaryEntries.notes
FROM Users JOIN DiaryEntries.user_id = Users.user_id;



