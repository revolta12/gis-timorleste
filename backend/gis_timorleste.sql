-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 02, 2026 at 07:52 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gis_timorleste`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity_logs`
--

CREATE TABLE `activity_logs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `action` varchar(50) NOT NULL,
  `entity_type` varchar(50) DEFAULT NULL,
  `entity_id` int(11) DEFAULT NULL,
  `detail` text DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activity_logs`
--

INSERT INTO `activity_logs` (`id`, `user_id`, `action`, `entity_type`, `entity_id`, `detail`, `ip_address`, `created_at`) VALUES
(1, NULL, 'LOGIN', 'user', 1, 'Admin Sistema login', '::1', '2026-04-26 06:18:38'),
(2, NULL, 'CREATE', 'news', 1, 'Kria notísia \"Aprova Osan Stadu\"', '::1', '2026-04-26 06:20:50'),
(3, NULL, 'LOGIN', 'user', 1, 'Admin Sistema login', '::1', '2026-04-26 06:24:19'),
(4, NULL, 'CREATE', 'news', 2, 'Kria notísia \"PN Aprova Ona OJE 2026 ba VISE-PM no ... - Portal MKAE\"', '::1', '2026-04-26 06:25:50'),
(5, NULL, 'LOGIN', 'user', 1, 'Admin Sistema login', '::1', '2026-04-26 06:29:10'),
(6, NULL, 'LOGIN', 'user', 1, 'Admin Sistema login', '::1', '2026-04-26 06:41:39'),
(7, NULL, 'LOGIN', 'user', 1, 'Admin Sistema login', '::1', '2026-04-26 06:44:53'),
(8, NULL, 'LOGIN', 'user', 1, 'Admin Sistema login', '::1', '2026-04-26 07:00:04'),
(9, NULL, 'UPDATE', 'settings', NULL, 'Atualiza konfigurasaun sistema', '::1', '2026-04-26 07:08:35'),
(10, NULL, 'LOGIN', 'user', 1, 'Admin Sistema login', '::1', '2026-04-26 07:08:55'),
(11, NULL, 'UPDATE', 'news', 2, 'Atualiza notísia \"PN Aprova Ona OJE 2026 ba VISE-PM no ... - Portal MKAE\"', '::1', '2026-04-26 07:24:59'),
(12, NULL, 'UPDATE', 'news', 2, 'Atualiza notísia \"PN Aprova Ona OJE 2026 ba VISE-PM no ... - Portal MKAE\"', '::1', '2026-04-26 07:25:50'),
(13, NULL, 'UPDATE', 'ministry', 11, 'Atualiza ministériu \"ministerio finansas\"', '::1', '2026-04-26 07:43:29'),
(14, NULL, 'UPDATE', 'ministry', 11, 'Atualiza ministériu \"ministerio finansas\"', '::1', '2026-04-26 07:44:53'),
(15, NULL, 'UPDATE', 'ministry', 11, 'Atualiza ministériu \"ministerio finansas\"', '::1', '2026-04-26 07:46:50'),
(16, NULL, 'LOGIN', 'user', 1, 'Admin Sistema login', '::1', '2026-04-26 07:53:27'),
(17, NULL, 'UPDATE', 'ministry', 11, 'Atualiza ministériu \"ministerio finansas\"', '::1', '2026-04-26 07:53:47'),
(18, NULL, 'UPDATE', 'ministry', 11, 'Atualiza ministériu \"ministerio finansas\"', '::1', '2026-04-26 08:00:04'),
(19, NULL, 'UPDATE', 'news', 2, 'Atualiza notísia \"PN Aprova Ona OJE 2026 ba VISE-PM no ... - Portal MKAE\"', '::1', '2026-04-26 08:15:03'),
(20, NULL, 'UPDATE', 'ministry', 11, 'Atualiza ministériu \"ministerio finansas\"', '::1', '2026-04-26 08:16:11'),
(21, NULL, 'UPDATE', 'ministry', 11, 'Atualiza ministériu \"ministerio finansas\"', '::1', '2026-04-26 08:17:20'),
(22, NULL, 'UPDATE', 'news', 2, 'Atualiza notísia \"PN Aprova Ona OJE 2026 ba VISE-PM no ... - Portal MKAE\"', '::1', '2026-04-26 08:27:57'),
(23, NULL, 'LOGIN', 'user', 1, 'Admin Sistema login', '::1', '2026-04-26 08:34:54'),
(24, NULL, 'UPDATE', 'ministry', 11, 'Atualiza ministériu \"ministerio finansas\"', '::1', '2026-04-26 08:40:32'),
(25, NULL, 'LOGIN', 'user', 1, 'Admin Sistema login', '::1', '2026-04-26 08:40:56'),
(26, NULL, 'UPDATE', 'ministry', 11, 'Atualiza ministériu \"ministerio finansas\"', '::1', '2026-04-26 08:42:59'),
(27, NULL, 'UPDATE', 'ministry', 11, 'Atualiza ministériu \"ministerio finansas\"', '::1', '2026-04-26 08:43:14'),
(28, NULL, 'UPDATE', 'ministry', 11, 'Atualiza ministériu \"ministerio finansas\"', '::1', '2026-04-26 08:55:36'),
(29, NULL, 'LOGIN', 'user', 1, 'Admin Sistema login', '::1', '2026-04-26 08:56:18'),
(30, NULL, 'UPDATE', 'ministry', 11, 'Atualiza ministériu \"ministerio finansas\"', '::1', '2026-04-26 08:56:46'),
(31, NULL, 'DELETE', 'ministry', 11, 'Desativa ministériu \"ministerio finansas\"', '::1', '2026-04-26 08:57:10'),
(32, NULL, 'LOGIN', 'user', 1, 'Admin Sistema login', '::1', '2026-04-26 09:01:09'),
(33, NULL, 'CREATE', 'ministry', 16, 'Kria ministériu \"MINISTERIO\"', '::1', '2026-04-26 09:24:16'),
(34, NULL, 'DELETE', 'ministry', 16, 'Desativa ministériu \"MINISTERIO\"', '::1', '2026-04-26 09:24:54'),
(35, NULL, 'LOGIN', 'user', 1, 'Admin Sistema login', '::1', '2026-04-26 09:44:01'),
(36, NULL, 'CREATE', 'ministry', 18, 'Kria ministériu \"Ministériu Finansas Timor-Leste\"', '::1', '2026-04-26 10:14:28'),
(37, NULL, 'UPDATE', 'ministry', 18, 'Atualiza ministériu \"Ministériu Finansas Timor-Leste\"', '::1', '2026-04-26 10:15:01'),
(38, NULL, 'UPDATE', 'ministry', 18, 'Atualiza ministériu \"Ministériu Finansas Timor-Leste\"', '::1', '2026-04-26 10:15:14'),
(39, NULL, 'UPDATE', 'ministry', 18, 'Atualiza ministériu \"Ministériu Finansas Timor-Leste\"', '::1', '2026-04-26 10:15:22'),
(40, NULL, 'UPDATE', 'news', 2, 'Atualiza notísia \"Banco Central de Timor-Leste (BCTL)\"', '::1', '2026-04-26 10:23:04'),
(41, NULL, 'LOGIN', 'user', 1, 'Admin Sistema login', '::1', '2026-04-26 10:47:00'),
(42, NULL, 'LOGIN', 'user', 1, 'Admin Sistema login', '::1', '2026-04-26 10:58:55'),
(43, NULL, 'LOGIN', 'user', 1, 'Admin Sistema login', '::1', '2026-04-26 12:36:39'),
(44, NULL, 'UPDATE', 'ministry', 18, 'Atualiza ministériu \"Ministériu Finansas Timor-Leste\"', '::1', '2026-04-26 12:38:55'),
(45, NULL, 'CREATE', 'ministry', 19, 'Kria ministériu \"Ministériu Justisa (MJ).\"', '::1', '2026-04-26 12:46:48'),
(46, NULL, 'CREATE', 'ministry', 20, 'Kria ministériu \"Ministériu Edukasaun (ME)\"', '::1', '2026-04-26 12:56:28'),
(47, NULL, 'CREATE', 'ministry', 21, 'Kria ministériu \"Ministériu Turizmu no Ambiente\"', '::1', '2026-04-26 13:09:50'),
(48, NULL, 'CREATE', 'ministry', 22, 'Kria ministériu \"Ministerio do Interior\"', '::1', '2026-04-26 13:17:10'),
(49, NULL, 'LOGIN', 'user', 1, 'Admin Sistema login', '::1', '2026-04-26 13:20:54'),
(50, NULL, 'DELETE', 'user', 3, 'Hamos user \"Visitor\"', '::1', '2026-04-26 13:21:19'),
(51, NULL, 'DELETE', 'user', 2, 'Hamos user \"Editor Primeiru\"', '::1', '2026-04-26 13:21:22'),
(52, NULL, 'CREATE', 'user', 5, 'Kria user foun \"Deonisio da Costa\"', '::1', '2026-04-26 13:22:06'),
(53, 5, 'LOGIN', 'user', 5, 'Deonisio da Costa login', '::1', '2026-04-26 13:22:26'),
(54, 5, 'DELETE', 'user', 1, 'Hamos user \"Admin Sistema\"', '::1', '2026-04-26 13:22:37'),
(55, 5, 'LOGIN', 'user', 5, 'Deonisio da Costa login', '::1', '2026-04-26 13:25:26'),
(56, 5, 'LOGIN', 'user', 5, 'Deonisio da Costa login', '::1', '2026-04-26 13:27:28'),
(57, 5, 'DELETE', 'user', 4, 'Hamos user \"viewer@deo\"', '::1', '2026-04-26 13:27:47'),
(58, 5, 'CREATE', 'ministry', 23, 'Kria ministériu \"Ministerio do Interior dili\"', '::1', '2026-04-26 13:41:11'),
(59, 5, 'LOGIN', 'user', 5, 'Deonisio da Costa login', '::1', '2026-04-26 13:44:34'),
(60, 5, 'UPDATE', 'ministry', 23, 'Atualiza ministériu \"Ministerio do Interior dili\"', '::1', '2026-04-26 14:32:13'),
(61, 5, 'UPDATE', 'ministry', 36, 'Atualiza ministériu \"Ministeriu Administrasaun Estatal\"', '::1', '2026-04-26 15:00:34'),
(62, 5, 'DELETE', 'ministry', 37, 'Hamos ministériu \"Ministériu Saúde\"', '::1', '2026-04-26 15:00:59'),
(63, 5, 'DELETE', 'ministry', 36, 'Hamos ministériu \"Ministeriu Administrasaun Estatal\"', '::1', '2026-04-26 15:01:02'),
(64, 5, 'DELETE', 'ministry', 41, 'Hamos ministériu \"Ministeriu Defeza\"', '::1', '2026-04-26 15:01:08'),
(65, 5, 'DELETE', 'ministry', 42, 'Hamos ministériu \"Ministériu Petróleo no Rekursu Minerais\"', '::1', '2026-04-26 15:01:11'),
(66, 5, 'DELETE', 'ministry', 38, 'Hamos ministériu \"Ministériu Edukasaun\"', '::1', '2026-04-26 15:01:14'),
(67, 5, 'DELETE', 'ministry', 34, 'Hamos ministériu \"Minist?riu Finansas\"', '::1', '2026-04-26 15:01:16'),
(68, 5, 'DELETE', 'ministry', 40, 'Hamos ministériu \"Minist?riu Interior\"', '::1', '2026-04-26 15:01:18'),
(69, 5, 'DELETE', 'ministry', 43, 'Hamos ministériu \"Minist?riu Justisa\"', '::1', '2026-04-26 15:01:20'),
(70, 5, 'DELETE', 'ministry', 35, 'Hamos ministériu \"Minist?riu Neg?sius Estranjeirus no Kooperasaun\"', '::1', '2026-04-26 15:01:22'),
(71, 5, 'DELETE', 'ministry', 39, 'Hamos ministériu \"Minist?riu Obras P?blikas\"', '::1', '2026-04-26 15:01:25'),
(72, 5, 'LOGIN', 'user', 5, 'Deonisio da Costa login', '::1', '2026-04-26 15:21:03'),
(73, 5, 'LOGIN', 'user', 5, 'Deonisio da Costa login', '::1', '2026-04-26 15:36:15'),
(74, 5, 'LOGIN', 'user', 5, 'Deonisio da Costa login', '::1', '2026-04-26 15:58:39'),
(75, 5, 'LOGIN', 'user', 5, 'Deonisio da Costa login', '::1', '2026-04-27 02:27:10'),
(76, 5, 'CREATE', 'ministry', 44, 'Kria ministériu \"Ministry of Finance\"', '::1', '2026-04-27 02:34:14'),
(77, 5, 'CREATE', 'news', 3, 'Kria notísia \"Merkadu Finanseiru Tun-Sa\'e Timor Lakon Billaun $1.9\"', '::1', '2026-04-27 02:39:43'),
(78, 5, 'LOGIN', 'user', 5, 'Deonisio da Costa login', '::1', '2026-04-27 02:39:56'),
(79, 5, 'LOGIN', 'user', 5, 'Deonisio da Costa login', '::1', '2026-04-27 02:45:25'),
(80, 5, 'LOGIN', 'user', 5, 'Deonisio da Costa login', '::1', '2026-04-27 02:51:22'),
(81, 5, 'LOGIN', 'user', 5, 'Deonisio da Costa login', '::1', '2026-05-02 12:53:25'),
(82, 5, 'LOGIN', 'user', 5, 'Deonisio da Costa login', '::1', '2026-05-02 12:56:21'),
(83, 5, 'LOGIN', 'user', 5, 'Deonisio da Costa login', '::1', '2026-05-02 12:57:49'),
(84, 5, 'CREATE', 'category', 12, 'Kria kategoria \"Ministério da Defesa\"', '::1', '2026-05-02 13:02:02'),
(85, 5, 'CREATE', 'ministry', 45, 'Kria ministériu \"Ministério da Defesa\"', '::1', '2026-05-02 13:05:28'),
(86, 5, 'CREATE', 'ministry', 46, 'Kria ministériu \"Ministério do Petróleo e Minerais\"', '::1', '2026-05-02 13:13:12'),
(87, 5, 'CREATE', 'ministry', 47, 'Kria ministériu \"Ministério da Educação\"', '::1', '2026-05-02 13:30:46'),
(88, 5, 'CREATE', 'category', 13, 'Kria kategoria \"Administração Pública\"', '::1', '2026-05-02 13:32:41'),
(89, 5, 'CREATE', 'ministry', 48, 'Kria ministériu \"Ministério da Administração Estatal\"', '::1', '2026-05-02 13:35:56'),
(90, 5, 'CREATE', 'ministry', 49, 'Kria ministériu \"Ministério das Obras Públicas\"', '::1', '2026-05-02 13:41:07'),
(91, 5, 'CREATE', 'ministry', 50, 'Kria ministériu \"Ministério da Justiça\"', '::1', '2026-05-02 13:43:36'),
(92, 5, 'CREATE', 'ministry', 51, 'Kria ministériu \" Ministério do Ensino Superior, Ciência e Cultura\"', '::1', '2026-05-02 13:47:47'),
(93, 5, 'CREATE', 'ministry', 52, 'Kria ministériu \"Ministério da Juventude, Desporto, Arte e Cultura\"', '::1', '2026-05-02 13:51:38'),
(94, 5, 'LOGIN', 'user', 5, 'Deonisio da Costa login', '::1', '2026-05-02 13:54:33'),
(95, 5, 'CREATE', 'news', 4, 'Kria notísia \"Ministru Defesa Hala\'o Vizita Traballu ba Fronteira\"', '::1', '2026-05-02 13:56:20'),
(96, 5, 'CREATE', 'news', 10, 'Kria notísia \"Ministru Defesa Hala\'o Vizita Traballu ba Fronteira\"', '::1', '2026-05-02 14:04:48'),
(97, 5, 'CREATE', 'news', 11, 'Kria notísia \" MPM Lansa Konkursu Públiku ba Esplorasaun Minerais\"', '::1', '2026-05-02 14:05:59'),
(98, 5, 'DELETE', 'news', 10, 'Hamos notísia \"Ministru Defesa Hala\'o Vizita Traballu ba Fronteira\"', '::1', '2026-05-02 14:08:58'),
(99, 5, 'CREATE', 'news', 13, 'Kria notísia \"MPM Lansa Konkursu Públiku ba Esplorasaun Minerais\"', '::1', '2026-05-02 14:09:37'),
(100, 5, 'CREATE', 'news', 14, 'Kria notísia \"MNEC no Austrália Hametin Kooperasaun Bilaterál\"', '::1', '2026-05-02 14:10:36'),
(101, 5, 'UPDATE', 'news', 14, 'Atualiza notísia \"MNEC no Austrália Hametin Kooperasaun Bilaterál\"', '::1', '2026-05-02 14:15:55'),
(102, 5, 'UPDATE', 'news', 13, 'Atualiza notísia \"MPM Lansa Konkursu Públiku ba Esplorasaun Minerais\"', '::1', '2026-05-02 14:18:13'),
(103, 5, 'LOGIN', 'user', 5, 'Deonisio da Costa login', '::1', '2026-05-02 14:34:05'),
(104, 5, 'LOGIN', 'user', 5, 'Deonisio da Costa login', '::1', '2026-05-02 14:37:15'),
(105, 5, 'LOGIN', 'user', 5, 'Deonisio da Costa login', '::1', '2026-05-02 14:58:47'),
(106, 5, 'LOGIN', 'user', 5, 'Deonisio da Costa login', '::1', '2026-05-02 15:13:47'),
(107, 5, 'LOGIN', 'user', 5, 'Deonisio da Costa login', '::1', '2026-05-02 15:14:22'),
(108, 5, 'UPDATE', 'news', 14, 'Atualiza notísia \"MNEC no Austrália Hametin Kooperasaun Bilaterál\"', '::1', '2026-05-02 15:14:41'),
(109, 5, 'LOGIN', 'user', 5, 'Deonisio da Costa login', '::1', '2026-05-02 15:23:37'),
(110, 5, 'UPDATE', 'settings', NULL, 'Atualiza konfigurasaun sistema', '::1', '2026-05-02 15:32:37'),
(111, 5, 'LOGIN', 'user', 5, 'Deonisio da Costa login', '::1', '2026-05-02 15:33:34'),
(112, 5, 'DELETE', 'faq', 1, 'Hamos FAQ: \"Oinsá atu hetan lokál ministériu?\"', '::1', '2026-05-02 15:55:54'),
(113, 5, 'LOGIN', 'user', 5, 'Deonisio da Costa login', '::1', '2026-05-02 16:03:34'),
(114, 5, 'DELETE', 'faq', 4, 'Hamos FAQ: \"Sistema ne\'e grátis?\"', '::1', '2026-05-02 16:13:06'),
(115, 5, 'DELETE', 'faq', 2, 'Hamos FAQ: \"Ministériu saida mak iha sistema ne\'e?\"', '::1', '2026-05-02 16:13:09'),
(116, 5, 'DELETE', 'faq', 3, 'Hamos FAQ: \"Oinsá atu kontaktu ministériu?\"', '::1', '2026-05-02 16:13:13');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `color` varchar(7) DEFAULT '#3b82f6',
  `icon` varchar(50) DEFAULT 'Building2',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `color`, `icon`, `created_at`, `updated_at`) VALUES
