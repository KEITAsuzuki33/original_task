
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
    
    create table tweets (id int,foreign key(id) references user(id)) ENGINE=InnoDB;
    
    +--------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| follow | CREATE TABLE `follow` (
  `follow_user_id` int(11) DEFAULT NULL,
  `followed_user_id` int(11) DEFAULT NULL,
  KEY `follow_user_id` (`follow_user_id`),
  KEY `followed_user_id` (`followed_user_id`),
  CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`follow_user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`followed_user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 |
+--------+---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+--------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| tweets | CREATE TABLE `tweets` (
  `id` int(11) DEFAULT NULL,
  `tweet` text,
  `created_time` datetime DEFAULT NULL,
  KEY `id` (`id`),
  CONSTRAINT `tweets_ibfk_1` FOREIGN KEY (`id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 |
+--------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

+-------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| user  | CREATE TABLE `user` (
  `name` varchar(30) DEFAULT NULL,
  `email` text,
  `password` varchar(255) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1 |









| tweet | CREATE TABLE `tweet` (
  `user_id` int(11) DEFAULT NULL,
  `tweet` varchar(140),
  `created_time` TIMESTAMP DEFAULT NOW() ,
  `tweet_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`tweet_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `tweet_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 |

| user  | CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 |

| follow | CREATE TABLE `follow` (
  `follow_user_id` int(11) DEFAULT NULL,
  `followed_user_id` int(11) DEFAULT NULL,
  UNIQUE KEY `follow_user_id` (`follow_user_id`,`followed_user_id`),
  KEY `followed_user_id` (`followed_user_id`),
  CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`follow_user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`followed_user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8



CREATE TABLE `tweet` (
    -> `tweet` varchar(140),
    -> `created_time` TIMESTAMP DEFAULT NOW(),
    -> `tweet_id` int(11) NOT NULL AUTO_INCREMENT);
ERROR 1075 (42000): Incorrect table definition; there can be only one auto column and it must be defined as a key




| user  | CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8

| user  | CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8


| tweet | CREATE TABLE `tweet` (
  `user_id` int(11) DEFAULT NULL,
  `tweet` varchar(140) DEFAULT NULL,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tweet_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`tweet_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `tweet_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8


| follow | CREATE TABLE `follow` (
  `follow_user_id` int(11) DEFAULT NULL,
  `followed_user_id` int(11) DEFAULT NULL,
  UNIQUE KEY (`follow_user_id`,`followed_user_id`),
  KEY `followed_user_id` (`followed_user_id`),
  CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`follow_user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`followed_user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8




____________________________________________
| user  | CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8


| tweet | CREATE TABLE `tweet` (
  `user_id` int(11) DEFAULT NULL,
  `tweet` varchar(140) DEFAULT NULL,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tweet_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`tweet_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `tweet_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 |

| follow | CREATE TABLE `follow` (
  `follow_user_id` int(11) DEFAULT NULL,
  `followed_user_id` int(11) DEFAULT NULL,
  UNIQUE KEY `combination` (`follow_user_id`,`followed_user_id`),
  KEY `followed_user_id` (`followed_user_id`),
  CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`follow_user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`followed_user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 |



















+-------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+