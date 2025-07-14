-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Creato il: Lug 14, 2025 alle 14:55
-- Versione del server: 9.3.0
-- Versione PHP: 8.2.28

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
-- Struttura della tabella `aziende`
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
-- Dump dei dati per la tabella `aziende`
--

INSERT INTO `aziende` (`id`, `ragione_sociale`, `natura_giuridica`, `piva`, `codice_ateco`, `indirizzo`, `citta`, `stato`, `mappa`, `email`, `fk_cantiere`, `note`, `created_at`, `updated_at`) VALUES
(4, 'ta', 'ditta individuale', 12, 'tata', 'Via Roma 1', '', '', '45.5238232 9.3300742', 'gg', 1, NULL, '2025-06-28 14:49:52', '2025-06-29 10:27:58'),
(8, 'test', 'ditta individuale', 23, 'test', 'Via Giuseppe Verdi', 'Milano', 'Lombardia', 'Lat: 45.4688097 Long: 9.1884152', 'test', 1, NULL, '2025-06-29 10:15:45', '2025-06-29 10:15:45');

-- --------------------------------------------------------

--
-- Struttura della tabella `cantieri`
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
-- Dump dei dati per la tabella `cantieri`
--

INSERT INTO `cantieri` (`id`, `nome`, `committente`, `cap`, `nazione`, `data_inizio_cantiere`, `data_fine_cantiere`, `email`, `logo`, `pdf`, `firma`, `note`, `created_at`, `updated_at`) VALUES
(1, 'CantiereTest', 'Committente Test', 64023, 'Italy', '2025-06-01', '2025-06-19', 'cantieretest@gmail.com', 'logos/logotest.jpg', 'pdf_files/testpdf.pdf', 'firme/firme.jpg', NULL, '2025-06-18 09:11:25', '2025-06-18 09:11:25'),
(2, 'cantiere2', 'committente2', 50056, 'Afghanistan', '2025-06-02', '2025-06-11', 'tat', 'logo/Screenshot from 2025-06-29 12-00-17.png', 'pdf/Screenshot from 2025-06-23 10-10-52.png', 'firma/Screenshot from 2025-06-22 16-36-58.png', NULL, '2025-06-29 11:01:20', '2025-06-29 11:01:20'),
(3, 'tat', 'tat', 22, 'Armenia', '2025-06-03', '2025-06-12', 'tat', '', '', '', NULL, '2025-06-29 11:03:05', '2025-06-29 11:03:05');

-- --------------------------------------------------------

--
-- Struttura della tabella `credenziali`
--

CREATE TABLE `credenziali` (
  `idC` bigint NOT NULL,
  `user` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `credenziali`
--

INSERT INTO `credenziali` (`idC`, `user`, `password`) VALUES
(1, 'admin', 'admin');

-- --------------------------------------------------------

--
-- Struttura della tabella `dipendenti`
--

CREATE TABLE `dipendenti` (
  `id` bigint NOT NULL,
  `nome` varchar(255) NOT NULL,
  `cognome` varchar(255) NOT NULL,
  `data_nascita` date NOT NULL,
  `nazionalita` varchar(255) NOT NULL,
  `codice_fiscale` varchar(255) NOT NULL,
  `sesso` enum('M','F') NOT NULL,
  `fk_azienda` bigint NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `notes` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `dipendenti`
--

INSERT INTO `dipendenti` (`id`, `nome`, `cognome`, `data_nascita`, `nazionalita`, `codice_fiscale`, `sesso`, `fk_azienda`, `created_at`, `updated_at`, `notes`) VALUES
(2, 'Sebastian', 'May', '2005-09-17', 'Italiano', 'test', 'F', 4, '2025-07-14 10:01:54', '2025-07-14 10:38:16', NULL);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `aziende`
--
ALTER TABLE `aziende`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cantiere` (`fk_cantiere`);

--
-- Indici per le tabelle `cantieri`
--
ALTER TABLE `cantieri`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `credenziali`
--
ALTER TABLE `credenziali`
  ADD PRIMARY KEY (`idC`);

--
-- Indici per le tabelle `dipendenti`
--
ALTER TABLE `dipendenti`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_azienda` (`fk_azienda`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `aziende`
--
ALTER TABLE `aziende`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT per la tabella `cantieri`
--
ALTER TABLE `cantieri`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT per la tabella `credenziali`
--
ALTER TABLE `credenziali`
  MODIFY `idC` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT per la tabella `dipendenti`
--
ALTER TABLE `dipendenti`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `aziende`
--
ALTER TABLE `aziende`
  ADD CONSTRAINT `aziende_ibfk_1` FOREIGN KEY (`fk_cantiere`) REFERENCES `cantieri` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `dipendenti`
--
ALTER TABLE `dipendenti`
  ADD CONSTRAINT `dipendenti_ibfk_1` FOREIGN KEY (`fk_azienda`) REFERENCES `aziende` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
