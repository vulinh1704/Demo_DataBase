create database demo_database;
use demo_database;
create table product(
    id int not null primary key auto_increment,
    name varchar(100),
    price int not null ,
    description varchar(255)
)

use demo_database;
create table category(
    id int not null primary key auto_increment,
    name varchar(100) not null
);
alter table product add idCategory int not null;
alter table product add foreign key (idCategory) references category(id);