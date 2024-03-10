const express = require('express');
const cors = require('cors');
const colors = require('colors');
const connectDb = require('./Config/Db');
const dotenv = require('dotenv');
const userRoutes = require('./Routes/UserRoute');


//Configure the .env file...
dotenv.config();


//Configure the database connection...
connectDb();


//Configure the objects..
const app = express();
app.use(cors());
app.use(express.json());


//Configure the routes...
app.use("/api/user", userRoutes);


//Precautions of PORT...
const port = process.env.PORT || 8201


//Start the server on specific port no...
app.listen(port, () => {
    console.log(`AuthLockDb server running on port no ${process.env.PORT}`.bgCyan.white);
});


