-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Jun 25, 2025 at 09:36 AM
-- Server version: 9.3.0
-- PHP Version: 8.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `GestioneCantieri`
--

-- --------------------------------------------------------

--
-- Table structure for table `aziende`
--

CREATE TABLE `aziende` (
  `id` bigint NOT NULL,
  `ragione_sociale` varchar(255) NOT NULL,
  `natura_giuridica` enum('ditta individuale','societa') NOT NULL,
  `piva` bigint NOT NULL,
  `codice_ateco` varchar(255) NOT NULL,
  `indirizzo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `mappa` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `fk_cantiere` bigint NOT NULL,
  `note` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `aziende`
--

INSERT INTO `aziende` (`id`, `ragione_sociale`, `natura_giuridica`, `piva`, `codice_ateco`, `indirizzo`, `mappa`, `email`, `fk_cantiere`, `note`, `created_at`, `updated_at`) VALUES
(1, 'testNomeAzienda', 'ditta individuale', 111, 'J 58.11.00', 'via TestIndirizzo n. 138', 'googlemaps', 'testNomeAzienda@gmail.com', 1, NULL, '2025-06-18 09:18:58', '2025-06-25 09:02:01'),
(2, 'azienda2', 'societa', 22, 'tat', 'tat', 'tat', 'tat@gmail.com', 1, NULL, '2025-06-25 09:14:10', '2025-06-25 09:14:10');

-- --------------------------------------------------------

--
-- Table structure for table `cantieri`
--

CREATE TABLE `cantieri` (
  `id` bigint NOT NULL,
  `nome` varchar(255) NOT NULL,
  `committente` varchar(255) NOT NULL,
  `cap` int NOT NULL,
  `nazione` varchar(255) NOT NULL,
  `data_inizio_cantiere` date NOT NULL,
  `data_fine_cantiere` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `logo` varchar(255) NOT NULL,
  `pdf` varchar(255) NOT NULL,
  `firma` varchar(255) NOT NULL,
  `note` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `cantieri`
--

INSERT INTO `cantieri` (`id`, `nome`, `committente`, `cap`, `nazione`, `data_inizio_cantiere`, `data_fine_cantiere`, `email`, `logo`, `pdf`, `firma`, `note`, `created_at`, `updated_at`) VALUES
(1, 'CantiereTest', 'Committente Test', 64023, 'Italy', '2025-06-01', '2025-06-19', 'cantieretest@gmail.com', 'logos/logotest.jpg', 'pdf_files/testpdf.pdf', 'firme/firme.jpg', NULL, '2025-06-18 09:11:25', '2025-06-18 09:11:25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `aziende`
--
ALTER TABLE `aziende`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cantiere` (`fk_cantiere`);

--
-- Indexes for table `cantieri`
--
ALTER TABLE `cantieri`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `aziende`
--
ALTER TABLE `aziende`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `cantieri`
--
ALTER TABLE `cantieri`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `aziende`
--
ALTER TABLE `aziende`
  ADD CONSTRAINT `aziende_ibfk_1` FOREIGN KEY (`fk_cantiere`) REFERENCES `cantieri` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
