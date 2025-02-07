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
hash_password VARCHAR(255) NOT NULL,
avatar VARCHAR(255) NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
country_id INTEGER NOT NULL,
FOREIGN KEY (country_id) REFERENCES country(id),
role_id INTEGER NOT NULL DEFAULT 1,
FOREIGN KEY (role_id) REFERENCES role(id)
);

CREATE TABLE IF NOT EXISTS decision (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
title VARCHAR(255) NOT NULL,
min_date DATE NOT NULL,
max_date DATE NOT NULL,
description TEXT NOT NULL,
context TEXT NOT NULL,
profit TEXT NOT NULL,
risk TEXT NOT NULL,
step VARCHAR(50) NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
user_id INTEGER NOT NULL,
FOREIGN KEY (user_id) REFERENCES user(id),
country_id INTEGER NOT NULL,
FOREIGN KEY (country_id) REFERENCES country(id)
);

CREATE TABLE IF NOT EXISTS category (
id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
label VARCHAR(50) NOT NULL,
color VARCHAR(25) NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
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
user_id INTEGER NOT NULL,
FOREIGN KEY (user_id) REFERENCES user(id),
decision_id INTEGER NOT NULL,
FOREIGN KEY (decision_id) REFERENCES decision(id)
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

INSERT INTO role (id,label) VALUES (1, 'applicant'), (2, 'user'), (3, 'administrator'), (4, 'rejected');
INSERT INTO country (id,label) VALUES (1, 'France'), (2, 'Mexique'), (3, 'Canada'), (4, 'Pérou'), (5, 'Sénégal'), (6, 'Philippines'), (7, 'Liban'), (8, 'Cote d''Ivoire'), (9, 'Australie'), (10, 'Ukraine');


INSERT INTO user (firstname, lastname, email, hash_password, avatar, role_id, country_id) VALUES ("Amandine", "Grard-Laurent", "a.grard@gmail.com", "12345", "avatar", 1, 1), ( "Aurelien","vauchamp", "vauchamp@gmail.com", "123456", "avatar", 1, 2), ( "lucie","vauchamp" , "lucie@gmail.com", "12345", "avatar", 2,5), ( "Aurelien","vauchamp", "vauamp@gmail.com", "123456", "avatar", 1, 2),( "Aurelien","vauchamp", "vauchamp@ail.com", "123456", "avatar", 1, 2);
-- INSERT INTO decision (title, min_date, max_date, description, context, profit, risk, step, user_id, country_id) VALUES ("Super projet de la mort qui tue ", "2025-01-26", "2025-02-26", "  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae a
--       officiis nesciunt, dicta, totam porro dolore maiores magni veritatis ipsa
--       pariatur enim cum dolorem neque aspernatur impedit voluptates? Obcaecati,
--       saepe. Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
--       deleniti, fugiat quis aperiam accusamus nulla eveniet provident, aliquid
--       exercitationem rerum ad asperiores minus aspernatur. Expedita libero
--       excepturi eaque corrupti quia. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae a
--       officiis nesciunt, dicta, totam porro dolore maiores magni veritatis ipsa
--       pariatur enim cum dolorem neque aspernatur impedit voluptates? Obcaecati,
--       saepe. Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
--       deleniti, fugiat quis aperiam accusamus nulla eveniet provident, aliquid
--       exercitationem rerum ad asperiores minus aspernatur. Expedita libero
--       excepturi eaque corrupti quia. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae a
--       officiis nesciunt, dicta, totam porro dolore maiores magni veritatis ipsa
--       pariatur enim cum dolorem neque aspernatur impedit voluptates? Obcaecati,
--       saepe. Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
--       deleniti, fugiat quis aperiam accusamus nulla eveniet provident, aliquid
--       exercitationem rerum ad asperiores minus aspernatur. Expedita libero
--       excepturi eaque corrupti quia.", "  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae a
--       officiis nesciunt, dicta, totam porro dolore maiores magni veritatis ipsa
--       pariatur enim cum dolorem neque aspernatur impedit voluptates? Obcaecati,
--       saepe. Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
--       deleniti, fugiat quis aperiam accusamus nulla eveniet provident, aliquid
--       exercitationem rerum ad asperiores minus aspernatur. Expedita libero
--       excepturi eaque corrupti quia. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae a
--       officiis nesciunt, dicta, totam porro dolore maiores magni veritatis ipsa
--       pariatur enim cum dolorem neque aspernatur impedit voluptates? Obcaecati,
--       saepe. Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
--       deleniti, fugiat quis aperiam accusamus nulla eveniet provident, aliquid
--       exercitationem rerum ad asperiores minus aspernatur. Expedita libero
--       excepturi eaque corrupti quia.  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae a
--       officiis nesciunt, dicta, totam porro dolore maiores magni veritatis ipsa
--       pariatur enim cum dolorem neque aspernatur impedit voluptates? Obcaecati,
--       saepe. Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
--       deleniti, fugiat quis aperiam accusamus nulla eveniet provident, aliquid
--       exercitationem rerum ad asperiores minus aspernatur. Expedita libero
--       excepturi eaque corrupti quia.", "  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae a
--       officiis nesciunt, dicta, totam porro dolore maiores magni veritatis ipsa
--       pariatur enim cum dolorem neque aspernatur impedit voluptates? Obcaecati,
--       saepe. Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
--       deleniti, fugiat quis aperiam accusamus nulla eveniet provident, aliquid
--       exercitationem rerum ad asperiores minus aspernatur. Expedita libero
--       excepturi eaque corrupti quia. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae a
--       officiis nesciunt, dicta, totam porro dolore maiores magni veritatis ipsa
--       pariatur enim cum dolorem neque aspernatur impedit voluptates? Obcaecati,
--       saepe. Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
--       deleniti, fugiat quis aperiam accusamus nulla eveniet provident, aliquid
--       exercitationem rerum ad asperiores minus aspernatur. Expedita libero
--       excepturi eaque corrupti quia. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae a
--       officiis nesciunt, dicta, totam porro dolore maiores magni veritatis ipsa
--       pariatur enim cum dolorem neque aspernatur impedit voluptates? Obcaecati,
--       saepe. Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
--       deleniti, fugiat quis aperiam accusamus nulla eveniet provident, aliquid
--       exercitationem rerum ad asperiores minus aspernatur. Expedita libero
--       excepturi eaque corrupti quia.", "  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae a
--       officiis nesciunt, dicta, totam porro dolore maiores magni veritatis ipsa
--       pariatur enim cum dolorem neque aspernatur impedit voluptates? Obcaecati,
--       saepe. Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
--       deleniti, fugiat quis aperiam accusamus nulla eveniet provident, aliquid
--       exercitationem rerum ad asperiores minus aspernatur. Expedita libero
--       excepturi eaque corrupti quia. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae a
--       officiis nesciunt, dicta, totam porro dolore maiores magni veritatis ipsa
--       pariatur enim cum dolorem neque aspernatur impedit voluptates? Obcaecati,
--       saepe. Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
--       deleniti, fugiat quis aperiam accusamus nulla eveniet provident, aliquid
--       exercitationem rerum ad asperiores minus aspernatur. Expedita libero
--       excepturi eaque corrupti quia. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae a
--       officiis nesciunt, dicta, totam porro dolore maiores magni veritatis ipsa
--       pariatur enim cum dolorem neque aspernatur impedit voluptates? Obcaecati,
--       saepe. Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
--       deleniti, fugiat quis aperiam accusamus nulla eveniet provident, aliquid
--       exercitationem rerum ad asperiores minus aspernatur. Expedita libero
--       excepturi eaque corrupti quia.", "step_1", 1, 2), ("title_2", "2025-01-26", "2025-02-26", "description_2", "context_2", "profit_2", "risk_2", "step_2", 2, 3);
-- INSERT INTO comment (content, user_id, decision_id) VALUES ("commentaire_1", 2,1), ("commentaire_2", 3,1), ("commentaire_3", 2,1);
-- INSERT INTO user_decision (role, user_id, decision_id) VALUES ("animator", 1, 1), ("animator", 2, 1), ("animator", 3, 1);
-- INSERT INTO category (label, decision_id) VALUES ("category_1",1), ("category_2",2), ("category_3",1);