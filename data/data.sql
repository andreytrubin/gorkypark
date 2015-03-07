delete from user;
delete from role;

insert into role(name) values ('admin');
insert into role(name) values ('user');

insert into user(idRole, login, password, first_name, last_name, email, phone, reg_date, status_banned, dob)
values ((select idRole from role where name = 'user'), 'ayasenov', '12345', 'Andrey', 'Yasenov', 'yasenov95@mail.ru', null, '2015-03-05', 0, '1995-11-13');
