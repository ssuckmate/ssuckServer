INSERT INTO sagams(email,password,name) VALUES("4gam@mail.com","4gam","4gam");
INSERT INTO sagams(email,password,name) VALUES("5gam@mail.com","5gam","5gam");

INSERT INTO dormitories(name,story,dormitoryCode) VALUES("한양숙사",4,"hanyang123");
UPDATE sagams SET dormitory ="1" WHERE name= "4gam" OR name = "5gam";

INSERT INTO users(email,password,name,phoneNum,dormitory) 
VALUES("sj@mail.com","sj","sj","01012341234",1);
INSERT INTO users(email,password,name,phoneNum,dormitory) 
VALUES("yh@mail.com","yh","yh","01012341234",1);
INSERT INTO users(email,password,name,phoneNum,dormitory) 
VALUES("hs@mail.com","hs","hs","01012341234",1);
INSERT INTO users(email,password,name,phoneNum,dormitory) 
VALUES("cs@mail.com","cs","ss","01012341234",1);
INSERT INTO users(email,password,name,phoneNum,dormitory) 
VALUES("gw@mail.com","gw","gw","01012341234",1);

INSERT INTO rooms(roomNum,floor,dormitory) VALUES(101, 1, 1);
INSERT INTO rooms(roomNum,floor,dormitory) VALUES(301, 3, 1);