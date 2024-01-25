/*
Oregon State University
Authors: Jarrod Saechao and James Lee
Course: CS 340
Group: 116
Assignment: Project Step 6 Final 
Due Date: 2022-12-05
Description: Express server with route handlers
*/

// for using .env to manage app environment variables
var dotenv = require('dotenv').config();

// ------------------------------------------------------------------
// Express Server Setup
// ------------------------------------------------------------------
var express = require('express'); 
var app     = express();           
const PORT = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// ------------------------------------------------------------------
// Database declaration
// ------------------------------------------------------------------
var db = require('./database/db-connector');

// ------------------------------------------------------------------
// Handlebars setup
// ------------------------------------------------------------------
var expresshbs = require('express-handlebars');
var myexpresshbs = expresshbs.create({extname: '.hbs'});
app.engine('.hbs', myexpresshbs.engine)
app.set('view engine', '.hbs');

// Handlebars register helpers
myexpresshbs.handlebars.registerHelper('formatdate', function(date){
    if (date !== null) {
        return new Date(date).toLocaleDateString('en-US');
    } else {
        return null;
    }
});

// ------------------------------------------------------------------
// Static Files
// ------------------------------------------------------------------
app.use(express.static('public'));

/*
    Routes
*/

// ------------------------------------
// Home Page Routes
// ------------------------------------
app.get('/', function(req, res)
    {
        res.render('index');                    // Note the call to render() and not send(). Using render() ensures the templating engine
    }); 

// ------------------------------------
// Trainers Page Routes
// 
// TODO:
// filtering
// simplify code
// ------------------------------------
app.get('/trainers', function(req, res)
    {
        let filterQuery = false;
        let query1;

        // check request for any filter requests
        for (const i in req.query) {
            if (req.query[i][0] !== undefined) {
                filterQuery = true;
                break;
            }
        }

        // TODO:
        // SELECT queries (for filtering)
        if (filterQuery) {
            query1 = 'SELECT trainerID AS ID, payRate AS "Pay Rate", firstName AS "First Name", lastName AS "Last Name", trainerEmail AS Email, trainerPhone AS Phone FROM Trainers;';
            query2 = 'SELECT * FROM Trainers;'
        }

        else {
            query1 = 'SELECT trainerID AS ID, payRate AS "Pay Rate", firstName AS "First Name", lastName AS "Last Name", trainerEmail AS Email, trainerPhone AS Phone FROM Trainers;';
            query2 = 'SELECT * FROM Trainers;'
        }
        
        db.pool.query(query1, function(error, rows, fields){
            let headRows = rows;
            
            db.pool.query(query2, function(error, rows, fields){
                res.render('trainers', {data: rows, headData: headRows})
            });
        });
    }
); 

app.post('/add-trainer', function(req,res) {
    // capture incoming data
    let data = req.body;

    // capture null values
    // No attributes can be null in Trainers tables
    
    query1 = `INSERT INTO Trainers (payRate, firstName, lastName, trainerEmail, trainerPhone) VALUES ( ${data['add-pay']}, '${data['add-fname']}', '${data['add-lname']}', '${data['add-email']}', ${data['add-phone']} )`;

    // Query db to add info from form
    db.pool.query(query1, function(error, rows, fields){
        // check for error in query
        if (error) {
            // log error and send bad request response
            console.log(error);
            res.sendStatus(400);
        }
        // if no error, show all tables
        else {
            res.redirect('/trainers');
        }
    });
});

app.delete('/trainers', function(req,res) {
    let data = req.body;
    let delete_id = parseInt(data.id);
    let query1 = `DELETE FROM Trainers WHERE trainerID = ?`;

    db.pool.query(query1, [delete_id] , function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            res.sendStatus(204); 
        }
    });

});

app.put('/trainers', (req, res) => {
    let data = req.body;
    query1 = `UPDATE Trainers SET payRate=${data.payRate}, firstName='${data.firstName}', lastName='${data.lastName}', trainerEmail='${data.trainerEmail}', trainerPhone=${data.trainerPhone} WHERE trainerID=${data.editID}`;
    query2 = `SELECT * FROM Trainers WHERE trainerID=${data.editID}`;
    db.pool.query(query1, (error, rows, fields) => {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            db.pool.query(query2, (error, rows, fields) => {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            });
        }
    });
});

