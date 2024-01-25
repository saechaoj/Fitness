/*
Oregon State University
Authors: Jarrod Saechao and James Lee
Course: CS 340
Group: 116
Assignment: Project Step 6 Final 
Due Date: 2022-12-05
Description: Schema definition and sample data
*/

-- MySQL Workbench Forward Engineering

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT=0;

DROP TABLE IF EXISTS `Clients`;
DROP TABLE IF EXISTS `Trainers`;
DROP TABLE IF EXISTS `WorkoutSessions`;
DROP TABLE IF EXISTS `SessionDetails`;
DROP TABLE IF EXISTS `Sales`;
DROP TABLE IF EXISTS `Payments`;
DROP TABLE IF EXISTS `Memberships`;

-- -----------------------------------------------------
-- Table `Clients`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Clients` (
  `clientID` INT UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(255) NOT NULL,
  `lastName` VARCHAR(255) NOT NULL,
  `clientEmail` VARCHAR(255) NULL,
  `clientPhone` BIGINT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`clientID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Trainers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Trainers` (
  `trainerID` INT UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT,
  `payRate` DECIMAL(19,2) NOT NULL,
  `firstName` VARCHAR(255) NOT NULL,
  `lastName` VARCHAR(255) NOT NULL,
  `trainerEmail` VARCHAR(255) NOT NULL,
  `trainerPhone` BIGINT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`trainerID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `WorkoutSessions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `WorkoutSessions` (
  `sessionID` INT UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT,
  `sessionDate` DATE NOT NULL,
  `workoutSessionsTrainerID` INT UNSIGNED,
  `startTime` TIME NOT NULL,
  `endTime` TIME NOT NULL,
  PRIMARY KEY (`sessionID`),
  INDEX `fk_sessions_Trainers1_idx` (`workoutSessionsTrainerID` ASC) VISIBLE,
  CONSTRAINT `fk_sessions_Trainers1`
    FOREIGN KEY (`workoutSessionsTrainerID`)
    REFERENCES `Trainers` (`trainerID`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION,
  CONSTRAINT `unique_sessions`
    UNIQUE (`workoutSessionsTrainerID`, `startTime`)
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Sales`

