-- SQLBook: Code
CREATE TABLE IF NOT EXISTS role (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
label VARCHAR(50) NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS country (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
label VARCHAR(150) NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
firstname VARCHAR(50) NOT NULL,
lastname VARCHAR(50) NOT NULL,
email VARCHAR(150) NOT NULL UNIQUE,
hashed_password VARCHAR(255) NOT NULL,
avatar VARCHAR(255) NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
country_id INTEGER NOT NULL,
FOREIGN KEY (country_id) REFERENCES country(id),
role_id INTEGER NOT NULL DEFAULT 1,
FOREIGN KEY (role_id) REFERENCES role(id)
);

CREATE TABLE IF NOT EXISTS category (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
label VARCHAR(50) NOT NULL,
color VARCHAR(25) NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- modification category id

CREATE TABLE IF NOT EXISTS decision (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
title VARCHAR(255) NOT NULL,
min_date DATE NOT NULL,
max_date DATE NOT NULL,
description TEXT NOT NULL,
context TEXT NOT NULL,
profit TEXT NOT NULL,
risk TEXT NOT NULL,
-- step VARCHAR(50) NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
user_id INTEGER NOT NULL,
FOREIGN KEY (user_id) REFERENCES user(id),
country_id INTEGER NOT NULL,
FOREIGN KEY (country_id) REFERENCES country(id),
category_id INTEGER NOT NULL,
FOREIGN KEY (category_id) REFERENCES category(id)
);



CREATE TABLE IF NOT EXISTS decision_category (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
category_id INTEGER NOT NULL,
FOREIGN KEY (category_id) REFERENCES category(id),
decision_id INTEGER NOT NULL,
FOREIGN KEY (decision_id) REFERENCES decision(id),
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS comment (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
content TEXT NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
user_id INTEGER NOT NULL,
FOREIGN KEY (user_id) REFERENCES user(id),
decision_id INTEGER NOT NULL,
FOREIGN KEY (decision_id) REFERENCES decision(id)
);

CREATE TABLE IF NOT EXISTS vote (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,

state BOOLEAN,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
decision_id INTEGER NOT NULL,
FOREIGN KEY (decision_id) REFERENCES decision(id),
user_id INTEGER NOT NULL,
FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE IF NOT EXISTS user_decision (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
role VARCHAR(50) NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
user_id INTEGER NOT NULL,
FOREIGN KEY (user_id) REFERENCES user(id),
decision_id INTEGER NOT NULL,
FOREIGN KEY (decision_id) REFERENCES decision(id)
);


INSERT INTO country (id,label) VALUES (1, 'France'), (2, 'Mexique'), (3, 'Canada'), (4, 'Pérou'), (5, 'Sénégal'), (6, 'Philippines'), (7, 'Liban'), (8, 'Cote d''Ivoire'), (9, 'Australie'), (10, 'Ukraine');

INSERT INTO role (label) VALUES ('Utilisateur');

INSERT INTO user (firstname,lastname,email,hashed_password,avatar,country_id,role_id) VALUES ('lea','monthieux','monthieuxlea@gmail.com','Pommedeterre12*','pomme',1,1);
INSERT INTO user (firstname, lastname, email, hashed_password, avatar, country_id, role_id)
VALUES ('Jean', 'Dupont', 'jean@example.com', 'mdp12*', 'avatar.png', 1, 1);
INSERT INTO user (firstname, lastname, email, hashed_password, avatar, country_id, role_id)
VALUES 
('Fatou', 'Sow', 'fatou.sow@exemple.com', 'Motdepasse123*', 'fatou.png', 1, 1),
('Miguel', 'Lopez', 'miguel.lopez@exemple.com', 'PassFrance*22', 'miguel.png', 1, 1),
('Nadine', 'Roche', 'nadine.roche@exemple.com', 'Bonjour123*', 'nadine.png', 1, 1),
('Léon', 'Dubois', 'leon.dubois@exemple.com', 'Secu*789', 'leon.png', 1, 1);
INSERT INTO category (id,label, color) 
VALUES (1,'Sport', 'blue'),(2,'Retraite', 'red'),(3,'Aide Sociale', 'green'),(4,'Écologie', 'green');
INSERT INTO decision (title, min_date, max_date,description,context,profit,risk,user_id,country_id, category_id) VALUES ('Course caritative',"2025-02-2","2025-04-30",'course organisée par la métropole de Lyon','dans le cadre du projet caritatif','pour gagner des fonds afin de financer la lutte contre le cancer','minimum 100 participants demandés pour financer le projet',1,1,1);
INSERT INTO decision (title, min_date, max_date,description,context,profit,risk,user_id,country_id, category_id) VALUES ('Accompagnement personne âgée',"2025-02-2","2025-05-10",'cherche bénévoles pour accompagner des personnes âgées','afin de faire des sorties hors de la maison de retraite',' dans le but de bâtir une relation intergénérationnelle','nous recherchons une personne disponible une fois par semaine pour créer des duos',2,1,2);
INSERT INTO decision (title, min_date, max_date,description,context,profit,risk,user_id,country_id, category_id) VALUES ('Reboisement urbain à Lyon','2025-04-15','2025-06-30','Plantation d’arbres dans des quartiers urbains lyonnais.','Projet lancé avec le soutien de la métropole.','Amélioration de la qualité de l’air et du cadre de vie.','Météo défavorable, peu de participation.',3,1,4);