// ------------------------------------
// Clients Page Routes
// 
// TODO:
// Optional membership data
// filtering
// cleanup code
// ------------------------------------
app.get('/clients', function(req, res)
{
    let filterQuery = false;
    let query1;

    // check request for any filter requests
    for (const i in req.query) {
        if (req.query[i][0] !== undefined) {
            filterQuery = true;
            break;
        }
    }

    // TODO:
    // SELECT queries (for filtering)
    if (filterQuery) {
        query1 = 'SELECT clientID AS ID, firstName AS "First Name", lastName AS "Last Name", clientEmail AS Email, clientPhone AS Phone FROM Clients;';
        query2 = 'SELECT * FROM Clients;'
    }

    else {
        query1 = 'SELECT clientID AS ID, firstName AS "First Name", lastName AS "Last Name", clientEmail AS Email, clientPhone AS Phone FROM Clients;';
        query2 = 'SELECT * FROM Clients;'
    }
    
    db.pool.query(query1, function(error, rows, fields){
        let headRows = rows;
        
        db.pool.query(query2, function(error, rows, fields){
            res.render('clients', {data: rows, headData: headRows})
        });
    });
}); 

app.post('/add-client', function(req,res) {
    // capture incoming data
    let data = req.body;

    // capture null values
    // No attributes can be null in Trainers tables
    
    query1 = `INSERT INTO Clients (firstName, lastName, clientEmail, clientPhone) VALUES ( '${data['add-fname']}', '${data['add-lname']}', '${data['add-email']}', ${data['add-phone']} )`;

    // Query db to add info from form
    db.pool.query(query1, function(error, rows, fields){
        // check for error in query
        if (error) {
            // log error and send bad request response
            console.log(error);
            res.sendStatus(400);
        }
        // if no error, show all tables
        else {
            res.redirect('/clients');
        }
    });
});

app.delete('/clients', function(req,res) {
    let data = req.body;
    let delete_id = parseInt(data.id);
    let query1 = `DELETE FROM Clients WHERE clientID = ?`;

    db.pool.query(query1, [delete_id] , function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            res.sendStatus(204); 
        }
    });

});

app.put('/clients', (req, res) => {
    let data = req.body;
    query1 = `UPDATE Clients SET firstName='${data.firstName}', lastName='${data.lastName}', clientEmail='${data.clientEmail}', clientPhone=${data.clientPhone} WHERE clientID=${data.editID}`;
    query2 = `SELECT * FROM Clients WHERE clientID=${data.editID}`;
    db.pool.query(query1, (error, rows, fields) => {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            db.pool.query(query2, (error, rows, fields) => {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            });
        }
    });
});

// ------------------------------------
// Workout Sessions Page Routes
// 
// TODO:
// ------------------------------------

// Read function
app.get('/workoutsessions', function(req, res) {
    // query for trainer select datalist
    let trainer_query = "SELECT trainerID, CONCAT(firstName, ' ', lastName) AS Trainer FROM Trainers;";

    // query for client select datalist
    let client_query = "SELECT clientID, CONCAT(firstName, ' ', lastName) AS Client FROM Clients;";

    let session_query = "SELECT sessionID AS 'Session ID', DATE(sessionDate) AS 'Date', CONCAT(Trainers.firstName, ' ', Trainers.lastName) AS 'Trainer', Trainers.trainerID, CONCAT(Clients.firstName, ' ', Clients.lastName) AS 'Client', Clients.clientID, startTime AS 'Start Time', endTime AS 'End Time' FROM Trainers RIGHT JOIN WorkoutSessions ON WorkoutSessions.workoutSessionsTrainerID = Trainers.trainerID LEFT JOIN SessionDetails ON SessionDetails.sessionDetailsSessionID = WorkoutSessions.sessionID LEFT JOIN Clients ON SessionDetails.sessionDetailsClientID = Clients.clientID ORDER BY sessionDate, startTime DESC;";
    
    db.pool.query(trainer_query, (trainer_err, trainer_rows, trainer_fields) => {
        db.pool.query(client_query, (client_err, client_rows, client_fields) => {
            db.pool.query(session_query, (session_err, session_rows, session_fields) => {
                res.render('workoutsessions', {trainer_data: trainer_rows, client_data: client_rows, session_data: session_rows})
            });
        });
    });
});

// Create function
app.post('/workoutsessions', (req, res) => {
    let data = req.body;

    // query 1: insert into workout sessions table
    let session_query = `INSERT INTO WorkoutSessions (sessionDate, workoutSessionsTrainerID, startTime, endTime) VALUES ( '${data.session_date}', '${data.trainer_id}', '${data.start_time}', '${data.end_time}' );`;
    
    // query 2: use intersection table "SessionDetails" to add clients to workout session

    // append each client id to intersection table insert
    let add_strings = [];
    let sessionDetailsSessionID, values_string;
    for (let clientID of data.clients) {
        // subquery looks up session id by trainer id and start time
        sessionDetailsSessionID = `(SELECT sessionID FROM WorkoutSessions WHERE workoutSessionsTrainerID='${data.trainer_id}' AND startTime='${data.start_time}')`;

        // string to append
        values_string = `( ${sessionDetailsSessionID}, ${clientID} )`;

        add_strings.push(values_string);
    };


    // add clients to insert statement for session details
    let session_details_query = `INSERT INTO SessionDetails (sessionDetailsSessionID, sessionDetailsClientID) VALUES ${add_strings.join()};`;

    // query db
    db.pool.query(session_query, (err, rows, fields) => {
        // send response if workout session insert doesn't work
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            db.pool.query(session_details_query, (err, rows, fields) => {
                // respond with err if sessionDetails doesn't work
                if (err) {
                    console.log(err);
                    res.status(400).send(err);
                } else {
                    res.sendStatus(200);
                }
            });
        }
    });
});

