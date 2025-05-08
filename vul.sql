CREATE DATABASE vul;
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `CD_USUARIO` int(11) NOT NULL AUTO_INCREMENT,
  `NOME` varchar(255) NOT NULL,
  `EMAIL` varchar(255) NOT NULL,
  `SENHA` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updateAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`CD_USUARIO`),
  UNIQUE KEY `usuario_unique` (`EMAIL`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `usuarios` WRITE;
INSERT INTO `usuarios` VALUES (1,'teste','teste@gmail.com','$2b$10$5i.1ikIi8JtiDkgof9e1y.IDKCz.8DGXj97YojTCHbbl6O8t/BYu2','2025-04-28 19:29:44','2025-04-28 19:29:44');
INSERT INTO `usuarios` VALUES (2,'luizinhoPley','luizinhoPley@gmail.com','$2b$10$5i.1ikIi8JtiDkgof9e1y.IDKCz.8DGXj97YojTCHbbl6O8t/BYu2','2025-04-28 19:29:44','2025-04-28 19:29:44');
INSERT INTO `usuarios` VALUES (3,'Profe de Segurança','Profe@gmail.com','$2b$10$5i.1ikIi8JtiDkgof9e1y.IDKCz.8DGXj97YojTCHbbl6O8t/BYu2','2025-04-28 19:29:44','2025-04-28 19:29:44');
INSERT INTO `usuarios` VALUES (4,'dudisplay','dudisplay@gmail.com','$2b$10$5i.1ikIi8JtiDkgof9e1y.IDKCz.8DGXj97YojTCHbbl6O8t/BYu2','2025-04-28 19:29:44','2025-04-28 19:29:44');
INSERT INTO `usuarios` VALUES (5,'gustjuninho','gustjuninho@gmail.com','$2b$10$5i.1ikIi8JtiDkgof9e1y.IDKCz.8DGXj97YojTCHbbl6O8t/BYu2','2025-04-28 19:29:44','2025-04-28 19:29:44');
INSERT INTO `usuarios` VALUES (6,'andredoplayleite','andredoplayleite@gmail.com','$2b$10$5i.1ikIi8JtiDkgof9e1y.IDKCz.8DGXj97YojTCHbbl6O8t/BYu2','2025-04-28 19:29:44','2025-04-28 19:29:44');
UNLOCK TABLES;