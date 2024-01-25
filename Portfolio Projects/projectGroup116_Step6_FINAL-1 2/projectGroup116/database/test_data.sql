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

-- INSERT INTO `WorkoutSessions` (
--   `sessionDate`,
--   `workoutSessionsTrainerID`,
--   `startTime`,
--   `endTime`
-- )
-- VALUES
-- (
--   '2022-10-20',
--   (SELECT `trainerID` FROM `Trainers` WHERE `firstName` = "Scooby"),
--   '15:00:00',
--   '15:55:00'
-- ),
-- (
--   '2022-10-20',
--   (SELECT `trainerID` FROM `Trainers` WHERE `firstName` = "Scooby"),
--   '10:00:00',
--   '10:55:00'
-- ),
-- (
--   '2022-10-20',
--   (SELECT `trainerID` FROM `Trainers` WHERE `firstName` = "Shirley"),
--   '11:00:00',
--   '11:55:00'
-- ),
-- (
--   '2022-10-20',
--   (SELECT `trainerID` FROM `Trainers` WHERE `firstName` = "Arnold"),
--   '12:00:00',
--   '12:55:00'
-- );

-- SELECT * FROM `WorkoutSessions`;

-- -- ---------------------------
-- -- `SessionDetails` Sample Data
-- -- ---------------------------

-- INSERT INTO `SessionDetails` (
--     `sessionDetailsSessionID`,
--     `sessionDetailsClientID`
-- )
-- VALUES
-- (
--     (SELECT `sessionID`
--         FROM `WorkoutSessions`
--         WHERE `sessionDate`='2022-10-20'
--         AND `startTime`='15:00:00'),
--     (SELECT `clientID`
--         FROM `Clients`
--         WHERE `clientPhone` = 2221110001)
-- ),
-- (
--     (SELECT `sessionID`
--         FROM `WorkoutSessions`
--         WHERE `sessionDate`='2022-10-20'
--         AND `startTime`='15:00:00'),
--     (SELECT `clientID`
--         FROM `Clients`
--         WHERE `clientPhone` = 2221110003)
-- ),
-- (
--     (SELECT `sessionID`
--         FROM `WorkoutSessions`
--         WHERE `sessionDate`='2022-10-20'
--         AND `startTime`='10:00:00'),
--     (SELECT `clientID`
--         FROM `Clients`
--         WHERE `clientPhone` = 2221110002)
-- );

-- SELECT * FROM `SessionDetails`;

-- -- ------------------
-- -- `Sales` Sample Data
-- -- ------------------

-- INSERT INTO `Sales` (
--     `salesSessionID`,
--     `salesTrainerID`,
--     `saleAmount`,
--     `salesClientID`
-- )
-- VALUES
-- (
--     (
--         SELECT `sessionID`
--         FROM `WorkoutSessions`
--         WHERE `sessionDate`='2022-10-20'
--         AND `startTime`='15:00:00'
--     ),
--     (
--         SELECT `workoutSessionsTrainerID`
--         FROM `WorkoutSessions`
--         WHERE `sessionDate`='2022-10-20'
--         AND `startTime` = '15:00:00'
--     ),
--     (
--         SELECT `payRate`
--         FROM `Trainers`
--         WHERE `trainerID` = 
--         (
--             SELECT `workoutSessionsTrainerID`
--             FROM `WorkoutSessions`
--             WHERE `sessionDate`='2022-10-20'
--             AND `startTime`='15:00:00'
--         )
--     ),
--     (
--         SELECT `clientID`
--         FROM `Clients`
--         WHERE `clientPhone` = 2221110001
--     )
-- ),
-- (
--     (
--         SELECT `sessionID`
--         FROM `WorkoutSessions`
--         WHERE `sessionDate`='2022-10-20'
--         AND `startTime`='15:00:00'
--     ),
--     (
--         SELECT `workoutSessionsTrainerID`
--         FROM `WorkoutSessions`
--         WHERE `sessionDate`='2022-10-20'
--         AND `startTime` = '15:00:00'
--     ),
--     (
--         SELECT `payRate`
--         FROM `Trainers`
--         WHERE `trainerID` = 
--         (
--             SELECT `workoutSessionsTrainerID`
--             FROM `WorkoutSessions`
--             WHERE `sessionDate`='2022-10-20'
--             AND `startTime`='15:00:00'
--         )
--     ),
--     (
--         SELECT `clientID`
--         FROM `Clients`
--         WHERE `clientPhone` = 2221110003
--     )
-- ),
-- (
--     (
--         SELECT `sessionID`
--         FROM `WorkoutSessions`
--         WHERE `sessionDate`='2022-10-20'
--         AND `startTime`='10:00:00'
--     ),
--     (
--         SELECT `workoutSessionsTrainerID`
--         FROM `WorkoutSessions`
--         WHERE `sessionDate`='2022-10-20'
--         AND `startTime` = '10:00:00'
--     ),
--     (
--         SELECT `payRate`
--         FROM `Trainers`
--         WHERE `trainerID` = 
--         (
--             SELECT `workoutSessionsTrainerID`
--             FROM `WorkoutSessions`
--             WHERE `sessionDate`='2022-10-20'
--             AND `startTime`='10:00:00'
--         )
--     ),
--     (
--         SELECT `clientID`
--         FROM `Clients`
--         WHERE `clientPhone` = 2221110002
--     )
-- );

