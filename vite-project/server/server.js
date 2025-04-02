const express = require('express');
const cors = require('cors');
const fs = require('fs'); 
const path = require('path'); 
const bodyParser = require('body-parser');
const jeansRouter = require('./routes/jeans');
const tshirtRouter = require('./routes/tshirt.js')
const trojorRouter = require('./routes/trojor.js')
const ovrigtRouter = require('./routes/ovrigt.js')

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());



const users = [
    { username: 'admin', password: 'admin' },
    { username: 'robin', password: 'robin'}
];

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {

        res.json({ message: 'Inloggning lyckades', isAuthenticated: true });
    } else {
        res.status(401).json({ message: 'Fel användarnamn eller lösenord' });
    }
});

app.use('/api/jeans', jeansRouter);
app.use('/api/tshirt', tshirtRouter);
app.use('/api/trojor', trojorRouter);
app.use('/api/ovrigt', ovrigtRouter);



app.get('/api', (req, res) => {
    res.json({ message: 'Hello from Express! Här är det Robin som styr' });
});

app.post('/api/submit', (req, res) => {
    const { name, email, message } = req.body;
    console.log('Received data:', { name, email, message });
    res.json({ message: 'Data mottagen!', data: { name, email, message } });
});

app.get('/api/data', (req, res) => {
    const filePath = path.join(__dirname, 'data.json');
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Fel vid läsning av fil:', err); 
            return res.status(500).json({ message: 'Fel vid läsning av fil.' });
        }
        
        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (parseError) {
            console.error('Fel vid parsing av JSON:', parseError); 
            return res.status(500).json({ message: 'Fel vid parsing av data.' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});