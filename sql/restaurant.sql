-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: Jun 10, 2019 at 07:44 PM
-- Server version: 10.3.13-MariaDB-log
-- PHP Version: 7.0.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_gilesni`
--

-- --------------------------------------------------------

--
-- Table structure for table `CustomerRatesDish`
--

CREATE TABLE `CustomerRatesDish` (
  `did` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `Rating` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `CustomerRatesDish`
--

INSERT INTO `CustomerRatesDish` (`did`, `uid`, `Rating`) VALUES
(1, 1, 5),
(1, 2, 9),
(2, 1, 5),
(2, 2, 8),
(3, 3, 8),
(4, 5, 3),
(6, 8, 9),
(6, 9, 8),
(8, 7, 4),
(9, 3, 9);

-- --------------------------------------------------------

--
-- Table structure for table `CustomerRewards`
--

CREATE TABLE `CustomerRewards` (
  `rewardid` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `discountreward` float DEFAULT NULL,
  `rid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Dumping data for table `CustomerRewards`
--

INSERT INTO `CustomerRewards` (`rewardid`, `description`, `discountreward`, `rid`) VALUES
(1, 'Buy one 3-topping get one half off', 11.985, 1),
(2, 'Buy one Pizza get on Pizza for free', 8.99, 2),
(3, 'More Pizza when pizza is bought', 0, 4),
(4, 'Free breadsticks', 0, 6),
(5, 'Free fountain drink', 0, 8),
(6, 'Free salad with purchase of pasta', 8.99, 10),
(7, 'Buy some food get some food', 0, 3),
(8, 'Buy way too much food, get food you don\'t want for free', 0, 5),
(9, 'Buy 2 pizza get third Pizza free', 20, 7),
(10, 'Free salad and drink with purchase', 0, 9),
(11, 'Test', 22.2, 1),
(12, 'A coupon for the Van Buren Restaurant', 0, 10);

-- --------------------------------------------------------

--
-- Table structure for table `DeliveryLocations`
--

