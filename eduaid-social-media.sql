-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 03, 2023 at 04:49 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eduaid-social-media`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `comment` varchar(2250) NOT NULL,
  `postId` varchar(250) NOT NULL,
  `postTitle` varchar(1000) NOT NULL,
  `userName` varchar(200) NOT NULL,
  `commentType` varchar(2000) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `likeType` varchar(250) NOT NULL,
  `userName` varchar(250) NOT NULL,
  `postId` varchar(200) NOT NULL,
  `postType` varchar(400) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `likeType`, `userName`, `postId`, `postType`, `createdAt`) VALUES
(239, 'like', 'Paix_Techdom', '460', 'post', '2023-11-01 06:11:01');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `notificationTitle` varchar(60) NOT NULL,
  `notificationContent` varchar(400) NOT NULL,
  `image` varchar(250) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `notificationTitle`, `notificationContent`, `image`, `createdAt`) VALUES
(57, 'Paix Techdom', ' ', 'LOGO DESIGN PACKAGE-09.jpg', '2023-11-01 06:07:32'),
(58, 'TicTac', ' ', 'projectTicTac.png', '2023-11-01 06:08:51'),
(59, '', ' ', 'MCKUP 4.jpg', '2023-11-01 07:13:53');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `userName` varchar(60) NOT NULL,
  `userClass` varchar(60) NOT NULL,
  `postTitle` varchar(200) NOT NULL,
  `postContent` varchar(1000) NOT NULL,
  `image` varchar(250) NOT NULL,
  `userId` varchar(250) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `userName`, `userClass`, `postTitle`, `postContent`, `image`, `userId`, `createdAt`) VALUES
(458, 'Guest', 'guest', '', '', 'beautiful-website.jpg', '122', '2023-11-01 06:05:25'),
(459, 'Guest', 'guest', '', '', 'Screenshot_20220325-232237_WhatsApp.jpg', '122', '2023-11-01 06:05:49'),
(460, 'EDUAID_CONSULT', 'admin', '', '', 'LOGO DESIGN PACKAGE-08.jpg', '15', '2023-11-01 06:06:54'),
(461, 'JOHN_OLUWAFERANMI', 'user', '', '', 'testimonials-bg.jpg', '126', '2023-11-01 06:37:17'),
(465, 'JOHN_OLUWAFERANMI', 'user', '', '', '31.jpg', '126', '2023-11-01 06:43:07'),
(466, 'ADEBOYE_ORIYOMI', 'user', '', '', '27.jpg', '131', '2023-11-01 06:43:58'),
(467, 'ADEBOYE_ORIYOMI', 'user', '', '', '76.jpg', '131', '2023-11-01 06:44:11'),
(469, 'Guest', 'user', 'Post Heading', '', '02.png', '122', '2023-11-01 07:12:53');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `firstName` varchar(250) NOT NULL,
  `lastName` varchar(250) NOT NULL,
  `file` varchar(200) NOT NULL,
  `projectTitle` varchar(250) NOT NULL,
  `department` varchar(250) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `firstName`, `lastName`, `file`, `projectTitle`, `department`, `createdAt`) VALUES
(22, 'Mariam', 'Adeboye', 'IMPLIMENTATION AND DESIGN ONLINE RECHARGE SYSTEM.doc', 'Implementation and Design of Online recharge system', 'Information Communication Technology', '2023-08-02 01:46:45'),
(23, 'Praise', 'John', 'CHAPTER FIVE AYOKA.docx', 'software sales', 'Computer Science', '2023-08-02 01:47:23');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `matricNo` varchar(250) NOT NULL,
  `firstName` varchar(60) NOT NULL,
  `lastName` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `department` varchar(250) NOT NULL,
  `level` varchar(250) NOT NULL,
  `profilePicture` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `matricNo`, `firstName`, `lastName`, `password`, `department`, `level`, `profilePicture`) VALUES
(15, 'admin', 'Paix', 'Techdom', 'adminadmin', 'admin', 'admin', 'logo.png'),
(122, 'guest', 'Guest', '', 'guestguest', 'guest', 'guest', 'dp.png'),
(123, 'PAIX/2023/P0/I0/R1', 'ADEKUNLE', 'FAVOUR', 'ADEKUNLEFAVOUR', 'POLITICAL AND INTERNATIONAL RELATIONS', '300', ''),
(124, 'PAIX/2023/I0/C0/T1', 'BENSON', 'AKANINYENE', 'BENSONAKANINYENE', 'INFORMATION AND COMMUNICATION TECHNOLOGY', '100', ''),
(125, 'PAIX/2023/P0/U0/B1', 'BENSON', 'IDARA', 'BENSONEIDARA', 'PUBLIC ADMINISTRATIONS', '100', ''),
(126, 'PAIX/2023/C0/S0/C1', 'JOHN', 'OLUWAFERANMI', 'JOHNOLUWAFERANMI', 'COMPUTER SCIENCE', '300', 'me.jpg'),
(127, 'PAIX/2023/A0/C0/C1', 'MUHAMMED', 'ROFIAT', 'MUHAMMEDROFIAT', 'ACCOUNTING', '200', ''),
(128, 'PAIX/2023/P0/U0/B2', 'AKINTOLA', 'OPEYEMI', 'AKINTOLAOPEYEMI', 'PUBLIC ADMINISTRATIONS', '100', ''),
(129, 'PAIX/2023/M0/C0/M1', 'ADEKANBI', 'AJIBOLA', 'ADEKANBIAJIBOLA', 'MASS COMMUNICATIONS', '100', ''),
(130, 'PAIX/2023/P0/U0/B3', 'ALABI', 'ADEBAYO', 'ALABIADEBAYO', 'PUBLIC ADMINISTRATIONS', '100', ''),
(131, 'PAIX/2023/I0/C0/T2', 'ADEBOYE', 'ORIYOMI', 'ADEBOYEORIYOMI', 'INFORMATION AND COMMUNICATION TECHNOLOGY', '300', 'tmK5gm0-hp-wallpaper-hd.jpg'),
(132, 'PAIX/2023/C0/S0/C2', 'ADEBAYO', 'YUSUF', 'ADEBAYOYUSUF', 'COMPUTER SCIENCE', '200', ''),
(133, 'PAIX/2023/P0/I0/R2', 'GBADAMOSI', 'OLUDARE', 'GBADAMOSIOLUDARE', 'POLITICAL AND INTERNATIONAL RELATIONS', '200', ''),
(134, 'PAIX/2023/B0/F0/N1', 'POPOOLA', 'OLAITAN', 'POPOOLAOLAITAN', 'BANKING AND FINANCE', '100', ''),
(135, 'PAIX/2023/B0/C0/H3', 'MUSTAPHA', 'AJARAT', 'MUSTAPHAAJARAT', 'BIOCHEMISTRY', '200', ''),
(136, 'PAIX/2023/M0/C0/M8', 'BAKARE', 'BOLUWATIFE', 'BAKAREBOLUWATIFE', 'MASS COMMUNICATIONS', '200', ''),
(137, 'PAIX/2023/M0/C0/M2', 'AKINRULI', 'DAVID', 'AKINRULIDAVID', 'MASS COMMUNICATIONS', '300', ''),
(138, 'PAIX/2023/B0/C0/H1', 'OLADELE', 'OMOLABAKE', 'OLADELEOMOLABAKE', 'BIOCHEMISTRY', '100', ''),
(139, 'PAIX/2023/B0/C0/H2', 'ALAO', 'WURAOLA', 'ALAOWURAOLA', 'BIOCHEMISTRY', '100', ''),
(140, 'PAIX/2023/H0/R0/M1', 'EHINOLA', 'DANIEL', 'EHINOLADANIEL', 'HUMAN RESOURCE MANAGEMENT', '300', ''),
(141, 'PAIX/2023/M0/C0/M5', 'AFOLABI', 'SEMIYAT', 'AFOLABISEMIYAT', 'MASS COMMUNICATIONS', '100', ''),
(142, 'PAIX/2023/M0/C0/M6', 'OKEWUSI', 'MORENIKEJI', 'OKEWUSIMORENIKEJI', 'MASS COMMUNICATIONS', '100', ''),
(143, 'PAIX/2023/M0/C0/M7', 'AKINTOYINBO', 'TOLANI', 'AKINTOYINBOTOLANI', 'MASS COMMUNICATIONS', '100', ''),
(144, 'PAIX/2023/A0/C0/C2', 'OYEGBORI', 'OPEYEMI', 'OYEGBORIOPEYEMI', 'ACCOUNTING', '100', ''),
(145, 'PAIX/2023/P0/I0/R3', 'AFOLABI', 'SINA', 'AFOLABISINA', 'POLITICAL AND INTERNATIONAL RELATIONS', '100', ''),
(146, 'PAIX/2023/B0/U0/S1', 'OWOLABI', 'OLUWASEYI', 'OWOLABIOLUWASEYI', 'BUSINESS ADMINISTRATION', '300', ''),
(147, 'PAIX/2023/B0/U0/S2', 'OLORUNSHOLA', 'OLUWATOMILOLA', 'OLORUNSHOLAOLUWATOMILOLA', 'BUSINESS ADMINISTRATION', '300', ''),
(148, 'PAIX/2023/P0/H0/S1', 'ADELEYE', 'TUNRAYO', 'ADELEYETUNRAYO', 'PUBLIC HEALTH', '200', ''),
(149, 'PAIX/2023/B0/C0/H4', 'HAMOD', 'OLAMIDE', 'HAMODOLAMIDE', 'BIOCHEMISTRY', '200', ''),
(150, 'PAIX/2023/B0/C0/H5', 'AWODIRAN', 'FISAYO', 'AWODIRANFISAYO', 'BIOCHEMISTRY', '200', ''),
(151, 'PAIX/2023/M0/C0/M9', 'ADESAKIN', 'ABIKE', 'ADESAKINABIKE', 'MASS COMMUNICATIONS', '200', ''),
(152, 'PAIX/2023/P0/I0/R4', 'ADEBOYE', 'OMOLADE', 'ADEBOYEOMOLADE', 'POLITICAL AND INTERNATIONAL RELATIONS', '200', ''),
(153, 'PAIX/2023/M0/C0/M4', 'TIJANI', 'YETUNDE', 'TIJANIYETUNDE', 'MASS COMMUNICATIONS', '200', ''),
(154, 'PAIX/2023/H0/R0/M2', 'ALFRED', 'DANIEL', 'ALFREDDANIEL', 'HUMAN RESOURCE MANAGEMENT', '300', ''),
(155, 'PAIX/2023/E0/C0/N1', 'OLARINDE', 'BABTUNDE', 'OLARINDEBABTUNDE', 'ECONOMICS', '300', ''),
(156, 'PAIX/2023/C0/S0/C5', 'JOHN', 'OLUWATOMIWA', 'JOHNOLUWATOMIWA', 'COMPUTER SCIENCE', '300', ''),
(157, 'PAIX/2023/M0/C0/M10', 'IDRIS', 'MARIAM', 'IDRISMARIAM', 'MASS COMMUNICATIONS', '200', ''),
(158, 'PAIX/2023/M0/C0/M11', 'AKINLOYE', 'ESTHER', 'AKINLOYEESTHER', 'MASS COMMUNICATIONS', '100', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=240;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=470;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=159;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
