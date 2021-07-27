-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           5.7.34-log - MySQL Community Server (GPL)
-- SE du serveur:                Win64
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Listage de la structure de la table groupomania_bis. messages
CREATE TABLE IF NOT EXISTS `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `UserId` int(11) NOT NULL,
  `reported` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `messages_ibfk_1` (`UserId`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=latin1;

-- Listage des données de la table groupomania_bis.messages : ~5 rows (environ)
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` (`id`, `content`, `imageUrl`, `UserId`, `reported`, `createdAt`, `updatedAt`) VALUES
	(95, 'Salut groupomania ! ', 'http://localhost:3000/images/space.jpeg1627324661527.jpg', 1, 1, '2021-07-26 18:37:41', '2021-07-26 21:06:13'),
	(112, 'Moi, quand je vois enfin groupomania ! ', 'http://localhost:3000/images/elon.gif1627333398709.gif', 3, 1, '2021-07-26 21:03:18', '2021-07-26 21:05:02'),
	(113, 'Fais gaffe Elon, j\'arrive', 'http://localhost:3000/images/jeff2.gif1627333468764.gif', 4, 0, '2021-07-26 21:04:28', '2021-07-26 21:04:28'),
	(115, 'j\'adore l\'espace', 'http://localhost:3000/images/space2.png1627335949411.png', 4, 1, '2021-07-26 21:45:49', '2021-07-26 21:59:26'),
	(116, 'vous m\'avez oublié les gars', 'http://localhost:3000/images/richard.gif1627336756359.gif', 5, 0, '2021-07-26 21:59:16', '2021-07-26 21:59:16');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;

-- Listage de la structure de la table groupomania_bis. sequelizemeta
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Listage des données de la table groupomania_bis.sequelizemeta : ~2 rows (environ)
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` (`name`) VALUES
	('20210711152725-create-user.js'),
	('20210711152948-create-message.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;

-- Listage de la structure de la table groupomania_bis. users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Listage des données de la table groupomania_bis.users : ~5 rows (environ)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `email`, `password`, `firstName`, `lastName`, `isAdmin`, `imageUrl`, `createdAt`, `updatedAt`) VALUES
	(1, 'charly.dewalles@gmail.com', '$2b$10$G46Fz4Oh63Ou7pdsLYPpruOm9dZu8qzzvnYCaPf5Q/eRjpWvNidgC', 'Charly', 'Dewalles', 1, NULL, '2021-07-25 19:41:53', '2021-07-25 19:41:53'),
	(2, 'moncompte@gmail.com', '$2b$10$Ekp8NF4vSM1tq6tYK5BMFex1b95xNAlwfCCYiRAzi6T89xT9MfQd6', 'Pierre', 'Dupont', 0, NULL, '2021-07-26 12:39:52', '2021-07-26 12:39:52'),
	(3, 'elon.musk@gmail.com', '$2b$10$6TdWU3XiVa9rJC7wM1o30uX6SkmBeBuaw.XoVl8n4qF8bTSLTJZ8m', 'Elon', 'Musk', 1, NULL, '2021-07-26 18:38:05', '2021-07-26 18:38:05'),
	(4, 'jeff.bezos@gmail.com', '$2b$10$UkvLedbAr5Yfqv6JH8/bAuTpzacoKxuRNHs5D4vVQzEIlrU3aJd26', 'Jeff', 'Bezos', 0, NULL, '2021-07-26 18:52:03', '2021-07-26 18:52:03'),
	(5, 'richard.branson@gmail.com', '$2b$10$oYwW5oEDehb7dsOaZ1wGG.nQARHwi8dEvRQm1DS1kCdoRd6hWGsbC', 'Richard ', 'Branson', 0, NULL, '2021-07-26 21:58:55', '2021-07-26 21:58:55');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
