const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/saveRecord', (req, res) => {
    const record = req.body;
    let records = [];

    if (fs.existsSync('./records.json')) {
        const data = fs.readFileSync('./records.json');
        records = JSON.parse(data);
    }

    records.push(record);
    fs.writeFileSync('./records.json', JSON.stringify(records, null, 2));

    res.json({ status: 'success', message: 'Record saved!' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
