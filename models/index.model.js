const mongoose = require('mongoose')

require('dotenv').config()

// Declare three mutable variables, `db` to store the Db class instance, `connectionString` to store the connection string read from the `DB_STRING` environment variable, and `dbName` to store the name of the database we want to use.
let dbConnectionStr = process.env.DB_STRING,
    dbName = 'todo'

module.exports = mongoose.connect(dbConnectionStr, { dbName, useUnifiedTopology: true, loggerLevel: 'debug' })
    .then(client => {
        // Console log the connection string, notifying the user that we are connected to the database.
        console.log(`Connected to Database`)
        return client.connection.client;
    })
