-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Jun 30, 2025 at 11:55 AM
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
  `natura_giuridica` varchar(255) DEFAULT NULL,
  `piva` bigint NOT NULL,
  `codice_ateco` varchar(255) NOT NULL,
  `indirizzo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `citta` varchar(255) NOT NULL,
  `stato` varchar(255) NOT NULL,
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

INSERT INTO `aziende` (`id`, `ragione_sociale`, `natura_giuridica`, `piva`, `codice_ateco`, `indirizzo`, `citta`, `stato`, `mappa`, `email`, `fk_cantiere`, `note`, `created_at`, `updated_at`) VALUES
(4, 'ta', 'ditta individuale', 12, 'tata', 'Via Roma 1', '', '', '45.5238232 9.3300742', 'gg', 1, NULL, '2025-06-28 14:49:52', '2025-06-29 10:27:58'),
(7, 'tat', 'societa', 1234, 'tat', 'Via Taddeo Landini 14', 'Montelupo Fiorentino', 'Toscana', 'Lat: 0.0 Long: 0.0', 'tat', 1, NULL, '2025-06-28 16:39:44', '2025-06-28 16:39:44'),
(8, 'test', 'ditta individuale', 23, 'test', 'Via Giuseppe Verdi', 'Milano', 'Lombardia', 'Lat: 45.4688097 Long: 9.1884152', 'test', 1, NULL, '2025-06-29 10:15:45', '2025-06-29 10:15:45');

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
  `data_inizio_cantiere` varchar(255) DEFAULT NULL,
  `data_fine_cantiere` varchar(255) DEFAULT NULL,
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
(1, 'CantiereTest', 'Committente Test', 64023, 'Italy', '2025-06-01', '2025-06-19', 'cantieretest@gmail.com', 'logos/logotest.jpg', 'pdf_files/testpdf.pdf', 'firme/firme.jpg', NULL, '2025-06-18 09:11:25', '2025-06-18 09:11:25'),
(2, 'cantiere2', 'committente2', 50056, 'Afghanistan', '2025-06-02', '2025-06-11', 'tat', 'logo/Screenshot from 2025-06-29 12-00-17.png', 'pdf/Screenshot from 2025-06-23 10-10-52.png', 'firma/Screenshot from 2025-06-22 16-36-58.png', NULL, '2025-06-29 11:01:20', '2025-06-29 11:01:20'),
(3, 'tat', 'tat', 22, 'Armenia', '2025-06-03', '2025-06-12', 'tat', '', '', '', NULL, '2025-06-29 11:03:05', '2025-06-29 11:03:05');

-- --------------------------------------------------------

--
-- Table structure for table `credenziali`
--

CREATE TABLE `credenziali` (
  `idC` bigint NOT NULL,
  `user` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `credenziali`
--

INSERT INTO `credenziali` (`idC`, `user`, `password`) VALUES
(1, 'admin', 'admin');

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
-- Indexes for table `credenziali`
--
ALTER TABLE `credenziali`
  ADD PRIMARY KEY (`idC`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `aziende`
--
ALTER TABLE `aziende`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `cantieri`
--
ALTER TABLE `cantieri`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `credenziali`
--
ALTER TABLE `credenziali`
  MODIFY `idC` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