(1, 'Assuntu Internu', 'assuntu-internu', 'Ministériu ne\'ebé responsável ba asuntu internu rai laran', '#3b82f6', 'Shield', '2026-04-26 03:47:14', '2026-04-26 03:47:14'),
(2, 'Saúde', 'saude', 'Ministériu Saúde nian', '#10b981', 'Heart', '2026-04-26 03:47:14', '2026-04-26 03:47:14'),
(3, 'Edukasaun', 'edukasaun', 'Ministériu Edukasaun no Ensinu Superior', '#8b5cf6', 'GraduationCap', '2026-04-26 03:47:14', '2026-04-26 03:47:14'),
(4, 'Finansas', 'finansas', 'Ministériu Finansas nian', '#f59e0b', 'Wallet', '2026-04-26 03:47:14', '2026-04-26 03:47:14'),
(5, 'Lei no Justisa', 'lei-no-justisa', 'Ministériu Justisa nian', '#ef4444', 'Scale', '2026-04-26 03:47:14', '2026-04-26 03:47:14'),
(6, 'Agrikultura', 'agrikultura', 'Ministériu Agrikultura no Peska', '#22c55e', 'Sprout', '2026-04-26 03:47:14', '2026-04-26 03:47:14'),
(7, 'Infraestrutura', 'infraestrutura', 'Ministériu Infraestrutura nian', '#f97316', 'HardHat', '2026-04-26 03:47:14', '2026-04-26 03:47:14'),
(8, 'Ambiente', 'ambiente', 'Ministériu Ambiente nian', '#06b6d4', 'Leaf', '2026-04-26 03:47:14', '2026-04-26 03:47:14'),
(9, 'Turizmu', 'turizmu', 'Ministériu Turizmu no Negósiu Kreativu', '#ec4899', 'Palmtree', '2026-04-26 03:47:14', '2026-04-26 03:47:14'),
(10, 'Komérsiu', 'komersiu', 'Ministériu Komérsiu no Indústria', '#a855f7', 'Store', '2026-04-26 03:47:14', '2026-04-26 03:47:14'),
(11, 'Governu', 'governu', 'Ministériu governu nian', '#3b82f6', 'Building2', '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
(12, 'Ministério da Defesa', 'ministerio-da-defesa', 'Ministério da Defesa Timor-leste', '#f73b3b', 'Building2', '2026-05-02 13:02:02', '2026-05-02 13:02:02'),
(13, 'Administração Pública', 'administracao-publica', 'Administração Pública DILI timor-leste', '#99b0b8', 'Building2', '2026-05-02 13:32:41', '2026-05-02 13:32:41');

-- --------------------------------------------------------

--
-- Table structure for table `faqs`
--

CREATE TABLE `faqs` (
  `id` int(11) NOT NULL,
  `question` varchar(255) NOT NULL,
  `answer` text NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `sort_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `message` longtext NOT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `read_status` tinyint(1) DEFAULT 0,
  `reply` longtext DEFAULT NULL,
  `replied_at` datetime DEFAULT NULL,
  `replied_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ministries`
--

CREATE TABLE `ministries` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `category_id` int(11) NOT NULL,
  `description` text DEFAULT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `district` varchar(100) DEFAULT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `founded_year` int(11) DEFAULT NULL,
  `total_employees` int(11) DEFAULT NULL,
  `rating` decimal(3,1) DEFAULT 0.0,
  `total_ratings` int(11) DEFAULT 0,
  `total_views` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_by` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ministries`
--

INSERT INTO `ministries` (`id`, `name`, `slug`, `category_id`, `description`, `address`, `city`, `district`, `latitude`, `longitude`, `phone`, `email`, `website`, `photo`, `founded_year`, `total_employees`, `rating`, `total_ratings`, `total_views`, `is_active`, `created_by`, `created_at`, `updated_at`) VALUES
(23, 'Ministerio do Interior dili', 'ministerio-do-interior-dili', 1, 'Ministru ne\'ebé lidera hela ministériu ne\'e ka Sekretáriu Estadu', 'Becora', 'Dili-Vila Verde', 'DILI', -8.5604226, 125.5717917, '73587824', 'informacao@migracao.gov.tl', ' https://mi.gov.tl/', 'http://localhost:5000/uploads/image-1777210816159-546656172.jpg', 2002, 23, 0.0, 0, 10, 1, 5, '2026-04-26 13:41:11', '2026-04-27 02:47:46'),
(44, 'Ministry of Finance', 'ministry-of-finance', 4, 'This is one of my best existing project that I hold, a very pleasant place, nice people, love to be there.. hopefully can go there again..', 'Aitarak laran', 'Dili-Vila Verde', '', -8.5512255, 125.5631143, '73587824', 'info@mj.gov.tl', 'https://www.mof.gov.tl/', 'http://localhost:5000/uploads/image-1777257251750-732968643.jpg', 2002, 20, 0.0, 0, 1, 1, 5, '2026-04-27 02:34:14', '2026-04-27 02:37:11'),
(45, 'Ministério da Defesa', 'ministerio-da-defesa', 12, 'Órgaun sentrál governu nian ne’ebé responsavel ba dezeñu, implementasaun, koordenasaun, no avaliasaun ba polítika sira, ne’ebé estabelese no aprova hosi Konsellu Ministrus, ba kampu defeza nasionál no kooperasaun militár. (Órgaun governu sentrál ne\'ebé responsavel ba dezeñu, implementasaun, koordenasaun, no avaliasaun ba polítika sira defeza nasionál no kooperasaun militár nian).', 'Fatuhada, Dili, Timor-Leste.', 'Vera Cruz', 'Dili', -8.5547411, 125.5532609, '(+670) 333 1111 / 333 1113', 'info@defesa.gov.tl', 'defesa.gov.tl', 'http://localhost:5000/uploads/image-1777727116962-23932554.jpg', 2002, 5000, 0.0, 0, 0, 1, 5, '2026-05-02 13:05:28', '2026-05-02 13:05:28'),
(46, 'Ministério do Petróleo e Minerais', 'ministerio-do-petroleo-e-minerais', 11, 'Orgaun sentrál Governo nian ne\'ebé responsavel ho konsesaun no ezekusaun polítika enerjétika no hetan rekursu mineiru sira, inklui petróleu no minériu estratéjiku sira. (Órgaun sentrál Governu nian ne’ebé responsavel ba dezeñu no implementasaun polítika enerjétika no jestaun rekursu minerál sira, inklui petróleu no minerál estratéjiku sira seluk).', 'Edifício do Fomento, 1.º Andar, Rua Dom Aleixo Corte-Real, Mandarin, Dili, Timor-Leste.', 'Vera Cruz', 'Dili', -8.5539958, 125.5798070, '(+670) 333 1111 / 333 1113', 'informacao@migracao.gov.tl', 'https://www.anp.tl', 'http://localhost:5000/uploads/image-1777727590564-165705313.jpg', 2001, 2000, 0.0, 0, 0, 1, 5, '2026-05-02 13:13:12', '2026-05-02 13:13:12'),
(47, 'Ministério da Educação', 'ministerio-da-educacao', 3, 'Orgão central responsável pela política de ensino básico e secundário, formação de professores e gestão das escolas públicas. (Bertanggung jawab atas kebijakan pendidikan dasar, menengah, kurikulum nasional, ', 'Rua Tuana-Laran, Vila-Verde, Dili.', ' Dili / Vera Cruz (Vila-Verde)', 'Dili', -8.5596614, 125.5676501, ' (+670) 333 1065', 'info@moe.gov.tl', ' https://www.moe.gov.tl', 'http://localhost:5000/uploads/image-1777728643959-331157232.jpg', 2001, 33, 0.0, 0, 0, 1, 5, '2026-05-02 13:30:46', '2026-05-02 13:30:46'),
(48, 'Ministério da Administração Estatal', 'ministerio-da-administracao-estatal', 13, 'Responsavel ba administrasaun lokál, desentralizasaun administrativa no apoio ba organizasaun komunitária sira. (Responsavel ba administrasaun rejionál/distritál, desentralizasaun, no implementasaun ba prosesu eleisaun jerál/eleisaun).', ' Rua de Moçambique, Colmera, Dili.', 'Dili / Vera Cruz', 'DIli', -8.5567576, 125.5738661, ' (+670) 333 9031', 'info.portal@estatal.gov.tl', 'estatal.gov.tl', 'http://localhost:5000/uploads/image-1777728954673-948928380.jpg', 2002, 19, 0.0, 0, 0, 1, 5, '2026-05-02 13:35:56', '2026-05-02 13:35:56'),
(49, 'Ministério das Obras Públicas', 'ministerio-das-obras-publicas', 11, 'Orgaun sentrál Governu nian ne\'ebé responsavel ba konsesaun, ezekusaun no avaliasaun polítika nian ba área sira obra públika nian, habitasaun, urbanizmu, infraestrutura sira hídrika no saneamentu. (Responsavel ba infraestrutura estrada, ponte, abitasaun públiku, no sistema bee no saneamentu).', 'Avenida da Liberdade de Imprensa, Caicoli, Dili.', 'Caicoli', 'Dili', -8.5537423, 125.5664765, ' (+670) 331 1038.', 'info@mtc.gov.tl', 'mop.gov.tl', 'http://localhost:5000/uploads/image-1777729206484-296911229.jpg', 2002, 150, 0.0, 0, 0, 1, 5, '2026-05-02 13:41:07', '2026-05-02 13:41:07'),
(50, 'Ministério da Justiça', 'ministerio-da-justica', 5, 'Organizasaun ne\'ebé responsavel ba administrasaun justisa nian, diresaun no diresaun umanu sira, halo sistemátiku no regulasaun ba terras no propriedade sira. (Responsavel ba lei no direitus umanus, sistema prizaun, notariadu, no asuntu rai no propriedade).', ' Avenida Rua da Justiça (Caicoli), Dili.', 'Vera Cruz', 'Dili', -8.5567263, 125.5754902, '(+670) 333 1042 / 723 0130', 'info@mj.gov.tl', 'cfj@mj.gov.tl', 'http://localhost:5000/uploads/image-1777729413463-981486830.jpg', 2002, 600, 0.0, 0, 0, 1, 5, '2026-05-02 13:43:36', '2026-05-02 13:43:36'),
(51, ' Ministério do Ensino Superior, Ciência e Cultura', 'ministerio-do-ensino-superior-ciencia-e-cultura', 9, 'Responsavel pela polítika do ensino superior, siénsia no teknolojia, bem hanesan pela pela proteção no valorizasaun ba patrimóniu kulturál no artes. (Jere universidade sira, peskiza sientífika, no prezerva kultura no arte nasionál sira).', 'Avenida de Portugal, Praia dos Coqueiros, Dili.', 'Bidaun', 'Dili', -8.5544869, 125.5746504, ' (+670) 331 1515.', 'info@mj.gov.tl', 'mescc.gov.tl', 'http://localhost:5000/uploads/image-1777729665620-220220036.jpg', 2002, 299, 0.0, 0, 1, 1, 5, '2026-05-02 13:47:47', '2026-05-02 13:52:40'),
(52, 'Ministério da Juventude, Desporto, Arte e Cultura', 'ministerio-da-juventude-desporto-arte-e-cultura', 9, 'Responsavel ba dezenvolvimentu, ezekusaun no disponibilidade polítika ba área no juventude, eventu no promosaun ba arte no kultura. (Responsavel ba programa empoderamentu juventude, dezenvolvimentu desportu nasionál, no mós dezenvolvimentu arte no kultura).', 'Rua de Lesidere, Dili.', 'Rua de Lesidere, Dili.', 'Dili', -8.5522677, 125.5819605, '(+670) 333 1213', 'info@mj.gov.tl', 'mjdac.gov.tl', 'http://localhost:5000/uploads/image-1777729896718-248270868.jpg', 2002, 500, 0.0, 0, 0, 1, 5, '2026-05-02 13:51:38', '2026-05-02 13:51:38');

-- --------------------------------------------------------

--
-- Table structure for table `ministry_gallery`
--

CREATE TABLE `ministry_gallery` (
  `id` int(11) NOT NULL,
  `ministry_id` int(11) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `is_primary` tinyint(1) DEFAULT 0,
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ministry_services`
--

CREATE TABLE `ministry_services` (
  `id` int(11) NOT NULL,
  `ministry_id` int(11) NOT NULL,
  `service_name` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `content` longtext DEFAULT NULL,
  `excerpt` text DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `ministry_id` int(11) DEFAULT NULL,
  `author_id` int(11) DEFAULT NULL,
  `is_published` tinyint(1) DEFAULT 0,
  `published_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `youtube_url` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `title`, `slug`, `content`, `excerpt`, `thumbnail`, `ministry_id`, `author_id`, `is_published`, `published_at`, `created_at`, `updated_at`, `youtube_url`) VALUES
(13, 'MPM Lansa Konkursu Públiku ba Esplorasaun Minerais', 'mpm-lansa-konkursu-publiku-ba-esplorasaun-minerais', 'Governu liuhusi Ministério do Petróleo e Minerais ofisialmente loke konkursu ba kompañia sira ne\'ebé iha interese atu halo esplorasaun ba rekursu minerais. Ida ne\'e hanesan pasu importante hodi diversifika ekonomia nasaun nian no kria oportunidade servisu foun ba joven sira.', 'Ministério do Petróleo e Minerais (MPM) foin lais ne\'e lansa konkursu públiku internasionál hodi dada investidura iha kadiak minerais iha rai-laran.', 'http://localhost:5000/uploads/image-1777730975474-269513952.jpg', NULL, 5, 1, '2026-05-02 14:09:37', '2026-05-02 14:09:37', '2026-05-02 14:09:37', NULL),
(14, 'MNEC no Austrália Hametin Kooperasaun Bilaterál', 'mnec-no-australia-hametin-kooperasaun-bilateral', 'Asina Akordu: Totál akordu bilaterál hamutuk 22 ne\'ebé asina ona entre país rua, inklui akordu kooperasaun rejionál ba kombate imigrasaun ilegál, tratadu tasi timor, no aranju marítimu.Foku Kooperasaun: Área kave kooperasaun nian mak Programa Mobilidade Laborál (PALM), dezenvolvimentu projetu Greater Sunrise, seguransa marítima, no edukasaun.Apoiu Saúde: Iha fulan-Jullu 2025, Governu Timor-Leste no Territóriu Norte Austrália asina Planu Asaun ba Kooperasaun iha Saúde, ne\'ebé inklui interkámbiu kompeténsia no formasaun.Kapasitasaun Diplomátika: MNEC no Austrália servisu hamutuk iha programa kapasitasaun ba diplomata júnior timoroan sira.Kompromisu Politiku: Governu rua reafirma kompromisu atu kontinua hametin relasaun povu ba povu no Estadu ba Estadu.', 'Ministeriu Negósius Estranjeirus no Kooperasaun (MNEC) Timor-Leste kontinua hametin parseria estratéjika ho Austrália liuhusi kooperasaun bilaterál ne\'ebé forte iha setór oioin, bazeia ba relasaun istóriku ne\'ebé kle\'an. Relasaun ne\'e involve envolvimentu regulár nivel altu, inklui vizita ofisiál no asina akordu barak', 'http://localhost:5000/uploads/image-1777731276365-34981072.jpg', NULL, 5, 1, '2026-05-02 14:10:36', '2026-05-02 14:10:36', '2026-05-02 15:14:41', 'https://www.youtube.com/watch?v=yODOga1B1u8&list=RDefnHpyfb0iE&index=17');

-- --------------------------------------------------------

--
-- Table structure for table `page_views`
--

CREATE TABLE `page_views` (
  `id` int(11) NOT NULL,
  `ministry_id` int(11) DEFAULT NULL,
  `view_date` date NOT NULL,
  `view_count` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `page_views`
--

INSERT INTO `page_views` (`id`, `ministry_id`, `view_date`, `view_count`) VALUES
(1, NULL, '2026-04-20', 245),
(2, NULL, '2026-04-21', 312),
(3, NULL, '2026-04-22', 289),
(4, NULL, '2026-04-23', 456),
(5, NULL, '2026-04-24', 523),
(6, NULL, '2026-04-25', 678),
(7, NULL, '2026-04-26', 789),
(10, 23, '2026-04-26', 9),
(13, 44, '2026-04-27', 1),
(14, 23, '2026-04-27', 1),
(15, 51, '2026-05-02', 1);

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `site_settings`
--

CREATE TABLE `site_settings` (
  `id` int(11) NOT NULL,
  `setting_key` varchar(100) NOT NULL,
  `setting_value` text DEFAULT NULL,
  `profile_title` text NOT NULL,
  `profile_photo` varchar(50) NOT NULL,
  `profile_description` text DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `site_settings`
--

INSERT INTO `site_settings` (`id`, `setting_key`, `setting_value`, `profile_title`, `profile_photo`, `profile_description`, `updated_at`, `created_at`) VALUES
(1, 'site_name', 'Sistema Informasaun Lokalizasaun Ministériu Timor-Leste', 'GIS Profile', '', 'Updated on 2026-05-02T15:32:37.290Z', '2026-05-02 17:39:45', '2026-04-26 06:37:27'),
(2, 'site_description', 'Sistema ne\'e fornese informasaun kona-ba lokalizasaun ministériu', 'GIS Profile', '', 'Updated on 2026-05-02T15:32:37.299Z', '2026-05-02 17:39:45', '2026-04-26 06:37:27'),
(3, 'contact_email', 'kontaktu@gis.tl', 'GIS Profile', '', 'Updated on 2026-05-02T15:32:37.302Z', '2026-05-02 17:39:45', '2026-04-26 06:37:27'),
(4, 'contact_phone', '+670 333 8888', 'GIS Profile', '', 'Updated on 2026-05-02T15:32:37.307Z', '2026-05-02 17:39:45', '2026-04-26 06:37:27'),
(5, 'default_lat', '-8.55', 'GIS Profile', '', 'Updated on 2026-05-02T15:32:37.312Z', '2026-05-02 17:39:45', '2026-04-26 06:37:27'),
(6, 'default_lng', '125.57', 'GIS Profile', '', 'Updated on 2026-05-02T15:32:37.315Z', '2026-05-02 17:39:45', '2026-04-26 06:37:27'),
(7, 'default_zoom', '18', 'GIS Profile', '', 'Updated on 2026-05-02T15:32:37.317Z', '2026-05-02 17:39:45', '2026-04-26 06:37:27'),
(12, 'contact_address', 'Dili, Timor-Leste', 'GIS Profile', '', 'Updated on 2026-05-02T15:32:37.310Z', '2026-05-02 17:39:45', '2026-04-26 07:08:35'),
(24, 'profile_photo', '', 'GIS Profile', '', NULL, '2026-05-02 17:39:45', '2026-05-02 17:37:28'),
(25, 'profile_title', 'GIS Timor-Leste', 'GIS Profile', '', NULL, '2026-05-02 17:39:45', '2026-05-02 17:37:28'),
(26, 'profile_description', 'Deskrisaun sistema...', 'GIS Profile', '', NULL, '2026-05-02 17:39:45', '2026-05-02 17:37:28');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('administrator','editor','viewer') DEFAULT 'viewer',
  `avatar` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `last_login` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `avatar`, `is_active`, `last_login`, `created_at`, `updated_at`) VALUES
(1, 'Admin Sistema', 'admin@gis.tl', '$2a$10$5xPp4xODxPp4xODxPp4xO', 'administrator', NULL, 1, NULL, '2024-01-01 00:00:00', '2024-01-01 00:00:00'),
(5, 'Deonisio da Costa', 'deo@mj.gov.tl', '$2a$10$oO5jf6KJG5lP4WPg18S2Tuu7QT9owAhTkNNUw27P18Bjjj4I8CKhq', 'administrator', NULL, 1, '2026-05-02 16:03:34', '2026-04-26 13:22:06', '2026-05-02 16:03:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `idx_created` (`created_at`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD UNIQUE KEY `slug_2` (`slug`);

--
-- Indexes for table `faqs`
--
ALTER TABLE `faqs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `replied_by` (`replied_by`);

--
-- Indexes for table `ministries`
--
ALTER TABLE `ministries`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD UNIQUE KEY `slug_2` (`slug`),
  ADD KEY `idx_category` (`category_id`),
  ADD KEY `idx_city` (`city`),
  ADD KEY `idx_is_active` (`is_active`),
  ADD KEY `created_by` (`created_by`),
  ADD KEY `ministries_is_active` (`is_active`),
  ADD KEY `ministries_category_id` (`category_id`),
  ADD KEY `ministries_is_active_category_id` (`is_active`,`category_id`),
  ADD KEY `ministries_rating` (`rating`),
  ADD KEY `ministries_created_at` (`created_at`);

--
-- Indexes for table `ministry_gallery`
--
ALTER TABLE `ministry_gallery`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ministry_id` (`ministry_id`);

--
-- Indexes for table `ministry_services`
--
ALTER TABLE `ministry_services`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ministry_id` (`ministry_id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `ministry_id` (`ministry_id`),
  ADD KEY `author_id` (`author_id`);

--
-- Indexes for table `page_views`
--
ALTER TABLE `page_views`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_ministry_date` (`ministry_id`,`view_date`),
  ADD KEY `page_views_ministry_id` (`ministry_id`),
  ADD KEY `page_views_view_date` (`view_date`),
  ADD KEY `page_views_ministry_id_view_date` (`ministry_id`,`view_date`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `site_settings`
--
ALTER TABLE `site_settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `setting_key` (`setting_key`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_logs`
--
ALTER TABLE `activity_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `faqs`
--
ALTER TABLE `faqs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ministries`
--
ALTER TABLE `ministries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `ministry_gallery`
--
ALTER TABLE `ministry_gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ministry_services`
--
ALTER TABLE `ministry_services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `page_views`
--
ALTER TABLE `page_views`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `site_settings`
--
ALTER TABLE `site_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD CONSTRAINT `activity_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`replied_by`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ministries`
--
ALTER TABLE `ministries`
  ADD CONSTRAINT `ministries_ibfk_3` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ministries_ibfk_4` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ministry_gallery`
--
ALTER TABLE `ministry_gallery`
  ADD CONSTRAINT `ministry_gallery_ibfk_1` FOREIGN KEY (`ministry_id`) REFERENCES `ministries` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ministry_services`
--
ALTER TABLE `ministry_services`
  ADD CONSTRAINT `ministry_services_ibfk_1` FOREIGN KEY (`ministry_id`) REFERENCES `ministries` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `news`
--
ALTER TABLE `news`
  ADD CONSTRAINT `news_ibfk_1` FOREIGN KEY (`ministry_id`) REFERENCES `ministries` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `news_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `page_views`
--
ALTER TABLE `page_views`
  ADD CONSTRAINT `page_views_ibfk_1` FOREIGN KEY (`ministry_id`) REFERENCES `ministries` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
