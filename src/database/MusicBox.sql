-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: music_box_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.21-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Cuerdas'),(2,'Percusión'),(3,'Viento'),(4,'Sonido'),(5,'Accesorios'),(6,'Taller');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id_idx` (`order_id`),
  KEY `product_id_idx` (`product_id`),
  CONSTRAINT `order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `price` int(11) NOT NULL,
  `description` longtext DEFAULT NULL,
  `color` varchar(45) DEFAULT NULL,
  `image` varchar(45) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id_idx` (`category_id`),
  CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Clarinete Estandar Yamaha Ycl255 Con Boquilla Y Estuche',382499,'adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae','null','clarinete-yamaha.png',3,'2021-11-04 14:55:26','2021-11-04 12:18:24',NULL),(2,'Bateria Mapex Armory 5 Cuerpos Medidas Fusión Bombo 20',373947,'adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae','null','bateria-mapex.png',2,'2021-11-04 14:55:26','2021-11-04 12:21:43',NULL),(3,'Guitarra Electrica Fender Stratocaster Standar Mexico Rsw Sb',349242,'adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae','null','guitarra-electrica-fender.png',1,'2021-11-04 14:55:26','2021-11-04 12:21:20',NULL),(4,'Auriculares Inalambricos Sennheiser RS120 Bluetooth Cerrados',397599,'adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae','null','auriculares-inalambricos.png',5,'2021-11-04 14:55:26','2021-11-04 12:19:00',NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(45) NOT NULL,
  `user_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `category` varchar(45) DEFAULT NULL,
  `avatar` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Martín González','mgonz','mgonzalez@gmail.com','a73kgfb4mgvk5','persona','img-user1','2021-11-01 23:08:55','2021-11-01 20:10:38',NULL),(2,'Phyllys Howel','phowel0','phowel0@sciencedaily.com','FjXpfV2','persona','https://robohash.org/reprehenderitofficiasit.png?size=50x50&set=set1','2021-11-04 14:35:05','2021-11-04 11:35:05',NULL),(3,'Marlyn Childerley','mchilderley1','mchilderley1@economist.com','hIDpUD0Z','persona','https://robohash.org/etdoloreveniet.png?size=50x50&set=set1','2021-11-04 14:35:05','2021-11-04 11:35:05',NULL),(4,'Sybil Farrin','sfarrin2','sfarrin2@examiner.com','WWTF5zeHY','persona','https://robohash.org/quifacilistemporibus.png?size=50x50&set=set1','2021-11-04 14:35:05','2021-11-04 11:35:05',NULL),(5,'Ruy Antat','rantat3','rantat3@bing.com','h3vyn7Q','persona','https://robohash.org/faciliscorporisaut.png?size=50x50&set=set1','2021-11-04 14:35:05','2021-11-04 11:35:05',NULL),(6,'Will Childe','wchilde4','wchilde4@cocolog-nifty.com','VzQdtOAIHxXQ','persona','https://robohash.org/eumdoloresreiciendis.png?size=50x50&set=set1','2021-11-04 14:35:05','2021-11-04 11:35:05',NULL),(7,'Thurstan Alywin','talywin5','talywin5@guardian.co.uk','ezhOgG','persona','https://robohash.org/ullamrepudiandaeexercitationem.png?size=50x50&set=set1','2021-11-04 14:35:05','2021-11-04 11:35:05',NULL),(8,'Franky Macklin','fmacklin6','fmacklin6@tripod.com','CR6cI7OYm','persona','https://robohash.org/quisdoloresunt.png?size=50x50&set=set1','2021-11-04 14:35:05','2021-11-04 11:35:05',NULL),(9,'Hayden Keld','hkeld7','hkeld7@nytimes.com','az46Vnr','persona','https://robohash.org/sedmodia.png?size=50x50&set=set1','2021-11-04 14:35:05','2021-11-04 11:35:05',NULL),(10,'Dion Yurivtsev','dyurivtsev8','dyurivtsev8@forbes.com','dXIFEHGm5A','persona','https://robohash.org/doloremquoddeserunt.png?size=50x50&set=set1','2021-11-04 14:35:05','2021-11-04 11:35:05',NULL),(11,'Ania McGuff','amcguff9','amcguff9@rambler.ru','Aw7OCGfgEZ','persona','https://robohash.org/facereearumarchitecto.png?size=50x50&set=set1','2021-11-04 14:35:05','2021-11-04 11:35:05',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'music_box_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-08 22:08:19