// Update Function
app.put('/workoutsessions', (req, res) => {
    let data = req.body;
    
    // update WorkoutSession table trainer, startTime, endTime
    let update_query = `UPDATE WorkoutSessions SET workoutSessionsTrainerID='${data.trainer_id}', sessionDate='${data.session_date}', startTime='${data.start_time}', endTime='${data.end_time}' WHERE sessionID='${data.session_id}';`;

    // delete clients previously in intersection table
    let del_query = `DELETE FROM SessionDetails WHERE sessionDetailsSessionID='${data.session_id}'`;

    // add new clients from requested clients array
    let add_query = `INSERT INTO SessionDetails (sessionDetailsSessionID, sessionDetailsClientID) VALUES `;
    let add_query_data = [];
    for (client_id of data.clients) {
        add_query_data.push(`('${data.session_id}', '${client_id}')`);
    };
    add_query = add_query + add_query_data.join() + ';';

    db.pool.query(update_query, (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            db.pool.query(del_query, (err, rows, fields) => {
                if (err) {
                    console.log(err);
                    res.status(400).send(err);
                } else if (data.clients.length < 1) {
                    res.sendStatus(200);
                } else {
                    db.pool.query(add_query, (err, rows, fields) => {
                        if (err) {
                            console.log(err);
                            res.status(400).send(err);
                        } else {
                            res.sendStatus(200);
                        }
                    });
                };
            });
        };
    });
});


// Delete function
app.delete('/workoutsessions', (req, res) => {
    let data = req.body;
    let delete_id = parseInt(data.id);
    let del_session = `DELETE FROM WorkoutSessions WHERE sessionID='${delete_id}'`;
    let del_sessionDetails = `DELETE FROM SessionDetails WHERE sessionDetailsSessionID='${delete_id}'`;

    db.pool.query(del_session, (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            db.pool.query(del_sessionDetails, (err, rows, fields) => {
                if (err) {
                    console.log(err);
                    res.status(400).send(err);
                } else {
                    res.sendStatus(204);
                }
            });
        };
    });
});

// ------------------------------------
// Sales Page Routes
//
// TODO:
// filtering
// cleanup code
// ------------------------------------

// Read functionality
app.get('/sales', function(req, res) {
    let get_sales = `SELECT saleID AS 'Sale ID', saleDate AS 'Sale Date', CASE WHEN saleType = 0 THEN 'SESSION' ELSE 'MERCHANDISE' END AS 'Sale Type', trainerID, CONCAT(Trainers.firstName, ' ', Trainers.lastName) AS 'Trainer', clientID, CONCAT(Clients.firstName, ' ', Clients.lastName) AS 'Client', saleAmount AS 'Sale Amount', CASE WHEN (saleAmount - (SELECT SUM(payAmount) FROM Payments WHERE Payments.paymentsSaleID=Sales.saleID)) IS NOT NULL THEN (saleAmount - (SELECT SUM(payAmount) FROM Payments WHERE Payments.paymentsSaleID=Sales.saleID)) ELSE saleAmount END AS 'Outstanding Balance' FROM Sales LEFT JOIN Trainers ON salesTrainerID = trainerID LEFT JOIN Clients ON salesClientID = clientID;`;

    let trainer_query = "SELECT trainerID, CONCAT(firstName, ' ', lastName) AS Trainer FROM Trainers;";

    db.pool.query(get_sales, (sale_err, sale_rows, sale_fields) => {
        if (sale_err) {
            console.log(sale_err);
            res.status(400).send(sale_err);
        } else {
            db.pool.query(trainer_query, (trainer_err, trainer_rows, trainer_fields) => {
                if (trainer_err) {
                    console.log(trainer_err);
                    res.status(400).send(trainer_err);
                } else {
                    res.render('sales', {data: sale_rows, trainer_data: trainer_rows});
                }
            });
        };
    });
});

// helper handlers for filling out forms

