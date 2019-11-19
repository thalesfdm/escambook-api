INSERT INTO users (email, passwordHash, cpf, fullName, birthDate, phone) VALUES
('thalesfdm@gmail.com', '$2b$10$VGwUxHhWo9rJsYOcg7z5oelyD5k/LYHJHI7sQ.KgsHb9im/1GRyku', '07700442983', 'Thales Felipe Dal Molim', '1992-07-08', '46999760268'),
('lucas.gomes@gmail.com', '$2b$10$VGwUxHhWo9rJsYOcg7z5oelyD5k/LYHJHI7sQ.KgsHb9im/1GRyku', '28980777396', 'Lucas Teixeira Gomes', '1997-05-02', '19984767443'),
('laura.ducati@hotmail.com', '$2b$10$VGwUxHhWo9rJsYOcg7z5oelyD5k/LYHJHI7sQ.KgsHb9im/1GRyku', '17265347668', 'Laura Machado Ducati', '1995-04-04', '19981053707'),
('mariacristianesantos_@gmail.com', '$2b$10$VGwUxHhWo9rJsYOcg7z5oelyD5k/LYHJHI7sQ.KgsHb9im/1GRyku', '73851093810', 'Maria Cristiane Santos', '1996-05-18', '77986047482'),
('nicolascaiocampos@hotmail.com', '$2b$10$VGwUxHhWo9rJsYOcg7z5oelyD5k/LYHJHI7sQ.KgsHb9im/1GRyku', '60241450802', 'Nicolas Caio Campos', '1991-07-15', '41994344695');

INSERT INTO images (uploaderId, cloudImage) VALUES
('1', 'https://res.cloudinary.com/escambook/image/upload/v1572642364/profilepic/sample-1-profilepic.jpg'),
('2', 'https://res.cloudinary.com/escambook/image/upload/v1572642363/profilepic/sample-2-profilepic.jpg'),
('3', 'https://res.cloudinary.com/escambook/image/upload/v1572642364/profilepic/sample-3-profilepic.jpg'),
('4', 'https://res.cloudinary.com/escambook/image/upload/v1574042719/profilepic/sample-4-profilepic.jpg'),
('5', 'https://res.cloudinary.com/escambook/image/upload/v1574113716/profilepic/sample-5-profilepic.jpg');

UPDATE users SET profilePic = '1' WHERE userId = '1';
UPDATE users SET profilePic = '2' WHERE userId = '2';
UPDATE users SET profilePic = '3' WHERE userId = '3';
UPDATE users SET profilePic = '4' WHERE userId = '4';
UPDATE users SET profilePic = '5' WHERE userId = '5';

INSERT INTO addresses (userId, city, district, postalCode, street, houseNumber) VALUES
('1', 'Realeza', 'PR', '85770000', 'Rua Belém', '2525'),
('2', 'Piracicaba', 'SP', '13405247', 'Travessa Ângelo Valler', '364'),
('3', 'Campinas', 'SP', '13015180', NULL, NULL),
('4', 'Barreiras', 'BA', '47800120', 'Rua José de Alencar', NULL),
('5', 'Colombo', 'PR', '83414640', 'Rua do Flamboyant', '586');

INSERT INTO images (uploaderId, cloudImage) VALUES
('1', 'https://res.cloudinary.com/escambook/image/upload/v1572640546/coverpic/sample-1-coverpic.jpg'),
('1', 'https://res.cloudinary.com/escambook/image/upload/v1572640547/coverpic/sample-2-coverpic.jpg'),
('1', 'https://res.cloudinary.com/escambook/image/upload/v1572640547/coverpic/sample-3-coverpic.jpg'),
('2', 'https://res.cloudinary.com/escambook/image/upload/v1572640547/coverpic/sample-4-coverpic.jpg'),
('2', 'https://res.cloudinary.com/escambook/image/upload/v1572640547/coverpic/sample-5-coverpic.jpg'),
('2', 'https://res.cloudinary.com/escambook/image/upload/v1572640547/coverpic/sample-6-coverpic.jpg'),
('2', 'https://res.cloudinary.com/escambook/image/upload/v1572640547/coverpic/sample-7-coverpic.jpg'),
('3', 'https://res.cloudinary.com/escambook/image/upload/v1572640547/coverpic/sample-8-coverpic.jpg'),
('3', 'https://res.cloudinary.com/escambook/image/upload/v1572640547/coverpic/sample-9-coverpic.jpg'),
('3', 'https://res.cloudinary.com/escambook/image/upload/v1572640547/coverpic/sample-10-coverpic.jpg'),
('1', 'https://res.cloudinary.com/escambook/image/upload/v1573872234/coverpic/sample-11-coverpic.jpg'),
('4', 'https://res.cloudinary.com/escambook/image/upload/v1574043866/coverpic/sample-12-coverpic.jpg'),
('5', 'https://res.cloudinary.com/escambook/image/upload/v1574114046/coverpic/sample-13-coverpic.jpg');

