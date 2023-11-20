const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');


app.use(cors())
app.use(express.json());


// Configuration
dotenv.config();


// Constants
const PORT = process.env.PORT || 50001;


// Routes
app.get('/', (req, res) => {
    return res.json({ msg: "Hello World" });
});


// Server
app.listen(PORT, () => console.log(`[server]: Server running @${PORT}`));