DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS addresses CASCADE;
DROP TABLE IF EXISTS images CASCADE;
DROP TABLE IF EXISTS userFollows CASCADE;
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS copies CASCADE;


CREATE TABLE users (
  PRIMARY KEY (userId),
  userId        SERIAL,
  email         VARCHAR(40)   NOT NULL UNIQUE,
  passwordHash  VARCHAR(60)   NOT NULL,
  cpf           VARCHAR(11)   NOT NULL UNIQUE,
  fullName      VARCHAR(60)   NOT NULL,
  birthDate     DATE          NOT NULL,
  phone         VARCHAR(13)   UNIQUE,
  profilePic    INTEGER,
  createdAt     TIMESTAMP     NOT NULL,
  updatedAt     TIMESTAMP     NOT NULL
);


CREATE TABLE addresses (
  PRIMARY KEY (userId),
  userId        INTEGER,
  city          VARCHAR(60)   NOT NULL,
  district      CHAR(2)       NOT NULL,
  postalCode    CHAR(8)       NOT NULL,
  street        VARCHAR(40),
  houseNumber   VARCHAR(6),
  FOREIGN KEY (userId) REFERENCES users (userId)
    ON DELETE NO ACTION ON UPDATE CASCADE
);


CREATE TABLE images (
  PRIMARY KEY (imageId),
  imageId       SERIAL,
  uploaderId    INTEGER       NOT NULL,
  cloudImage    VARCHAR(200)  NOT NULL,
  createdAt     TIMESTAMP     NOT NULL,
  updatedAt     TIMESTAMP     NOT NULL,
  FOREIGN KEY (uploaderId) REFERENCES users (userId)
    ON DELETE NO ACTION ON UPDATE CASCADE
);


ALTER TABLE users ADD CONSTRAINT users_profilepic_fkey
  FOREIGN KEY (profilePic) REFERENCES images (imageId);


CREATE TABLE userFollows (
  PRIMARY KEY (followerId, followedId),
  followerId    INTEGER       NOT NULL,
  followedId    INTEGER       NOT NULL,
  FOREIGN KEY (followerId) REFERENCES users (userId)
    ON DELETE NO ACTION ON UPDATE CASCADE,
  FOREIGN KEY (followedId) REFERENCES users (userId)
    ON DELETE NO ACTION ON UPDATE CASCADE
);


CREATE TABLE books (
  PRIMARY KEY (bookId),     
  bookId        SERIAL,
  title         VARCHAR(200)  NOT NULL,
  author        VARCHAR(60)   NOT NULL,
  isbn          VARCHAR(13)   NOT NULL UNIQUE,
  publisher     VARCHAR(60),
  editionNumber INTEGER,
  pubYear       INTEGER,
  bookLanguage  VARCHAR(30)   NOT NULL,
  coverPic      VARCHAR(200),
  createdAt     TIMESTAMP     NOT NULL,
  updatedAt     TIMESTAMP     NOT NULL
);


CREATE TABLE copies (
  PRIMARY KEY (copyId),
  copyId        SERIAL,
  ownerId       INTEGER       NOT NULL,
  bookId        INTEGER       NOT NULL,
  condition     VARCHAR(30)   NOT NULL,
  available     BOOLEAN       NOT NULL DEFAULT TRUE,
  createdAt     TIMESTAMP     NOT NULL,
  updatedAt     TIMESTAMP     NOT NULL,
  FOREIGN KEY (ownerId) REFERENCES users (userId)
    ON DELETE NO ACTION ON UPDATE CASCADE,
  FOREIGN KEY (bookId) REFERENCES books (bookId)
    ON DELETE NO ACTION ON UPDATE CASCADE
);


-- CREATE TABLE chat (
--   chatId SERIAL,
--   createdAt TIMESTAMP,
--   updatedAt TIMESTAMP,
--   PRIMARY KEY (chatId)
-- );


-- CREATE TABLE chatUser (
--   chatId INTEGER,
--   userId INTEGER,
--   FOREIGN KEY (chatId) REFERENCES chat (chatId),
--   FOREIGN KEY (userId) REFERENCES users (userId)
-- );


-- CREATE TABLE chatMessage (
--   chatMessageId SERIAL,
--   chatId INTEGER,
--   senderId INTEGER,
--   body TEXT NOT NULL,
--   createdAt TIMESTAMP,
--   updatedAt TIMESTAMP,
--   PRIMARY KEY (chatMessageId),
--   FOREIGN KEY (chatId) REFERENCES chat (chatId),
--   FOREIGN KEY (senderId) REFERENCES users (userId)
-- );


-- CREATE TABLE copyPic (
--   copyId INTEGER,
--   copyPic VARCHAR(200),
--   FOREIGN KEY (copyId) REFERENCES copys (copyId)
-- );


-- CREATE TABLE swap (
--   swapId SERIAL,
--   category VARCHAR(60),
--   endAt TIMESTAMP,
--   createdAt TIMESTAMP,
--   updatedAt TIMESTAMP,
--   PRIMARY KEY(swapId)
-- );


-- CREATE TABLE swapUser (
--   swapId INTEGER,
--   userId INTEGER,
--   FOREIGN KEY (swapId) REFERENCES swap(swapId),
--   FOREIGN KEY (userId) REFERENCES users(userId)
-- );


-- CREATE TABLE swapCopy (
--   swapId INTEGER,
--   copyId INTEGER,
--   FOREIGN KEY (swapId) REFERENCES swap(swapId),
--   FOREIGN KEY (copyId) REFERENCES copys(copyId)
-- );