INSERT INTO books (title, author, isbn, publisher, editionNumber, pubYear, bookLanguage, coverPic) VALUES
('A República', 'Platão', '9788575568880', 'Escala', '2', '2007', 'pt-br', '6'),
('Walden', 'Henry Thoreau', '9788525420602', 'L&PM Pocket', NULL, '2010', 'pt-br', '7'),
('Na Natureza Selvagem', 'Jon Krakauer', '9788571647879', 'Companhia das Letras', '1', '1998', 'pt-br', '8'),
('O Hobbit', 'J. R. R. Tolkien', '9788578273873', 'WMF Martins Fontes', '4', '2011', 'pt-br', '9'),
('O Senhor dos Anéis: A Sociedade do Anel', 'J. R. R. Tolkien', '9788533613379', 'WMF Martins Fontes', '3', '2000', 'pt-br', '10'),
('O Senhor dos Anéis: As Duas Torres', 'J. R. R. Tolkien', '9788533613386', 'WMF Martins Fontes', '4', '2000', 'pt-br', '11'),
('O Senhor dos Anéis: O Retorno do Rei', 'J. R. R. Tolkien', '9788533613393', 'WMF Martins Fontes', '3', '2000', 'pt-br', '12'),
('Crime e Castigo', 'Fiódor Dostoiévski', '9788572325417', 'Martin Claret', '4', '2011', 'pt-br', '13'),
('Duna', 'Frank Herbert', '9788576573135', 'Editora Aleph', '2', '2017', 'pt-br', '14'),
('The Catcher in the Rye', 'J. D. Salinger', '9780316769488', 'Little Brown and Company', NULL, NULL, 'en', '15'),
('O Lobo da Estepe', 'Herman Hesse', '9788501020284', 'Editora Record', '43', '1982', 'pt-br', '16'),
('O Caso de Charles Dexter Ward', 'H. P. Lovecraft', '9788525406262', 'L&PM Pocket', NULL, '2006', 'pt-br', '17'),
('Messias de Duna', 'Frank Herbert', '9788576573821', 'Editora Aleph', '1', '2017', 'pt-br', '18');

INSERT INTO copies (ownerId, bookId, condition) VALUES
('1', '1', 'Livro velho, empoeirado'),
('1', '2', 'Um pouco amassado'),
('1', '3', 'Em boas condições'),
('1', '11', 'Em boas condições'),
('2', '4', 'Em boas condições'),
('2', '5', 'Um pouco amassado'),
('2', '6', 'Um pouco amassado'),
('2', '7', 'Um pouco amassado'),
('3', '8', 'Um pouco amassado, velho'),
('3', '9', 'Novo, em boas condições'),
('3', '10', 'Arranhado na capa'),
('4', '1', 'Páginas riscadas'),
('4', '4', 'Em boas condições'),
('4', '5', 'Em boas condições'),
('4', '6', 'Em boas condições'),
('4', '7', 'Em boas condições'),
('4', '12', 'Em boas condições'),
('5', '9', 'Novo, em boas condições'),
('5', '13', 'Novo, em boas condições');

-- SELECT s.swapId, s.category, s.situation, su.userId, sc.swapId
-- FROM swaps AS s
-- JOIN swapUsers AS su
-- ON s.swapId = su.swapId
-- JOIN swapCopies AS sc
-- ON s.swapId = sc.swapId;