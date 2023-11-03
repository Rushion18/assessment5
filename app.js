const express = require('express');
const cors = require ('cors');
const mssql = require ('mssql');

const app = express ();

app.use(cors());
app.use(express.json());

mssql.connect('mssql://username:password@localhost/dbname')
.then(() => console.log('Connected to database'))
.catch(err => console.log('Server listening to port 3000'));

app.listen(3000,()=> console.log('Server listening to port 3000'));

//new note

app.post('/notes', async (req, res) => {
    try {
        const { Title, Content } = req.body;

        const request = new mssql.Request();
        const result = await request.query ('INSERT INTO Notes (Title, Content, CreatedAt) VALUES (@Title, @Content, @CreatedAt)' , {
            Title,
            Content,
            CreatedAt: new Date()
        });

        res.status(201).json({ message: 'Note created', noteID: result.recordset[0].ID });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create note', error: err });
    }
});

