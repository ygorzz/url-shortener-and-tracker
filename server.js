import "dotenv/config";
import dbConnection from "./src/config/dbConnect.js";
import app from "./src/app.js";
import dns from 'node:dns/promises';

// Resolve the compatibility problem about nodejs:24 and mongo DNS SRV resolution 
dns.setServers([
  '1.1.1.1',
  '8.8.8.8'
]);

const PORT = process.env.PORT || "8000";

async function startServer() {
    try {
        const connection = await dbConnection();
        connection.once("open", () => {
            console.log("Database connection successfully established.");
            app.listen(PORT, () => {
                console.log(`Server listening on port ${PORT}`);
            })
        })
    } catch (error) {
        console.error("Error connecting to the database", error)
    }
}

startServer();