// get session dates for sale selector
app.post('/sales-get-dates', (req, res) => {
    let body = req.body;
    let query = `SELECT DISTINCT sessionDate FROM WorkoutSessions WHERE workoutSessionsTrainerID='${body.id}'`;

    db.pool.query(query, (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.status(200).send({data: rows});
        };
    });
});

// get session times for sale selector
app.post('/sales-get-times', (req, res) => {
    let body = req.body;
    let query = `SELECT startTime FROM WorkoutSessions WHERE workoutSessionsTrainerID='${body.id}' AND sessionDate='${body.date.substring(0,10)}'`

    db.pool.query(query, (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.status(200).send({data: rows});
        };
    });
});

// get session clients for sale selector
app.post('/sales-get-clients', (req, res) => {
    let body = req.body;
    let query = `SELECT clientID, CONCAT(firstName, ' ', lastName) AS 'Client' FROM Clients INNER JOIN SessionDetails ON sessionDetailsClientID = clientID WHERE sessionDetailsSessionID = (SELECT sessionID FROM WorkoutSessions WHERE workoutSessionsTrainerID='${body.id}}' AND sessionDate='${body.date.substring(0,10)}' AND startTime='${body.time}');`;

    db.pool.query(query, (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.status(200).send({data: rows});
        };
    });
});

// get session all clients for sale selector
app.post('/sales-get-all-clients', (req, res) => {
    let query = `SELECT clientID, CONCAT(firstName, ' ', lastName) AS 'Client' FROM Clients;`;

    db.pool.query(query, (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.status(200).send({data: rows});
        };
    });
});

// Sales Create functionality
app.post('/sales', (req, res) => {
    let body = req.body;
    let add_sale;

    if (body.sale_type === '0') {
        add_sale = `INSERT INTO Sales (salesSessionID, salesTrainerID, salesClientID, saleDate, saleAmount, saleType) VALUES ((SELECT sessionID FROM WorkoutSessions WHERE workoutSessionsTrainerID='${body.trainer_id}' AND startTime='${body.session_time}'), '${body.trainer_id}', '${body.session_client}', '${body.sale_date}', '${body.sale_amount}', '${body.sale_type}');`;
    } else {
        add_sale = `INSERT INTO Sales (saleDate, saleAmount, saleType) VALUES ('${body.sale_date}', '${body.sale_amount}', '${body.sale_type}');`;
    };

    db.pool.query(add_sale, (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.sendStatus(201);
        }
    });
});

// Sales update functionality
app.put('/sales', (req, res) => {
    let body = req.body;

    let edit_sale;

    if (body.sale_type === '0') {
        edit_sale = `UPDATE Sales SET salesTrainerID = '${body.trainer_id}', salesClientID = '${body.session_client}', saleDate = '${body.sale_date}', saleAmount = '${body.sale_amount}', saleType = '${body.sale_type}' WHERE saleID = '${body.sale_id}';`;
    } else {
        edit_sale = `UPDATE Sales SET saleDate = '${body.sale_date}', saleAmount = '${body.sale_amount}', saleType = '${body.sale_type}' WHERE saleID = '${body.sale_id}';`;
    }

    db.pool.query(edit_sale, (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.sendStatus(200);
        }
    });
});

// Delete function
app.delete('/sales', (req, res) => {
    let data = req.body;
    let delete_id = parseInt(data.id);

    let del_sale = `DELETE FROM Sales WHERE saleID = ${delete_id}`;

    db.pool.query(del_sale, (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.sendStatus(204);
        };
    });
});

// ------------------------------------
// Payments Page Routes
// 
// TODO:
// app.get (Read)
// app.post (create)
// app.put (update)
// app.delete (delete)
// filtering
// cleanup code
// ------------------------------------
app.get('/payments', function(req, res) {
    let get_payments = `SELECT paymentID AS 'Payment ID', paymentsSaleID AS 'Sale ID',payDate AS 'Payment Date', payAmount AS 'Payment Amount', CASE WHEN payType = 0 THEN 'CASH' WHEN payType = 1 THEN 'VISA' WHEN payType = 2 THEN 'MASTERCARD' ELSE 'AMEX' END AS 'Payment Type', cardNumber AS 'Card Number', Date(cardExpiration) AS 'Card Expiration', CASE WHEN cardCVV IS NULL THEN NULL ELSE 'XXX' END AS 'Card CVV', CONCAT(firstName, ' ', lastName) AS 'Purchaser', clientID FROM Payments LEFT JOIN Clients ON paymentsClientID = clientID;`;

    db.pool.query(get_payments, (error, rows, fields) => {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            res.render('payments', {data: rows}); 
        }
    });
    
}); 

// ------------------------------------------------------------------
// Port Listener
// ------------------------------------------------------------------
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}...`)
});