import express, { Request, Response } from 'express';
const app = express();
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';


// Middlewares
app.use(cors());
app.use(express.json());
app.use(helmet());


// Configuration
dotenv.config();


// Constants
const PORT = process.env.PORT || 50001;


// Routes
app.get('/api', (req: Request, res: Response) => {
    return res.json({ msg: "Welcome to Authentication Micro-Service" });
});


// Server
app.listen(PORT, () => console.log(`⚡️[server]: Server running @${PORT}`));