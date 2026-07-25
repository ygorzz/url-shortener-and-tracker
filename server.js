import "dotenv/config";
import dbConnection from "./src/config/dbConnect.js";
import app from "./src/app.js";
import dns from 'node:dns/promises';

// Resolve o problema de compatibilidade entre o nodejs:24 e a resolução do DNS SRV do mongo  
dns.setServers([
  '1.1.1.1',
  '8.8.8.8'
]);

const PORT = 8000;

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
        console.error("Erro ao conectar com o BD", error)
    }
}

startServer();