create database if not exists ezbudget;
use ezbudget;

create table if not exists accounts (
    uid varchar(36) not null default (UUID()),
    label varchar(100) not null,
    main bool not null DEFAULT 0,
    balance float not null default 0,
    primary key (uid)
);

create table if not exists movements(
	uid varchar(36) not null default (uuid()),
  origin_account_uid varchar(36) not null,
  destination_account_uid varchar(36) not null,
  value float not null,
  primary key (uid)
);

create table if not exists categories(
  uid varchar(36) not null default (uuid()),
  label varchar(150) not null,
  sort_order int not null default 0,
  color varchar(8) default null,
  primary key (uid)
);

create table if not exists income(
  uid varchar(36) not null default (uuid()),
  label varchar(150) not null,
  value float not null,
  category_uid varchar(36) default null,
  due_date date not null,
  paid_date date default null,
  primary key (uid)
);

create table if not exists expenses(
  uid varchar(36) not null default (uuid()),
  label varchar(150) not null,
  value float not null,
  category_uid varchar(36) default null,
  due_date date not null,
  paid_date date default null,
  installment_no int default null,
  installment_of int default null,
  primary key (uid)
);

/**************************************************************************/

create user if not exists 'ezbudget'@'localhost' identified with mysql_native_password by 'gfd$&6dyfdDDd5*GYuy(09)';

grant all privileges on ezbudget.* to 'ezbudget'@'localhost';

REVOKE Alter ON ezbudget.* FROM 'ezbudget'@'localhost';
REVOKE Create ON ezbudget.* FROM 'ezbudget'@'localhost';
REVOKE Create view ON ezbudget.* FROM 'ezbudget'@'localhost';
REVOKE Drop ON ezbudget.* FROM 'ezbudget'@'localhost';
REVOKE Grant option ON ezbudget.* FROM 'ezbudget'@'localhost';
REVOKE Index ON ezbudget.* FROM 'ezbudget'@'localhost';
REVOKE Alter routine ON ezbudget.* FROM 'ezbudget'@'localhost';
REVOKE Create routine ON ezbudget.* FROM 'ezbudget'@'localhost';

flush privileges;