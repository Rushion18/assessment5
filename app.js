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

//fetch 
app.get('/notes/:id', async (req,res)=>{
    try{
        const request = new mssql.Request();
        const result = await request.query('SELECT * FROM Notes');

        res.status(200).json({ notes: result.recordset});
    }catch (err ){
        res.status(500).json({ message: 'Failed to fetch notes', error: err });
    }
});

//get single

app.get('/notes/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const request= new mssql.Request();
        const result = await RequestError.query('SELECT * FROM Notes WHERE ID = @ID', { ID: id });

        if (result.recordset.lenth === 0) {
            res.status(404).json({ message: 'Note not found' });
        } else {
            res.status(200).json ({ note: result.recordset[0] });
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch note', error: err });
    }
});

//update 
app.put('/notes/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const { Title, Content } =req.body;
        const request = new mssql.Request();
        await request.query('UPDATE Notes SET Title = @Title, Content = @Content WHERE ID = @ID', {
            ID: id,
            Title: Title,
            Content: Content
        });
        res.status(200).json({message:'Note updated'});
    } catch (err) {
        res.status(500).json({ message: 'Failed to update note', error: err });
    }
});