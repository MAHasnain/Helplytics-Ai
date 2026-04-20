import dotenv from "dotenv";
import app from "./app.js";
import logger from "./logger/winston.logger.js";
import connectDB from "./src/db/index.db.js";

dotenv.config();
const PORT = process.env.PORT;

connectDB()
    // .then(() => {
    //     app.listen(PORT || 3000, () => {
    //         logger.info(`⚙️  Server running on port ${PORT}.`)
    //     });
    // })
    // .catch((error) => {
    //     logger.error(`MongoDB connection failed: ${error}`)
    // })


export default app; 
