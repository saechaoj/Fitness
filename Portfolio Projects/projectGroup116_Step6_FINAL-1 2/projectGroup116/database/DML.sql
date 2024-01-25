/*
Oregon State University
Authors: Jarrod Saechao and James Lee
Course: CS 340
Group: 116
Assignment: Project Step 3 Draft
Due Date: 2022-10-27
Description: Data manupulation queries
*/

----------------------------------
-- Trainers CRUD operations
----------------------------------

-- CREATE
INSERT INTO Trainers (
  payRate,
  firstName,
  lastName,
  trainerEmail,
  trainerPhone
)
VALUES
(
  55.90,
  "Tweedle",
  "Dee",
  "woohoo@fake.com",
  2221113333
);

-- READ
SELECT * FROM Trainers;

-- UPDATE
UPDATE Trainers
SET firstName = "Scrappy"
WHERE Trainers.firstName = "Scooby";

-- DELETE
DELETE FROM Trainers
WHERE trainerPhone = 2221113333;

----------------------------------
-- Clients CRUD operations
----------------------------------

-- CREATE
INSERT INTO Clients (
  firstName,
  lastName,
  clientEmail,
  clientPhone
)
VALUES
(
  :first_name,
  :last_name,
  :client_email,
  :client_phone
);

-- READ
SELECT 
clientID AS ID, 
firstName AS "First Name", 
lastName AS "Last Name", 
clientEmail AS Email, 
clientPhone AS Phone 
FROM Clients;

-- UPDATE
UPDATE Clients
SET firstName = :client_last_name, lastName = client_last_name
WHERE clientID = :client_id;

-- DELETE
DELETE FROM Clients
WHERE clientID = :client_id;

----------------------------------
-- Payments CRUD operations
----------------------------------

-- CREATE
INSERT INTO Payments (
    payDate,
    payAmount,
    payType,
    cardNumber,
    cardExpiration,
    cardCVV,
    paymentsClientID,
    paymentsSaleID
)
VALUES
(
  :pay_date,
  :pay_amount,
  :pay_type,
  :card_number,
  :card_expiration,
  :cardCVV,
  :client_id,
  :sale_id
);

-- READ
SELECT 
paymentID AS 'Payment ID', 
paymentsSaleID AS 'Sale ID',
payDate AS 'Payment', 
payAmount AS 'Payment Amount', 
CASE 
WHEN payType = 0 THEN 'CASH' 
WHEN payType = 1 THEN 'VISA' 
WHEN payType = 2 THEN 'MASTERCARD' 
ELSE 'AMEX' 
END AS 'Payment Type', 
cardNumber AS 'Card Number', 
cardExpiration AS 'Card Expiration', 
FORMAT(cardCVV, 'XXX') AS 'Card CVV', 
CONCAT(firstName, ' ', lastName) AS 'Client', 
clientID 
FROM Payments
LEFT JOIN Clients
ON paymentsClientID = clientID;

-- UPDATE N/A
-- DELETE N/A

-- NOTE:  Payments should not be updated or deleted.
--        For refunds, a new payment should be created.

----------------------------------
-- Workout Sessions CRUD operations
----------------------------------

-- CREATE
INSERT INTO WorkoutSessions (
  sessionDate,
  workoutSessionsTrainerID,
  startTime,
  endTime
)
VALUES
(
  :session_date,
  :trainer_id,
  :start_time,
  :end_time
);

-- READ
SELECT
sessionID AS 'Session ID',
sessionDate AS 'Date',
CONCAT(Trainers.firstName, ' ', Trainers.lastName) AS 'Trainer',
CONCAT(Clients.firstName, ' ', Clients.lastName) AS 'Client',
startTime AS 'Start Time',
endTime AS 'End Time'
FROM Trainers
RIGHT JOIN WorkoutSessions
ON WorkoutSessions.workoutSessionsTrainerID = Trainers.trainerID
LEFT JOIN SessionDetails
ON SessionDetails.sessionDetailsSessionID = WorkoutSessions.sessionID
LEFT JOIN Clients
ON SessionDetails.sessionDetailsClientID = Clients.clientID
ORDER BY sessionDate, startTime DESC;

-- UPDATE
UPDATE WorkoutSessions
SET
sessionDate = :new_session_date,
startTime = :new_start_time,
endTime = :new_end_time
WHERE workoutSessionsTrainerID = :trainer_id
AND startTime = :start_time;

-- DELETE
DELETE FROM WorkoutSessions
WHERE sessionID = :sessionID;

----------------------------------
-- Sales CRUD operations
----------------------------------

-- CREATE
INSERT INTO Sales 
(salesSessionID, salesTrainerID, salesClientID, saleDate, saleAmount, saleType) 
VALUES 
(
    (SELECT sessionID FROM WorkoutSessions
    WHERE workoutSessionsTrainerID=:trainer_id
    AND startTime=:session_time), 
    :trainer_id,
    :session_client,
    :sale_date,
    :sale_amount,
    :sale_type
);

-- READ
SELECT 
saleID AS 'Sale ID', 
saleDate AS 'Sale Date', 
CASE 
WHEN saleType = 0 THEN 'SESSION' 
ELSE 'MERCHANDISE' 
END AS 'Sale Type', 
trainerID, 
CONCAT(Trainers.firstName, ' ', Trainers.lastName) AS 'Trainer', 
clientID, 
CONCAT(Clients.firstName, ' ', Clients.lastName) AS 'Client', 
saleAmount AS 'Sale Amount', 
CASE 
WHEN 
(saleAmount - (SELECT SUM(payAmount) FROM Payments WHERE Payments.paymentsSaleID=Sales.saleID)) 
IS NOT NULL THEN 
(saleAmount - (SELECT SUM(payAmount) FROM Payments WHERE Payments.paymentsSaleID=Sales.saleID)) 
ELSE saleAmount 
END 
AS 'Outstanding Balance' 
FROM Sales 
LEFT JOIN Trainers 
ON salesTrainerID = trainerID 
LEFT JOIN Clients 
ON salesClientID = clientID;

-- UPDATE
UPDATE Sales
SET saleAmount = 3000
WHERE salesTrainerID = (
  SELECT workoutSessionsTrainerID
  FROM WorkoutSessions
  WHERE sessionDate='2022-10-20'
  AND startTime = '15:00:00'
);

-- DELETE (ON DELETE RESTRICT SHOULD STOP THIS FROM BEING DELETED)
DELETE FROM Sales
WHERE saleID = :sale_id;

----------------------------------
-- Memberships CRUD operations
----------------------------------

-- CREATE
INSERT INTO Memberships (
  memberSince,
  memberExpiration,
  memberLevel,
  memberClientID
)
VALUES
(
  '2022-01-01',
  '2023-01-01',
  0,
  (SELECT clientID FROM Clients WHERE clientPhone = 2221110004)
);

-- READ
SELECT * FROM Memberships;

-- UPDATE
UPDATE Memberships
SET memberExpiration = '2025-01-01'
WHERE (SELECT clientID FROM Clients WHERE clientPhone = 2221110004);

-- DELETE
DELETE FROM Memberships
WHERE (SELECT clientID FROM Clients WHERE clientPhone = 2221110004);