-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: kolt
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `scooters`
--

DROP TABLE IF EXISTS `scooters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scooters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `registration_code` char(8) COLLATE utf8_bin NOT NULL,
  `is_busy` tinyint(1) NOT NULL,
  `last_use_time` date NOT NULL,
  `total_ride_kilometers` decimal(6,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `registration_code_UNIQUE` (`registration_code`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scooters`
--

LOCK TABLES `scooters` WRITE;
/*!40000 ALTER TABLE `scooters` DISABLE KEYS */;
INSERT INTO `scooters` VALUES (1,'sc_00001',1,'2021-10-13',1003.00),(2,'scoot_02',1,'2021-10-13',111.00),(3,'scoot_09',1,'2021-10-13',150.00),(4,'scoot_10',1,'2021-10-13',20.00),(5,'scoot_11',0,'2021-10-13',1.00),(6,'scoot_12',1,'2021-10-13',2.00),(7,'scoot_13',0,'2021-10-13',4.00),(10,'scoot_21',0,'1980-01-01',0.00);
/*!40000 ALTER TABLE `scooters` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-13 16:23:30
