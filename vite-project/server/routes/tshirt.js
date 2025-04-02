const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
    const filePath = path.join(__dirname, '../data/data.json');
    console.log('Försöker läsa fil:', filePath);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Fel vid läsning av fil:', err);
            return res.status(500).json({ message: 'Fel vid läsning av fil.' });
        }

        try {
            const jsonData = JSON.parse(data);
            console.log('JSON-data laddad:', jsonData);

            const tshirts = jsonData?.data?.products?.tshirts;
            if (!tshirts) {
                console.error('Tshirt-data hittades inte!');
                return res.status(404).json({ message: 'Tshirt-data hittades inte.' });
            }

            console.log('Jeans-data:', tshirts);
            res.json(tshirts);
        } catch (parseError) {
            console.error('Fel vid parsing av JSON:', parseError);
            return res.status(500).json({ message: 'Fel vid parsing av data.' });
        }
    });
});

module.exports = router;