-- SELECT * FROM `Sales`;

-- -- ---------------------
-- -- `Payments` Sample Data
-- -- ---------------------

-- INSERT INTO `Payments` (
--     `payDate`,
--     `payAmount`,
--     `payType`,
--     `cardNumber`,
--     `cardExpiration`,
--     `cardCVV`,
--     `paymentsClientID`,
--     `paymentsSaleID`
-- )
-- VALUES
-- (
--     '2022-10-20 00:00:01',
--     23.90,
--     "CASH",
--     NULL,
--     NULL,
--     NULL,
--     (
--         SELECT `clientID`
--         FROM `Clients`
--         WHERE `clientPhone` = 2221110001
--     ),
--     (
--         SELECT `saleID`
--         FROM `Sales`
--         WHERE `salesSessionID` = 
--         (
--             SELECT `sessionID`
--             FROM `WorkoutSessions`
--             WHERE `sessionDate`='2022-10-20'
--             AND `startTime`='15:00:00'
--         )
--         AND `salesClientID` =
--         (
--             SELECT `clientID`
--             FROM `Clients`
--             WHERE `clientPhone` = 2221110001
--         )
--     )
-- ),
-- (
--     '2022-10-20 00:00:02',
--     23.90,
--     "VISA",
--     1111222233334444,
--     '2025-01-01',
--     123,
--     (
--         SELECT `clientID`
--         FROM `Clients`
--         WHERE `clientPhone` = 2221110003
--     ),
--     (
--         SELECT `saleID`
--         FROM `Sales`
--         WHERE `salesSessionID` = 
--         (
--             SELECT `sessionID`
--             FROM `WorkoutSessions`
--             WHERE `sessionDate`='2022-10-20'
--             AND `startTime`='15:00:00'
--         )
--         AND `salesClientID` =
--         (
--             SELECT `clientID`
--             FROM `Clients`
--             WHERE `clientPhone` = 2221110003
--         )
--     )
-- ),
-- (
--     '2022-10-20 00:00:03',
--     23.90,
--     "MASTERCARD",
--     1111222233334444,
--     '2025-01-01',
--     123,
--     (
--         SELECT `clientID`
--         FROM `Clients`
--         WHERE `clientPhone` = 2221110002
--     ),
--     (
--         SELECT `saleID`
--         FROM `Sales`
--         WHERE `salesSessionID` = 
--         (
--             SELECT `sessionID`
--             FROM `WorkoutSessions`
--             WHERE `sessionDate`='2022-10-20'
--             AND `startTime`='10:00:00'
--         )
--         AND `salesClientID` =
--         (
--             SELECT `clientID`
--             FROM `Clients`
--             WHERE `clientPhone` = 2221110002
--         )
--     )
-- );

-- SELECT * FROM `Payments`;

-- -- ---------------------
-- -- `Memberships` Sample Data
-- -- ---------------------

-- INSERT INTO `Memberships` (
--   `memberSince`,
--   `memberExpiration`,
--   `memberLevel`,
--   `memberClientID`
-- )
-- VALUES
-- (
--   '2022-01-01',
--   '2023-01-01',
--   0,
--   (SELECT `clientID` FROM `Clients` WHERE `clientPhone` = 2221110001)
-- ),
-- (
--   '2022-01-01',
--   '2023-01-01',
--   1,
--   (SELECT `clientID` FROM `Clients` WHERE `clientPhone` = 2221110002)
-- ),
-- (
--   '2022-01-01',
--   '2023-01-01',
--   2,
--   (SELECT `clientID` FROM `Clients` WHERE `clientPhone` = 2221110003)
-- );

-- SELECT * FROM `Memberships`;