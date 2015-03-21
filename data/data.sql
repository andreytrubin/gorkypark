delete from User;
delete from Role;
delete from Attraction;

INSERT INTO Role (name) VALUES ('user');
INSERT INTO Role (name) VALUES ('admin');



INSERT INTO User (idRole, login, password, first_name, last_name, email, phone, reg_date, status_banned, dob, salt) 
VALUES ((select idRole from Role where name = 'user'), 'ayasenov', '123', 'Andrey', 'Yasenov', 'yasenov95@mail.ru', '0507224531', '2015-03-07', 0, '1995-11-13', '');
INSERT INTO Attraction (title, description, prod_country, places, att_picture, price_adult, price_child) 
VALUES ('Колесо обозрения', 'Колесо обозрения поможет вам обозреть город', 'Украина', 100, '0x010203040506', 25, 15);
INSERT INTO Attraction (title, description, prod_country, places, att_picture, price_adult, price_child) 
VALUES ('Катапульта', 'катапульта катапультирует вверх', 'Украина', 2, '0x010203040506', 80, 80);


