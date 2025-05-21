import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
// Database Connection
import './database'

dotenv.config();
const app = express();
const port: number = parseInt(process.env.PORT || '5000');

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Routes


// Server Connection
app.get("/", (req: Request, res: Response): void => {
    res.send("Welcome to Sonic Industries");
})

app.listen(port, (): void => {
    console.log(`Server is running on PORT : ${port}`);
});