CREATE TABLE `DeliveryLocations` (
  `address` varchar(32) NOT NULL,
  `distance` decimal(4,2) DEFAULT NULL,
  `rid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Dumping data for table `DeliveryLocations`
--

INSERT INTO `DeliveryLocations` (`address`, `distance`, `rid`) VALUES
('123 Library Squad Rd', '3.20', 8),
('12345 Corvallis Avenue', '9.80', 1),
('213 NW 3rd St.', '3.00', 2),
('330 Ducks Suck', '9.90', 9),
('345 Hesus', '7.77', 6),
('451 Party Rock', '7.00', 2),
('4589 Pizza Craving Lane', '8.90', 4),
('54321 Sillavroc Drive', '8.60', 2),
('7891 SQL Cross', '3.00', 3),
('7892 Johnson', '3.20', 6),
('909 No-Sleep Drive', '7.70', 7),
('address', '6.00', 6);

--
-- Triggers `DeliveryLocations`
--
DELIMITER $$
CREATE TRIGGER `distanceToFar` BEFORE INSERT ON `DeliveryLocations` FOR EACH ROW BEGIN
	IF (New.distance > 10)
    THEN SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = "Address to far away for delivery";
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `Dishes`
--

CREATE TABLE `Dishes` (
  `did` int(11) NOT NULL,
  `name` char(255) NOT NULL,
  `dinnerprice` decimal(4,2) NOT NULL,
  `lunchprice` decimal(4,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Dishes`
--

INSERT INTO `Dishes` (`did`, `name`, `dinnerprice`, `lunchprice`) VALUES
(1, '3-topping Pizza', '7.99', NULL),
(2, '2-topping carryout', '7.99', '5.00'),
(3, 'Calzone', '12.00', '10.00'),
(4, 'Salad', '5.00', '4.00'),
(5, 'Fountain Drink', '2.75', '2.00'),
(6, 'Pepperoni Pizza', '8.00', '6.50'),
(7, 'Combo Pizza', '9.00', NULL),
(8, 'Breadsticks', '2.50', '2.00'),
(9, 'Pasta', '10.00', '8.00'),
(10, 'Veggie Pizza', '6.99', '5.99'),
(11, '50 Flavors of Dumb', '2.99', '5.99');

-- --------------------------------------------------------

--
-- Table structure for table `Employees`
--

CREATE TABLE `Employees` (
  `eid` int(11) NOT NULL COMMENT 'Primary key for employee table',
  `name` varchar(20) NOT NULL COMMENT 'Name of employee',
  `role` enum('Cashier','Waiter','Line Chef','Head Chef','Sous Chef','Dishwasher') DEFAULT NULL,
  `rid` int(11) NOT NULL,
  `managerid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Employees`
--

INSERT INTO `Employees` (`eid`, `name`, `role`, `rid`, `managerid`) VALUES
(1, 'Nicholas Giles', 'Dishwasher', 9, 1),
(2, 'Max Evdemon', 'Head Chef', 2, 2),
(3, 'Dean Akin', 'Waiter', 5, 1),
(4, 'Alison DeWesse', 'Cashier', 10, 3),
(5, 'Joseph Dantes', 'Line Chef', 9, 4),
(6, 'Josh Hector', 'Waiter', 5, 8),
(7, 'Other Josh', 'Sous Chef', 8, 5),
(8, 'Colton Katsel', 'Cashier', 7, 6),
(9, 'Saray Valdez', 'Line Chef', 1, 7),
(10, 'Riley Moore', 'Dishwasher', 4, 9),
(11, 'Chris Breniser', 'Line Chef', 1, 3),
(12, 'John Doe', 'Cashier', 17, 4),
(13, 'Max', 'Waiter', 25, 2);

-- --------------------------------------------------------

--
-- Table structure for table `Manager`
--

CREATE TABLE `Manager` (
  `managerid` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `rid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Manager`
--

INSERT INTO `Manager` (`managerid`, `name`, `rid`) VALUES
(1, 'Sergio Sanchez', 1),
(2, 'Corrine Nelson', 2),
(3, 'Cody Lavorico', 10),
(4, 'Alex Warshauer', 9),
(5, 'Edwin Burton', 8),
(6, 'Lars Gunderson', 7),
(7, 'Katie Alston', 6),
(8, 'Eric Russel', 5),
(9, 'Colton Brooks', 4),
(10, 'Jake Souza', 26);

-- --------------------------------------------------------

--
-- Table structure for table `Menu`
--

CREATE TABLE `Menu` (
  `mid` int(11) NOT NULL,
  `numDishes` int(11) NOT NULL DEFAULT 0,
  `managerid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Menu`
--

INSERT INTO `Menu` (`mid`, `numDishes`, `managerid`) VALUES
(1, 6, 1),
(2, 4, 2),
(3, 0, 4),
(4, 0, 3),
(5, 0, 9),
(6, 1, 5),
(7, 0, 8),
(8, 0, 10),
(9, 0, 7),
(10, 0, 6),
(24, 0, 1),
(26, 0, 1),
(27, 0, 7),
(28, 0, 10),
(123, 1, 1),
(234, 0, 5),
(300, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `MenuContainsDish`
--

CREATE TABLE `MenuContainsDish` (
  `did` int(11) NOT NULL,
  `mid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `MenuContainsDish`
--

INSERT INTO `MenuContainsDish` (`did`, `mid`) VALUES
(1, 1),
(1, 2),
(1, 123),
(3, 1),
(3, 6),
(4, 2),
(5, 1),
(6, 1),
(8, 1),
(8, 2),
(9, 1),
(10, 2);

--
-- Triggers `MenuContainsDish`
--
DELIMITER $$
CREATE TRIGGER `DecrementNumDishes` AFTER DELETE ON `MenuContainsDish` FOR EACH ROW BEGIN
	UPDATE Menu
    SET numDishes = numDishes - 1
    WHERE Menu.mid=Old.mid;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `IncrementNumDishes` AFTER INSERT ON `MenuContainsDish` FOR EACH ROW BEGIN
	UPDATE Menu
    SET numDishes = numDishes + 1
    WHERE Menu.mid=New.mid;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `Restaurant`
--

CREATE TABLE `Restaurant` (
  `rid` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `opening` tinyint(4) DEFAULT NULL,
  `closing` tinyint(4) DEFAULT NULL,
  `mid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Restaurant`
--

INSERT INTO `Restaurant` (`rid`, `name`, `opening`, `closing`, `mid`) VALUES
(1, 'Monroe', 10, 2, 5),
(2, '9th', 10, 23, NULL),
(3, 'Garfield', 8, 20, 8),
(4, 'D', 6, 18, 2),
(5, '27th', 9, 21, NULL),
(6, 'Jefferson', 11, 3, NULL),
(7, 'Western', 7, 19, NULL),
(8, 'Circle', 4, 20, NULL),
(9, 'Harrison', 9, 15, NULL),
(10, 'Van Buren', 2, 3, NULL),
(13, 'Test', 2, 4, 3),
(15, 'Third', 2, 22, 8),
(17, 'Fourth', 5, 22, 9),
(20, 'Tenth', 1, 23, 8),
(25, 'Thurman', 5, 23, 4),
(26, 'Grove', 10, 22, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Specials`
--

CREATE TABLE `Specials` (
  `sid` int(11) NOT NULL,
  `price` decimal(4,2) NOT NULL,
  `day` char(255) NOT NULL,
  `time` int(11) NOT NULL,
  `rid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Specials`
--

INSERT INTO `Specials` (`sid`, `price`, `day`, `time`, `rid`) VALUES
(1, '5.00', 'Monday', 12, 1),
(2, '10.50', 'Wednesday', 18, 2),
(3, '8.99', 'Thursday', 11, 2),
(4, '19.99', 'Wednesday', 18, 1),
(5, '59.99', 'Tuesday', 12, 7),
(6, '5.99', 'Saturday', 6, 6),
(7, '2.50', 'Sunday', 8, 3),
(8, '99.99', 'Friday', 22, 7),
(9, '4.50', 'Monday', 0, 7),
(10, '9.50', 'Thursday', 2, 10);

-- --------------------------------------------------------

--
-- Table structure for table `UserOwnsReward`
--

CREATE TABLE `UserOwnsReward` (
  `rewardid` int(11) NOT NULL,
  `uid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `UserOwnsReward`
--

INSERT INTO `UserOwnsReward` (`rewardid`, `uid`) VALUES
(1, 2),
(2, 1),
(3, 3),
(4, 4),
(4, 10),
(5, 2),
(7, 6),
(8, 2),
(8, 9),
(10, 2);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `uid` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`uid`, `name`) VALUES
(1, 'Joe Beaver'),
(2, 'Olin Hannum'),
(3, 'Dave Manella'),
(4, 'Kristen Heckers'),
(5, 'Jason Gossett'),
(6, 'Dar Stubbs'),
(7, 'Chris Knight'),
(8, 'Chris Chapman'),
(9, 'Steven Zeilke'),
(10, 'Kevin Rooney'),
(11, 'Test Guy'),
(14, 'Person'),
(15, 'Guy Dude'),
(16, 'oof'),
(17, 'yes'),
(18, 'Person number 3');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `CustomerRatesDish`
--
ALTER TABLE `CustomerRatesDish`
  ADD PRIMARY KEY (`did`,`uid`),
  ADD KEY `CRD_uid` (`uid`);

--
-- Indexes for table `CustomerRewards`
--
ALTER TABLE `CustomerRewards`
  ADD PRIMARY KEY (`rewardid`),
  ADD KEY `CustomerRewards` (`rid`);

--
-- Indexes for table `DeliveryLocations`
--
ALTER TABLE `DeliveryLocations`
  ADD PRIMARY KEY (`address`),
  ADD KEY `DeliveryLoc_rid` (`rid`);

--
-- Indexes for table `Dishes`
--
ALTER TABLE `Dishes`
  ADD PRIMARY KEY (`did`);

--
-- Indexes for table `Employees`
--
ALTER TABLE `Employees`
  ADD PRIMARY KEY (`eid`),
  ADD KEY `Employees_rid` (`rid`),
  ADD KEY `Employees_managerid` (`managerid`);

--
-- Indexes for table `Manager`
--
ALTER TABLE `Manager`
  ADD PRIMARY KEY (`managerid`),
  ADD KEY `rid` (`rid`);

--
-- Indexes for table `Menu`
--
ALTER TABLE `Menu`
  ADD PRIMARY KEY (`mid`),
  ADD KEY `Menu_managerid` (`managerid`);

--
-- Indexes for table `MenuContainsDish`
--
ALTER TABLE `MenuContainsDish`
  ADD PRIMARY KEY (`did`,`mid`),
  ADD KEY `did` (`did`),
  ADD KEY `MCD_mid` (`mid`);

--
-- Indexes for table `Restaurant`
--
ALTER TABLE `Restaurant`
  ADD PRIMARY KEY (`rid`),
  ADD KEY `Restaurant_mid` (`mid`);

--
-- Indexes for table `Specials`
--
ALTER TABLE `Specials`
  ADD PRIMARY KEY (`sid`),
  ADD KEY `rid` (`rid`) USING BTREE;

--
-- Indexes for table `UserOwnsReward`
--
ALTER TABLE `UserOwnsReward`
  ADD PRIMARY KEY (`rewardid`,`uid`),
  ADD KEY `UOR_uid` (`uid`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `CustomerRewards`
--
ALTER TABLE `CustomerRewards`
  MODIFY `rewardid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `Dishes`
--
ALTER TABLE `Dishes`
  MODIFY `did` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `Employees`
--
ALTER TABLE `Employees`
  MODIFY `eid` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary key for employee table', AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `Manager`
--
ALTER TABLE `Manager`
  MODIFY `managerid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `Menu`
--
ALTER TABLE `Menu`
  MODIFY `mid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=301;

--
-- AUTO_INCREMENT for table `Restaurant`
--
ALTER TABLE `Restaurant`
  MODIFY `rid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `Specials`
--
ALTER TABLE `Specials`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `CustomerRatesDish`
--
ALTER TABLE `CustomerRatesDish`
  ADD CONSTRAINT `CRD_did` FOREIGN KEY (`did`) REFERENCES `Dishes` (`did`),
  ADD CONSTRAINT `CRD_uid` FOREIGN KEY (`uid`) REFERENCES `Users` (`uid`);

--
-- Constraints for table `CustomerRewards`
--
ALTER TABLE `CustomerRewards`
  ADD CONSTRAINT `CustomerRewards` FOREIGN KEY (`rid`) REFERENCES `Restaurant` (`rid`);

--
-- Constraints for table `DeliveryLocations`
--
ALTER TABLE `DeliveryLocations`
  ADD CONSTRAINT `DeliveryLoc_rid` FOREIGN KEY (`rid`) REFERENCES `Restaurant` (`rid`);

--
-- Constraints for table `Employees`
--
ALTER TABLE `Employees`
  ADD CONSTRAINT `Employees_managerid` FOREIGN KEY (`managerid`) REFERENCES `Manager` (`managerid`),
  ADD CONSTRAINT `Employees_rid` FOREIGN KEY (`rid`) REFERENCES `Restaurant` (`rid`);

--
-- Constraints for table `Manager`
--
ALTER TABLE `Manager`
  ADD CONSTRAINT `Manager_rid` FOREIGN KEY (`rid`) REFERENCES `Restaurant` (`rid`);

--
-- Constraints for table `Menu`
--
ALTER TABLE `Menu`
  ADD CONSTRAINT `Menu_managerid` FOREIGN KEY (`managerid`) REFERENCES `Manager` (`managerid`);

--
-- Constraints for table `MenuContainsDish`
--
ALTER TABLE `MenuContainsDish`
  ADD CONSTRAINT `MCD_did` FOREIGN KEY (`did`) REFERENCES `Dishes` (`did`),
  ADD CONSTRAINT `MCD_mid` FOREIGN KEY (`mid`) REFERENCES `Menu` (`mid`);

--
-- Constraints for table `Restaurant`
--
ALTER TABLE `Restaurant`
  ADD CONSTRAINT `Restaurant_mid` FOREIGN KEY (`mid`) REFERENCES `Menu` (`mid`);

--
-- Constraints for table `Specials`
--
ALTER TABLE `Specials`
  ADD CONSTRAINT `Specials_rid` FOREIGN KEY (`rid`) REFERENCES `Restaurant` (`rid`);

--
-- Constraints for table `UserOwnsReward`
--
ALTER TABLE `UserOwnsReward`
  ADD CONSTRAINT `UOR_rewardid` FOREIGN KEY (`rewardid`) REFERENCES `CustomerRewards` (`rewardid`),
  ADD CONSTRAINT `UOR_uid` FOREIGN KEY (`uid`) REFERENCES `Users` (`uid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
