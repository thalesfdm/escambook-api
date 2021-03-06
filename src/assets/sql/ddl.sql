DROP FUNCTION IF EXISTS deleteImages() CASCADE;
DROP TRIGGER IF EXISTS onDeleteCopyPicsDeleteImages ON copyPics CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS addresses CASCADE;
DROP TABLE IF EXISTS images CASCADE;
DROP TABLE IF EXISTS userFollows CASCADE;
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS copies CASCADE;
DROP TABLE IF EXISTS copyPics CASCADE;
DROP TABLE IF EXISTS swaps CASCADE;
DROP TABLE IF EXISTS swapUsers CASCADE;
DROP TABLE IF EXISTS swapCopies CASCADE;


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
  createdAt     TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt     TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
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
  createdAt     TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt     TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
  coverPic      INTEGER,
  createdAt     TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt     TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (coverPic) REFERENCES images (imageId)
    ON DELETE NO ACTION ON UPDATE CASCADE
);


CREATE TABLE copies (
  PRIMARY KEY (copyId),
  copyId        SERIAL,
  ownerId       INTEGER       NOT NULL,
  bookId        INTEGER       NOT NULL,
  condition     VARCHAR(30)   NOT NULL,
  available     BOOLEAN       NOT NULL DEFAULT TRUE,
  createdAt     TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt     TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (ownerId) REFERENCES users (userId)
    ON DELETE NO ACTION ON UPDATE CASCADE,
  FOREIGN KEY (bookId) REFERENCES books (bookId)
    ON DELETE NO ACTION ON UPDATE CASCADE
);


CREATE TABLE copyPics (
  PRIMARY KEY (copyId, copyPic),
  copyId        INTEGER,
  copyPic       INTEGER,
  FOREIGN KEY (copyId) REFERENCES copies (copyId)
    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (copyPic) REFERENCES images (imageId)
    ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE OR REPLACE FUNCTION deleteImages()
  RETURNS TRIGGER AS $$
  BEGIN
    DELETE FROM images WHERE imageId = OLD.copyPic;
	  RETURN NULL;
  END;
$$ LANGUAGE 'plpgsql';


CREATE TRIGGER onDeleteCopyPicsDeleteImages
  AFTER DELETE ON copyPics
  FOR EACH ROW EXECUTE PROCEDURE deleteImages();


CREATE TABLE swaps (
  PRIMARY KEY (swapId),
  swapId        SERIAL,
  category      CHAR(1)       NOT NULL
    CHECK (category IN ('E', 'T')),
  situation     CHAR(1)       NOT NULL DEFAULT 'A'
    CHECK (situation IN ('A', 'C', 'I', 'F')),
  expiresAt     TIMESTAMP     NOT NULL,
  createdAt     TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt     TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE swapUsers (
  PRIMARY KEY (swapId, userId),
  swapId        INTEGER,
  userId        INTEGER,
  FOREIGN KEY (swapId) REFERENCES swaps (swapId)
    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (userId) REFERENCES users (userId)
    ON DELETE NO ACTION ON UPDATE CASCADE
);


CREATE TABLE swapCopies (
  PRIMARY KEY (swapId, copyId),
  swapId        INTEGER,
  copyId        INTEGER,
  FOREIGN KEY (swapId) REFERENCES swaps (swapId)
    ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (copyId) REFERENCES copies (copyId)
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
