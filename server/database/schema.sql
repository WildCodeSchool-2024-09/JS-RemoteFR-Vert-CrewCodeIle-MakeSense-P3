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

INSERT INTO user (firstname, lastname, email, hash_password, avatar, country_id, role_id) VALUES 
('Alice', 'Dupont', 'alice.dupont@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'https://randomuser.me/api/portraits/women/52.jpg', 1, 2),
('Jean', 'Martin', 'jean.martin@example.com', 'e99a18c428cb38d5f260853678922e03', 'https://randomuser.me/api/portraits/men/26.jpg', 2, 2),
('Sophie', 'Durand', 'sophie.durand@example.com', '098f6bcd4621d373cade4e832627b4f6', 'https://randomuser.me/api/portraits/women/75.jpg', 3, 2),
('Pierre', 'Lemoine', 'pierre.lemoine@example.com', '21232f297a57a5a743894a0e4a801fc3', 'https://randomuser.me/api/portraits/men/31.jpg', 4, 3),
('Laura', 'Moreau', 'laura.moreau@example.com', '81dc9bdb52d04dc20036dbd8313ed055', 'https://randomuser.me/api/portraits/women/52.jpg ', 5, 3);

INSERT INTO decision (id, title, min_date, max_date, description, context, profit, risk, step, user_id, country_id) 
VALUES 
(1, 'Approval of Project Alpha', '2024-01-01', '2024-03-15', 'Evaluation and approval of the Alpha project.', 'Project aiming to increase market share by 20%.', 'Potential revenue growth of $1M.', 'High competition risk.', 'rejected', 1, 1),

(2, 'Budget Allocation for Beta', '2025-01-01', '2025-03-15', 'Allocate budget for Beta product line.', 'Supports expansion to new regions.', 'Estimated profit increase of $500K.', 'Risk of budget overrun.', 'in progress', 3, 2),

(3, 'Risk Assessment for Gamma', '2025-01-15', '2025-01-31', 'Conduct risk assessment for Gamma project.', 'Identify and mitigate major risks.', 'Long-term strategic advantage.', 'Operational delays.', 'approved', 1, 1),

(4, 'Investment in Delta', '2025-01-20', '2025-02-21', 'Invest in new technology for Delta program.', 'Enhance product capabilities.', 'High return on investment.', 'Technology adoption risk.', 'in progress', 2, 2),

(5, 'Strategic Partnership with Epsilon', '2025-01-09', '2025-02-14', 'Establish a partnership with Epsilon.', 'Access to new customer base.', 'Shared resources and expertise.', 'Integration challenges.', 'in progress', 3, 1),

(6, 'Lorem ipsum dolor', '2023-01-15', '2023-02-15', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non metus ut libero blandit tristique in eu orci.', 'Context for Alpha decision. Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Profit could reach up to $200K.', 'Risk of market fluctuation.', 'Rejected', 1, 1),

(7, 'Suspendisse potenti', '2025-01-10', '2025-02-06', 'Suspendisse potenti. Fusce non elit vel nisi tempor gravida. Aenean fringilla ipsum vel nunc hendrerit pretium.', 'Beta project context description goes here. Nullam at justo vehicula.', 'Potential profit is estimated at $100K.', 'Moderate operational risks.', 'Approved', 2, 2),

(8, 'Curabitur ullamcorper', '2024-03-05', '2024-09-10', 'Curabitur ullamcorper, justo ut tincidunt fermentum, sapien libero fringilla nisl, at tristique nunc libero eget sapien.', 'Gamma initiative aims to reduce costs. Etiam nec quam non urna feugiat dictum.', 'Savings potential of $50K.', 'Technological challenges.', 'Rejected', 4, 3),

(9, 'Phasellus euismod', '2024-04-01', '2024-10-01', 'Phasellus euismod, nunc eget volutpat fermentum, velit lacus lacinia dolor, vel egestas sapien libero a lectus.', 'Delta program focuses on efficiency improvements. Quisque tincidunt.', 'Increased revenue by $300K.', 'Adoption risk for new tools.', 'Approved', 5, 4),

(10, 'Vivamus non libero', '2025-01-20', '2025-02-10', 'Vivamus non libero eget eros fringilla aliquet. Cras ac lectus id orci blandit varius nec eu augue.', 'Epsilon strategy supports long-term growth. Mauris tincidunt.', 'Projected growth of $400K.', 'Partnership risks.', 'In progress', 5, 5);

INSERT INTO category (label, color) VALUES ("categorie1", "blue"), ("categorie2", "green");
INSERT INTO decision_category (category_id, decision_id) VALUES (1, 2), (2, 2);