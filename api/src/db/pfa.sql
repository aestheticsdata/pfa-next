create database pfa;

use pfa;

create TABLE users (
  userID       INT(11) AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(20) NOT NULL,
  password      VARCHAR(60) NOT NULL,
  email         VARCHAR(250) NOT NULL UNIQUE,
  registerDate DATETIME NOT NULL,
  language      VARCHAR(3) DEFAULT 'en',
  baseCurrency VARCHAR(3) NOT NULL
);

create TABLE categories (
  categoryID INT(11) AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(20) NOT NULL UNIQUE,
  color       VARCHAR(20) NOT NULL
);

create TABLE spendings (
  spendingID INT(11) AUTO_INCREMENT PRIMARY KEY,
  userID     INT(11) NOT NULL,
  date        DATE NOT NULL,
  itemType   VARCHAR(11) NOT NULL,
  label       VARCHAR(100) NOT NULL,
  amount      DECIMAL(6,2) NOT NULL,
  categoryID INT(11),
  currency    VARCHAR(3)
  -- FOREIGN KEY (user_id) REFERENCES users(user_id),
  -- FOREIGN KEY (category_id) REFERENCES categories(category_id)
);


insert into users (name, password, email, registerDate, base_currency) VALUES
('joe', 'coolpassw0rd!', 'joe.cool@eat.com', '2021-03-14', 'EUR'),
('julia', 'juliapassword+', 'julia@dfh.io', '2021-03-14', 'EUR'),
('vania', 'vaniapassword&', 'vania@dfh.io', '2021-03-14', 'USD');

insert into Spendings (ID, userID, date, itemType, label, amount, currency) VALUES ('bf8599b8-89b0-11eb-8dcd-0242ac130003', '9bdcf470-8b22-11eb-885b-db61ad93209d', '2021-03-13', 'spending', 'carrefour', '3.45', 'EUR');
insert into Spendings (ID, userID, date, itemType, label, amount, currency) VALUES ('dca8f454-89b0-11eb-8dcd-0242ac130003', '9bdcf470-8b22-11eb-885b-db61ad93209d', '2021-03-11', 'spending', 'monoprix', '14.20', 'EUR');
insert into Spendings (ID, userID, date, itemType, label, amount, currency) VALUES ('dca8f85a-89b0-11eb-8dcd-0242ac130003', '9bdcf470-8b22-11eb-885b-db61ad93209d', '2021-03-09', 'spending', 'coiffeur', '30', 'EUR');
insert into Spendings (ID, userID, date, itemType, label, amount, currency) VALUES ('dca8f954-89b0-11eb-8dcd-0242ac130003', '9bdcf470-8b22-11eb-885b-db61ad93209d', '2021-03-14', 'spending', 'leroy merlin', '127', 'EUR');
insert into Spendings (ID, userID, date, itemType, label, amount, currency) VALUES ('dca8fa12-89b0-11eb-8dcd-0242ac130003', '9bdcf470-8b22-11eb-885b-db61ad93209d', '2021-03-14', 'spending', 'carte son', '231.56', 'EUR');
insert into Spendings (ID, userID, date, itemType, label, amount, currency) VALUES ('dca8fad0-89b0-11eb-8dcd-0242ac130003', '9bdcf470-8b22-11eb-885b-db61ad93209d', '2021-03-15', 'spending', 'monoprix', '42.9', 'EUR');
insert into Spendings (ID, userID, date, itemType, label, amount, currency) VALUES ('040a2270-89b1-11eb-8dcd-0242ac130003', '9bdcf470-8b22-11eb-885b-db61ad93209d', '2021-03-15', 'spending', 'pharmacie', '7', 'EUR');
insert into Spendings (ID, userID, date, itemType, label, amount, currency) VALUES ('040a2572-89b1-11eb-8dcd-0242ac130003', '9bdcf470-8b22-11eb-885b-db61ad93209d', '2021-03-16', 'spending', 'zzz', '226.5', 'EUR');
insert into Spendings (ID, userID, date, itemType, label, amount, currency) VALUES ('040a26da-89b1-11eb-8dcd-0242ac130003', '9bdcf470-8b22-11eb-885b-db61ad93209d', '2021-03-17', 'spending', 'ppp', '64.5', 'EUR');
insert into Spendings (ID, userID, date, itemType, label, amount, currency) VALUES ('040a2888-89b1-11eb-8dcd-0242ac130003', '9bdcf470-8b22-11eb-885b-db61ad93209d', '2021-03-18', 'spending', 'kkkkk', '38.45', 'EUR');


insert into Categories (ID, userID, name, color) values ('40f556a6-89c9-11eb-8dcd-0242ac130003', '9bdcf470-8b22-11eb-885b-db61ad93209d', 'alimentation', '#32a84c');
insert into Categories (ID, userID, name, color) values ('ed7371e2-89c9-11eb-8dcd-0242ac130003', '9bdcf470-8b22-11eb-885b-db61ad93209d', 'loisir', '#349beb');
insert into Categories (ID, userID, name, color) values ('7752cf4c-8b10-11eb-8dcd-0242ac130003', '9bdcf470-8b22-11eb-885b-db61ad93209d', 'bricolage', '#ebc934');

UPDATE Spendings SET categoryID = '40f556a6-89c9-11eb-8dcd-0242ac130003' WHERE label = 'monoprix';
UPDATE Spendings SET categoryID = '40f556a6-89c9-11eb-8dcd-0242ac130003' WHERE label = 'carrefour';
UPDATE Spendings SET categoryID = 'ed7371e2-89c9-11eb-8dcd-0242ac130003' WHERE label = 'carte son';

---
SELECT * FROM Spendings LEFT JOIN Categories on Spendings.categoryID = Categories.ID;

SELECT s.*, c.name as category, c.color
FROM Spendings s
LEFT JOIN Categories c ON s.categoryID = c.ID
WHERE s.date BETWEEN '2021-03-13' AND '2021-03-15'
ORDER BY date ASC;


insert into Recurrings (ID, userID, dateFrom, dateTo, itemType, label, amount, currency) VALUES ('b7d9bc11-170e-4163-8aeb-639e885c2297', '9bdcf470-8b22-11eb-885b-db61ad93209d', '2021-03-01', '2021-03-31', 'recurring', 'EDF', 12, 'EUR');
insert into Recurrings (ID, userID, dateFrom, dateTo, itemType, label, amount, currency) VALUES ('d022de15-b931-4829-9fd9-43cb18924e87', '9bdcf470-8b22-11eb-885b-db61ad93209d', '2021-03-01', '2021-03-31', 'recurring', 'mutuelle', 40.2, 'EUR');


ALTER TABLE `Dashboards` ADD COLUMN `userID` char(36) collate utf8mb4_bin not null;
ALTER TABLE `Dashboards` ADD COLUMN `initialCeiling` DECIMAL(6,2);

INSERT INTO Dashboards (ID, userID, dateFrom, dateTo, initialAmount, initialCeiling) VALUES ('845fab23-ccbe-49d9-a294-9f73bbabcaa6', '9bdcf470-8b22-11eb-885b-db61ad93209d', '2021-03-01', '2021-03-31', 3150, 170);
