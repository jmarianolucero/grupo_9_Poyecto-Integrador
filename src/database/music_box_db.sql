CREATE DATABASE  IF NOT EXISTS `music_box_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `music_box_db`;
-- MySQL dump 10.13  Distrib 8.0.26, for macos11 (x86_64)
--
-- Host: localhost    Database: music_box_db
-- ------------------------------------------------------
-- Server version	8.0.21

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
-- Table structure for table `colors`
--

DROP TABLE IF EXISTS `colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colors`
--

LOCK TABLES `colors` WRITE;
/*!40000 ALTER TABLE `colors` DISABLE KEYS */;
INSERT INTO `colors` VALUES (1,'Blanco'),(2,'Negro'),(3,'Rojo'),(4,'Azúl'),(5,'Verde'),(6,'Gris'),(7,'Amarillo'),(8,'Otro');
/*!40000 ALTER TABLE `colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_detail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id_idx` (`order_id`),
  KEY `product_id_idx` (`product_id`),
  CONSTRAINT `order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `price` int NOT NULL,
  `description` longtext,
  `image` varchar(45) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `color_id` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id_idx` (`category_id`),
  KEY `color_id_idx` (`color_id`),
  CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `color_id` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Clarinete Estandar Yamaha Ycl255 Con Boquilla Y Estuche',382499,'adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae','clarinete-yamaha.png',3,3,'2021-11-04 14:55:26','2021-11-05 20:37:41',NULL),(2,'Bateria Mapex Armory 5 Cuerpos Medidas Fusión Bombo 20',373947,'adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae','bateria-mapex.png',2,2,'2021-11-04 14:55:26','2021-11-05 20:37:24',NULL),(3,'Guitarra Electrica Fender Stratocaster Standar Mexico Rsw Sb',349242,'  adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae','1638739799483.png',1,1,'2021-11-04 14:55:26','2021-12-05 21:29:59',NULL),(4,'Auriculares Inalambricos Sennheiser RS120 Bluetooth Cerrados',397599,'adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae','auriculares-inalambricos.png',5,5,'2021-11-04 14:55:26','2021-11-05 20:37:06',NULL),(7,'Flauta traversa',2000000,' hola hola holaaaaaaaaaaaaaaaaaaa','1638981340179.png',3,1,'2021-12-01 16:09:00','2021-12-08 16:35:40',NULL),(11,'Guitarra Criolla',15500,'kvedsngvklsnblknfdgbn','1638377959742.png',1,8,'2021-12-01 16:59:19','2021-12-01 16:59:19',NULL),(13,'Consola de sonido',15500,'aerbgaerbhaewrbt','1638379855041.png',4,6,'2021-12-01 17:30:55','2021-12-01 17:30:55',NULL),(14,'Piano Eléctrico Digital Kawai ES-920B 88 Teclas Pesadas Profesional Bluetooth',28462,'Piano Eléctrico Digital Kawai ES-920B 88 Teclas Pesadas Profesional Bluetooth\r\n\r\nEl Kawai ES920 y ES520 se han diseñado para ofrecer la mejor experiencia de interpretación posible dentro de un piano portátil. Estos elegantes instrumentos son ideales para músicos que buscan un piano que proporcione una auténtica acción de teclado y una selección de sonidos inspiradores, pero que aún se puedan mover fácilmente o colocar en un atractivo mueble sin ocupar demasiado espacio.','1638739567276.png',1,2,'2021-12-05 21:26:07','2021-12-05 21:26:07',NULL),(15,'Placa de Sonido Mackie USB ONYX Artist 1-2',25620,'Ya sea que esté rastreando su última idea de canción o \r\nhaciendo una transmisión en vivo, las interfaces USB de \r\nla serie Onyx brindan un verdadero sonido con calidad de \r\nestudio con el máximo margen y un ruido ultra bajo.\r\n\r\nPerfecto para cantautores y creadores de contenido, el Onyx Artist \r\n1 • 2 ™ cuenta con un preamplificador de micrófono Onyx más una \r\nentrada de ¼ ”con interruptor Hi-Z para una grabación rápida y fácil. \r\n\r\n','1638739928531.png',4,2,'2021-12-05 21:32:08','2021-12-05 21:32:08',NULL),(16,'Armonica Hohner Pro Harp Diatonica 20 Voces En Re - D',9529,'La Pro Harp MS cuenta con innovador diseño de \r\nsistema Modular (MS) que permite intercambiar \r\ncomponentes (cubiertas, placas de lámina y peines) \r\ncon los de cualquier otra armónica Hohner MS, \r\nque permite crear el instrumento perfecto para \r\nadaptarse a sus necesidadesy preferencias.\r\nPeine de ABS negro con placas de lámina empotrada\r\nCubiertas de acero inoxidable lacado negro sin orificios de ventilación lateral\r\nCañas de 20 MS\r\nplacas de lámina de latón de 0,9 mm\r\nTuning: Richter\r\nNúmero de agujeros: 10\r\nLongitud: 10,5 cm\r\nTonalidades: C (Do), D (Re), E (Mi), F (Fa), G (Sol), A (La), B (Si), Bb (Si bemol)\r\nFabricada en Alemania','1638740032770.png',3,6,'2021-12-05 21:33:52','2021-12-05 21:33:52',NULL),(17,'Sistema Gestión De Altavoces Behringer Ultradrive Dcx2496le',106214,'Sistema de gestión de altavoces completo\r\nConectividad flexible con 2 x entradas analógicas y 6 x salidas analógicas\r\nIncreíble rango dinámico e integridad de señal incomparable a través de convertidores premium\r\nProtección optimizada de los altavoces gracias a los limitadores de ataque cero\r\n\r\nToma el control de tus altavoces en cualquier situación. El sistema de gestión de altavoces Ultradrive DCX2496LE es la forma perfecta de gestionar sistemas de varios altavoces con total facilidad. Siéntase liberado por la amplia gama de controles que ofrece la DCX2496LE. Estos incluyen 2 entradas, 6 salidas y convertidores AD / DA premium de 24 bits / 96 kHz. Hay ecualizadores dinámicos precisos y ecualizadores de parámetros musicales que permiten a los ingenieros esculpir su sonido perfecto en todas las entradas y salidas. Este procesador de última generación estará idealmente ubicado en cualquier lugar, desde el cine hasta el santuario y la sala de conciertos, el Ultradrive DCX2496LE hará que su lugar suene increíble.','1638740228994.png',4,1,'2021-12-05 21:37:08','2021-12-05 21:37:08',NULL),(18,'Set Micrófono Shure 55SHSERIESII Soporte Gravity GMS23W y Cable',122848,'Set Micrófono Shure 55SHSERIESII Soporte Gravity GMS23W y Cable Canon Plug Bonificado\r\n\r\nShure 55SHSERIESII\r\n-Modelo \'Elvismic\'\r\n-Patrón polar cardioide\r\n-Interruptor de encendido/apagado\r\n-Adaptador de micrófono incorporado en la propia carcasa\r\n-Respuesta de frecuencia optimizada para thomann el habla y la voz\r\n-Fabricado en aluminio fundido sólido y resistente\r\n-Adaptador giratorio que permite hasta 45 grados de inclinación hacia adelante y 80 grados hacia atrás\r\n-Respuesta en frecuencia: 50Hz - 15kHz\r\n-Impedancia de 150 Ohmios\r\n-Sensibilidad: -58,0 dBV/Pa (1,3mV)\r\n-Incluye adaptador para soporte de micrófono con rosca de 5/8\"\r\n-Tamaño: 188mm de thomann largo aproximadamente\r\n-Peso: 624g','1638740327149.png',5,8,'2021-12-05 21:38:47','2021-12-05 21:38:47',NULL),(32,'Bajo Electrico Leonard Lb252 Tipo Precision De 4 Cuerdas',29198,'Bajo Eléctrico Tipo Precision Leonard LB252 de 4 Cuerdas\r\n\r\nLeonard nos presenta este bajo Precision, robusto, cómodo y con una excelente sonoridad.\r\n','1638997178140.png',1,NULL,'2021-12-08 20:59:38','2021-12-08 20:59:38',NULL),(33,'Sistema De Sonido Db Technologies St 1000w Bluetooth Es 503',315410,'\r\nSistema de sonido estéreo triamplificado\r\n\r\nCompuesto por 2 altavoces satélites y 1 subwoofer de 12\"\r\nEl subwoofer alberga un módulo amplificador de potencia de 1000W con fuente de alimentación de rango automático, más un mezclador de 3 canales con conexión Bluetooth®\r\nUn potente DSP controlado mediante un interfaz de usuario avanzado con una pantalla OLED que gestiona tanto la cobertura de sistema al completo así como todas las funciones del mezclador, haciendo del ES503 una gema auténtica en términos de rendimiento de sonido y versatilidad\r\nIncluye poste telescópico M20, 1 cable Speaker Twist, fundas opcionales a juego para subwoofer ES TC-E12 (artículo nº373941) y para las cabinas TC-ESTOP\r\n\r\nCaracterísticas principales\r\nAltavoz de 4x3\" de Gama Completa y Subwoofer de 12\"\r\nMezclador Digital de 3 Canales con Conectividad Bluetooth\r\nProcesador DSP Potente, 6 Presets de Fábrica y 3 de Usuario\r\n1 Combo (XLR/Jack) y 1 Entrada RCA Estérea\r\nIncluye Barra y Cable SpeakON\r\n','1638997318509.png',4,NULL,'2021-12-08 21:01:58','2021-12-08 21:01:58',NULL),(34,'Cable Profesional Ddrum Xlr Plug 4,5 Metros Microfono Canon',4391,'Cables XLR - Mono Plug DDrum 6999 MH2V-15 \r\n\r\nLos cables ddrum con conexión XLR segura le brinda conectividad perfecta y tranquilidad. La elección perfecta para el escenario y el estudio.\r\n\r\nCaracterísticas:\r\n-Cables XLR a Jack de 1/4 de pulgada\r\n-Alta resistencia y durabilidad\r\n-4,5 mt de largo\r\n-PIN 2 HOT\r\n','1638997431147.png',5,NULL,'2021-12-08 21:03:51','2021-12-08 21:03:51',NULL),(35,'Batería Eléctrica Doble Zona Alesis Crimson II 5 Cuerpos',324678,'Características: \r\n-Marca: Alesis\r\n-Modelo: Crimson II\r\n-2 Toms Doble-Zona Mesh 8\"\r\n-1 Tom Doble Zona Mesh 10\"\r\n-Tambor Doble Zona Mesh 12\"\r\n-Bombo 8\" Mesh\r\n-Hi-Hat DMPad 12\"\r\n-2 Crashes DMPad 12\" con Choke\r\n-Ride DMPad Triple Zone 14\"\r\n-Pedal Hi-Hat DM\r\n-Rack Premium 4-Post Quick Lock Cromado\r\n-Soporte Tambor\r\n-Modulo Crimson II\r\n-74 Kits (54 Presets de Fabrica + 20 de Usuario) y 671 Sonidos \r\n-Carga de Samples .WAV o .MP3 via USB memory stick\r\n-Grabación en tiempo real (5 tracks internamente y hasta 99 tracks vía USB memory stick)\r\n-Conexión USB/MIDI para DAW & Instrumentos Virtuales\r\n-Fuente de alimentación\r\n-Envoltorios de cables\r\n-Llave de tambor\r\n-Baquetas\r\n-Guía del usuario\r\n-Guía de ensamblaje del kit \r\n-Manual de seguridad y garantía\r\n\r\n','1638997605772.png',2,NULL,'2021-12-08 21:06:45','2021-12-08 21:06:45',NULL),(36,'Pack Ukelele Soprano Cordoba + Afinador Libro Funda Puas',19602,'Características:\r\n-Tamaño de Cuerpo: Soprano\r\n-Cuerpo completo de Caoba\r\n-Construcción Laminado\r\n-Diseño de arco grabado con láser\r\n-Mástil de Caoba\r\n-Forma de mango \"C\"\r\n-Anco de cejuela: 35mm\r\n-Inlays en diapasón de puntos perlados\r\n-Trastes: 16\r\n-Color: Natural\r\n-Acabado Satinado Poliuretano\r\n-Cuerdas: Aquila New Nylgut Soprano 4U\r\n-Incluye Funda, Afinador, Libro de lecciones, Púas y Encordado Extra\r\n-Origen de fabricación: China\r\n','1638997920038.png',1,NULL,'2021-12-08 21:12:00','2021-12-08 21:12:00',NULL),(37,'Arreglo general de instrumentos',2000,'Arreglamos todo tipo de instrumentos. Consultanos.','1639150253110.png',6,NULL,'2021-12-10 15:30:53','2021-12-10 15:30:53',NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(45) NOT NULL,
  `user_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `category` varchar(45) DEFAULT NULL,
  `avatar` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Martín González','mgonz','mgonzalez@gmail.com','a73kgfb4mgvk5','persona','img-user1','2021-11-01 23:08:55','2021-11-01 20:10:38',NULL),(2,'Phyllys Howel','phowel0','phowel0@sciencedaily.com','FjXpfV2','persona','https://robohash.org/reprehenderitofficiasit.png?size=50x50&set=set1','2021-11-04 14:35:05','2021-11-04 11:35:05',NULL),(3,'Marlyn Childerley','mchilderley1','mchilderley1@economist.com','hIDpUD0Z','persona','https://robohash.org/etdoloreveniet.png?size=50x50&set=set1','2021-11-04 14:35:05','2021-11-04 11:35:05',NULL),(4,'Sybil Farrin','sfarrin2','sfarrin2@examiner.com','WWTF5zeHY','persona','https://robohash.org/quifacilistemporibus.png?size=50x50&set=set1','2021-11-04 14:35:05','2021-11-04 11:35:05',NULL),(5,'Ruy Antat','rantat3','rantat3@bing.com','h3vyn7Q','persona','https://robohash.org/faciliscorporisaut.png?size=50x50&set=set1','2021-11-04 14:35:05','2021-11-04 11:35:05',NULL),(6,'Will Childe','wchilde4','wchilde4@cocolog-nifty.com','VzQdtOAIHxXQ','persona','https://robohash.org/eumdoloresreiciendis.png?size=50x50&set=set1','2021-11-04 14:35:05','2021-11-04 11:35:05',NULL),(7,'Thurstan Alywin','talywin5','talywin5@guardian.co.uk','ezhOgG','persona','https://robohash.org/ullamrepudiandaeexercitationem.png?size=50x50&set=set1','2021-11-04 14:35:05','2021-11-04 11:35:05',NULL),(8,'Franky Macklin','fmacklin6','fmacklin6@tripod.com','CR6cI7OYm','persona','https://robohash.org/quisdoloresunt.png?size=50x50&set=set1','2021-11-04 14:35:05','2021-11-04 11:35:05',NULL),(9,'Hayden Keld','hkeld7','hkeld7@nytimes.com','az46Vnr','persona','https://robohash.org/sedmodia.png?size=50x50&set=set1','2021-11-04 14:35:05','2021-11-04 11:35:05',NULL),(10,'Dion Yurivtsev','dyurivtsev8','dyurivtsev8@forbes.com','dXIFEHGm5A','persona','https://robohash.org/doloremquoddeserunt.png?size=50x50&set=set1','2021-11-04 14:35:05','2021-11-04 11:35:05',NULL),(11,'Ania McGuff','amcguff9','amcguff9@rambler.ru','Aw7OCGfgEZ','persona','https://robohash.org/facereearumarchitecto.png?size=50x50&set=set1','2021-11-04 14:35:05','2021-11-04 11:35:05',NULL),(12,'Mariana Fernandez','marfernan','marfernan@gmail.com','$2a$10$cSGdo1KYpnvVtNQODgYiFuJ1zIKcUIQ0hKwOPr5c2puMFXJ69U4iS',NULL,'1637534932629.png','2021-11-21 22:48:52','2021-11-21 22:48:52',NULL),(13,'Tomas Volton','tvolton','tvolton@gmail.com','$2a$10$GaXj/Kryt3ivVQG6dxHdSefMbuO6GLvolKDuuECfcPU1vdGVBUHRi',NULL,'1637537620143.png','2021-11-21 23:33:40','2021-12-05 18:53:11',NULL),(14,'Mariano','msim','msimantob@gmail.com','$2a$10$mQ8vnfc4ans.B8LW1W0QHuo4EKFWtkw8hPGGHucnbUXNwb0SRwOm2',NULL,'1638322534027.png','2021-12-01 01:35:34','2021-12-01 01:35:34',NULL),(15,'Lucas Nicolo','lnicolo','lnicolo@gmail.com','$2a$10$qXeoCsjSWCgsw08MvBtUS.vdubZLWDevaPVfn0SK6KWB0x8BUw4hi',NULL,'1638382346383.png','2021-12-01 18:12:26','2021-12-01 18:12:26',NULL),(16,'Lucas Martinez','lmartinez','lmartinez@gmail.com','$2a$10$hXICq/QYsbMcSDS7uLYGv.98iA1tnk5aAytCiy33XvPfJH7pfqXqm',NULL,'1638474100490.png','2021-12-02 19:41:40','2021-12-02 19:41:40',NULL),(17,'Jonathan Mariano Morel','jmorel','jmmorel@gmail.com','$2a$10$91HI4MqhV.3AldLmdWzPc.SPSBKzBEmmIdAkYoC1hWQU7PDty5Gci','admin','1638829575281.png','2021-12-06 22:26:15','2021-12-12 20:03:08',NULL),(18,'Andres Sueyro','asueyro','asueyro@gmail.com','$2a$10$qsLzBc2NK4xiMCsHWz.lQ.d5iLI7/kVq3ni1fcLPDoCNDouaurhQ6','admin','1638829670130.png','2021-12-06 22:27:50','2021-12-12 20:03:38',NULL),(20,'Mariano Simantob','msim','msim@gmail.com','$2a$10$UWsI3OWO8xktLue5Hi.FGu78EkCBmgurD6BjT38cc3F6Q5CVitmk6','admin','1639353281705.png','2021-12-08 20:30:10','2021-12-12 23:54:41',NULL),(21,'Darío Martinez','dmartinez','dmartinez@gmail.com','$2a$10$usf2saOCbziBsLKQYiZfY.9NEo46TfbDKdvGPpouYvndu.mSUewcu',NULL,'1639350994867.png','2021-12-12 23:16:34','2021-12-12 23:16:34',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-13 14:15:55
