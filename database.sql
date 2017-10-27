
create table main(id int, name varchar(20), followee int(11), followed int(11), tweets text);


create table tweets (email varchar(50), tweet text, created_time datetime);


create table followed (email varchar(50), follower int(11));
	

create table following (email varchar(50), followee int(11));


create table user (email varchar(50), name varchar(30), password varchar(255))
	alter table テーブル名 add id int not null primary key auto_increment;

create table follow (
    -> follow_user_id int, followed_user_id int,
    -> foreign key(follow_user_id) references user(id),
    -> foreign key(followed_user_id) references user(id)         
    -> ) ENGINE=InnoDB;