const jwtToken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connectDb = require('../Config/Db');


//Register Controller..
const registerController = async (req, res) => {
    try {
        const { userNAME, userEMAIL, userPASSWORD } = req.body;

        //Connect with the database...
        const db = await connectDb();

        //SQL statement for check the user alredy exist or not...
        const checkEmailsql = "SELECT * FROM USERS WHERE userEmail = ?";

        //Check the email query excute..
        db.query(checkEmailsql, [userEMAIL], (err, result) => {
            if (err) {
                console.log('Failed to check the email is exit or not..!!');
                return res.status(500).send({ message: "Internal server issue.!!" })
            } else {
                if (result.length > 0) {
                    // Email already exists, send response indicating failure
                    return res.status(400).json({ error: 'Email already exists' });
                } else {

                    // SQL statement to create the USERS table if it doesn't exist
                    const createTableSql = `
                        CREATE TABLE IF NOT EXISTS USERS (
                        userId INT AUTO_INCREMENT PRIMARY KEY,
                        userName VARCHAR(255) NOT NULL,
                        userEmail VARCHAR(255) NOT NULL,
                        userPassword VARCHAR(255) NOT NULL
                        )
                    `;

                    // Execute the table creation query
                    db.query(createTableSql, (err) => {
                        if (err) {
                            console.error('Error creating USERS table:', err);
                            return res.status(500).json({ error: 'Failed to create USERS table' });
                        } else {
                            console.log('USERS table created or already exists');

                            // Formatted data before passing to server
                            const values = {
                                userNAME,
                                userEMAIL,
                                userPASSWORD
                            };

                            // SQL statement to perform the query
                            const insertSql = "INSERT INTO USERS SET ?";

                            // Execute the query to insert data into the USERS table
                            db.query(insertSql, values, (err, data) => {
                                if (err) {
                                    console.error(`Failed to create a new user:`.bgRed.white, err);
                                    return res.status(500).json({ error: 'Failed to create a new user' });
                                } else {
                                    console.log(`New user created successfully:`.bgBlue.white, data);
                                    return res.status(201).json({ message: 'New user created successfully', data: data });
                                }
                            });
                        }
                    });

                }
            }
        });
    } catch (err) {
        console.error('Error in registerController:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


//Login Controller...
const loginController = async (req, res) => {
    try {
        const { userEMAIL, userPASSWORD } = req.body;

        //Connect to mysql instance...
        const db = await connectDb();

        //SQL statement to perform query...
        const sql = "SELECT * FROM USERS WHERE userEmail = ?";

        //Execute the query..
        db.query(sql, [userEMAIL], async (err, result) => {

            //Check the user data....
            if (err) {
                console.log("Error while fetching the user data..!!!");
                return res.status(500).send({ message: "Failed to fetch the user..!!" });
            }

            //Check the user is exist or not...
            if (result.length === 0) {
                return res.status(401).send({ message: "User is not exist..!!" });
            }

            //Check the user password is match or not..
            const userExist = await result[0];
            if (!userExist.userPassword === userPASSWORD) {
                return res.status(500).send({ message: "User has invalid credentials..!!!" });
            }

            // Generate JWT token for authentication...
            const token = jwtToken.sign({ userId: userExist.userId }, process.env.JWT_SECRET, { expiresIn: '1h' })

            //Response after all ok..
            res.status(201).send({ message: "User login Successfully...", token: token, data: userExist });
        });


    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Failed to login server error..!!" });
    }
}

module.exports = { registerController, loginController }