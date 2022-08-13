// Assign the MongoClient class that's attached to the `connect` method exported by the `mongodb` module to the constant variable `MongoClient`
const MongoClient = require('mongodb').MongoClient

require('dotenv').config()

const exportObj = {
	db: undefined
}

// Declare three mutable variables, `db` to store the Db class instance, `connectionString` to store the connection string read from the `DB_STRING` environment variable, and `dbName` to store the name of the database we want to use.
let dbConnectionStr = process.env.DB_STRING,
    dbName = 'todo'

// Call the static `connect` method on the `MongoClient` class, passing the `dbConnectionStr` and an options object with the `useUnifiedTopology` property set to `true` to use the new Server Discover and Monitoring engine.
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true, loggerLevel: 'debug' })
    // As no callback is provided, the `connect` method returns a Promise that will resolve to a `MongoClient` instance, so use the .then method to execute our callback with the said `MongoClient`.
    .then(client => {
        // Console log the connection string, notifying the user that we are connected to the database.
        console.log(`Connected to ${dbName} Database`)
        // Assign the desired `Db` instance - returned by the `db` method on the `MongoClient` instance - to the `db` variable.
        exportObj.db = client.db(dbName)
    })

module.exports = exportObj;