-- SaleType: 0 = workout session, 1 = merchandise
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Sales` (
  `saleID` INT UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT,
  `salesSessionID` INT UNSIGNED NULL,
  `salesTrainerID` INT UNSIGNED NULL,
  `salesClientID` INT UNSIGNED NULL,
  `saleDate` DATETIME NOT NULL,
  `saleAmount` DECIMAL(19,2) NULL,
  `saleType` TINYINT(1) DEFAULT 0, -- 0 = workout session, 1 = merchandise
  PRIMARY KEY (`saleID`),
  CONSTRAINT `fk_sales_sessions1`
    FOREIGN KEY (`salesSessionID`)
    REFERENCES `WorkoutSessions` (`sessionID`)
    ON DELETE RESTRICT
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sales_trainers1`
    FOREIGN KEY (`salesTrainerID`)
    REFERENCES `Trainers` (`trainerID`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sales_clients1`
    FOREIGN KEY (`salesClientID`)
    REFERENCES `Clients` (`clientID`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION,
  CONSTRAINT `unique_sales`
    UNIQUE (`salesSessionID`, `salesClientID`)
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `SessionDetails`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SessionDetails` (
  `sessionDetailsID` INT UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT,
  `sessionDetailsSessionID` INT UNSIGNED NOT NULL,
  `sessionDetailsClientID` INT UNSIGNED NULL,
  PRIMARY KEY (`sessionDetailsID`),
  CONSTRAINT `fk_sessions_has_clients_sessions1`
    FOREIGN KEY (`sessionDetailsSessionID`)
    REFERENCES `WorkoutSessions` (`sessionID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sessions_has_clients_clients1`
    FOREIGN KEY (`sessionDetailsClientID`)
    REFERENCES `Clients` (`clientID`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Payments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Payments` (
  `paymentID` INT UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT,
  `payDate` DATETIME NOT NULL,
  `payAmount` DECIMAL(19,2) NOT NULL,
  `payType` TINYINT(1) NOT NULL, -- 0=CASH, 1=VISA, 2=MASTERCARD, 3=AMEX
  `cardNumber` VARCHAR(16) NULL,
  `cardExpiration` DATE NULL,
  `cardCVV` INT(4) UNSIGNED NULL,
  `paymentsClientID` INT UNSIGNED NULL,
  `paymentsSaleID` INT UNSIGNED NULL,
  PRIMARY KEY (`paymentID`),
  CONSTRAINT `fk_payments_clients1`
    FOREIGN KEY (`paymentsClientID`)
    REFERENCES `Clients` (`clientID`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_payments_sales1`
    FOREIGN KEY (`paymentsSaleID`)
    REFERENCES `Sales` (`saleID`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Memberships`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Memberships` (
  `memberID` INT UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT,
  `memberSince` DATE NULL,
  `memberExpiration` DATE NULL,
  `memberLevel` TINYINT(1) NULL,
  `memberClientID` INT UNSIGNED UNIQUE NOT NULL,
  PRIMARY KEY (`memberID`),
  CONSTRAINT `fk_memberships_Clients1`
    FOREIGN KEY (`memberClientID`)
    REFERENCES `Clients` (`clientID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- SAMPLE DATA INSERT STATEMENTS

-- -------------------
-- CLIENT SAMPLE DATA
-- -------------------

INSERT INTO `Clients` (
  `firstName`,
  `lastName`,
  `clientEmail`,
  `clientPhone`
)
VALUES
(
  "John",
  "Smith",
  "johnsmith@fake.com",
  2221110001
),
(
  "Jane",
  "Smith",
  "janesmith@fake.com",
  2221110002
),
(
  "Michael",
  "Jackson",
  "heehee@fake.com",
  2221110003
),
(
  "The",
  "Dude",
  "myrug@fake.com",
  2221110004
);

SELECT * FROM `Clients`;

-- ---------------------
-- `Trainers` Sample Data
-- ---------------------

INSERT INTO `Trainers` (
  `payRate`,
  `firstName`,
  `lastName`,
  `trainerEmail`,
  `trainerPhone`
)
VALUES
(
  85.50,
  "Arnold",
  "Schwarzenegger",
  "illbeback@fake.com",
  2221110005
),
(
  23.90,
  "Scooby",
  "Doo",
  "ruffworkouts@fake.com",
  2221110006
),
(
  75.50,
  "Thor",
  "Odinson",
  "justbash@fake.com",
  2221110007
),
(
  20.00,
  "Shirley",
  "Temple",
  "meanerthanilook@fake.com",
  2221110008
);

SELECT * FROM `Trainers`;

-- ----------------------------
-- `WorkoutSessions` Sample Data
-- ----------------------------

INSERT INTO `WorkoutSessions` (
  `sessionDate`,
  `workoutSessionsTrainerID`,
  `startTime`,
  `endTime`
)
VALUES
(
  '2022-10-20',
  (SELECT `trainerID` FROM `Trainers` WHERE `firstName` = "Scooby"),
  '15:00:00',
  '15:55:00'
),
(
  '2022-10-20',
  (SELECT `trainerID` FROM `Trainers` WHERE `firstName` = "Scooby"),
  '10:00:00',
  '10:55:00'
),
(
  '2022-10-20',
  (SELECT `trainerID` FROM `Trainers` WHERE `firstName` = "Shirley"),
  '11:00:00',
  '11:55:00'
),
(
  '2022-10-20',
  (SELECT `trainerID` FROM `Trainers` WHERE `firstName` = "Arnold"),
  '12:00:00',
  '12:55:00'
);

SELECT * FROM `WorkoutSessions`;

-- ---------------------------
-- `SessionDetails` Sample Data
-- ---------------------------

INSERT INTO `SessionDetails` (
    `sessionDetailsSessionID`,
    `sessionDetailsClientID`
)
VALUES
(
    (SELECT `sessionID`
        FROM `WorkoutSessions`
        WHERE `sessionDate`='2022-10-20'
        AND `startTime`='15:00:00'),
    (SELECT `clientID`
        FROM `Clients`
        WHERE `clientPhone` = 2221110001)
),
(
    (SELECT `sessionID`
        FROM `WorkoutSessions`
        WHERE `sessionDate`='2022-10-20'
        AND `startTime`='15:00:00'),
    (SELECT `clientID`
        FROM `Clients`
        WHERE `clientPhone` = 2221110003)
),
(
    (SELECT `sessionID`
        FROM `WorkoutSessions`
        WHERE `sessionDate`='2022-10-20'
        AND `startTime`='10:00:00'),
    (SELECT `clientID`
        FROM `Clients`
        WHERE `clientPhone` = 2221110002)
),
(
    (SELECT `sessionID`
        FROM `WorkoutSessions`
        WHERE `workoutSessionsTrainerID`=
        (SELECT `trainerID` FROM `Trainers` WHERE `firstName` = "Arnold")
        AND `startTime`='12:00:00'),
    (SELECT `clientID`
        FROM `Clients`
        WHERE `clientPhone` = 2221110002)
),
(
    (SELECT `sessionID`
        FROM `WorkoutSessions`
        WHERE `workoutSessionsTrainerID`=
        (SELECT `trainerID` FROM `Trainers` WHERE `firstName` = "Shirley")
        AND `startTime`='11:00:00'),
    (SELECT `clientID`
        FROM `Clients`
        WHERE `clientPhone` = 2221110002)
);

SELECT * FROM `SessionDetails`;

-- ------------------
-- `Sales` Sample Data
-- ------------------

INSERT INTO `Sales` (
  `salesSessionID`,
  `salesTrainerID`,
  `saleDate`,
  `saleAmount`,
  `salesClientID`
)
VALUES
(
  1,
  2,
  '2022-10-20',
  23.90,
  1
),
(
  1,
  2,
  '2022-10-20',
  23.90,
  3
),
(
  2,
  2,
  '2022-10-20',
  23.90,
  2
),
(
  4,
  1,
  '2022-10-20',
  85.50,
  2
),
(
  3,
  4,
  '2022-10-20',
  20.00,
  2
);

SELECT * FROM `Sales`;

-- ---------------------
-- `Payments` Sample Data
-- ---------------------

INSERT INTO `Payments` (
    `payDate`,
    `payAmount`,
    `payType`,
    `cardNumber`,
    `cardExpiration`,
    `cardCVV`,
    `paymentsClientID`,
    `paymentsSaleID`
)
VALUES
(
    '2022-10-20 00:00:01',
    23.90,
    0,
    NULL,
    NULL,
    NULL,
    (
        SELECT `clientID`
        FROM `Clients`
        WHERE `clientPhone` = 2221110001
    ),
    (
        SELECT `saleID`
        FROM `Sales`
        WHERE `salesSessionID` = 
        (
            SELECT `sessionID`
            FROM `WorkoutSessions`
            WHERE `sessionDate`='2022-10-20'
            AND `startTime`='15:00:00'
        )
        AND `salesClientID` =
        (
            SELECT `clientID`
            FROM `Clients`
            WHERE `clientPhone` = 2221110001
        )
    )
),
(
    '2022-10-20 00:00:02',
    23.90,
    1,
    'XXXXXXXXXXXX4444',
    '2025-01-01',
    123,
    (
        SELECT `clientID`
        FROM `Clients`
        WHERE `clientPhone` = 2221110003
    ),
    (
        SELECT `saleID`
        FROM `Sales`
        WHERE `salesSessionID` = 
        (
            SELECT `sessionID`
            FROM `WorkoutSessions`
            WHERE `sessionDate`='2022-10-20'
            AND `startTime`='15:00:00'
        )
        AND `salesClientID` =
        (
            SELECT `clientID`
            FROM `Clients`
            WHERE `clientPhone` = 2221110003
        )
    )
),
(
    '2022-10-20 00:00:03',
    23.90,
    2,
    'XXXXXXXXXXXX4444',
    '2025-01-01',
    123,
    (
        SELECT `clientID`
        FROM `Clients`
        WHERE `clientPhone` = 2221110002
    ),
    (
        SELECT `saleID`
        FROM `Sales`
        WHERE `salesSessionID` = 
        (
            SELECT `sessionID`
            FROM `WorkoutSessions`
            WHERE `sessionDate`='2022-10-20'
            AND `startTime`='10:00:00'
        )
        AND `salesClientID` =
        (
            SELECT `clientID`
            FROM `Clients`
            WHERE `clientPhone` = 2221110002
        )
    )
);

SELECT * FROM `Payments`;

-- ---------------------
-- `Memberships` Sample Data
-- ---------------------

INSERT INTO `Memberships` (
  `memberSince`,
  `memberExpiration`,
  `memberLevel`,
  `memberClientID`
)
VALUES
(
  '2022-01-01',
  '2023-01-01',
  0,
  1
),
(
  '2022-01-01',
  '2023-01-01',
  1,
  2
),
(
  '2022-01-01',
  '2023-01-01',
  2,
  3
);

SELECT * FROM `Memberships`;

SET FOREIGN_KEY_CHECKS=1;
COMMIT;
