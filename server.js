// server
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors()); // untuk mengizinkan permitaan dari frontend
app.use(express.json()) // json untuk diparsing

app.get('/', (req, res) => {
    res.send('selamat datang');
});

let database = [
    {
        id : 1,
        deskripsi : "belajar rest api",
        completed : true
    },
    {
        id : 2,
        deskripsi : "belajar rest api 2",
        completed : false
    },
    {
        id : 3,
        deskripsi : "belajar rest api 3",
        completed : false
    },
]

let nextId = 5;

// ROUTES API

// 1. mendapatkan semua data
app.get('/api/todos', (req, res) => {
    let data = [
        {
            "nama" : "daniel"
        }
    ]
    res.json(database);
});

// 3. menambahkan data baru
app.post('/api/todos', (req, res) => {
    const { deskripsi } = req.body;
    
    if(!deskripsi) {
        return res.status(400).json({ message : "deskripsi dibutuhkan" });
    }

    const newData = {
        id : nextId++,
        deskripsi,
        completed : false
    }

    database.push(newData);
    res.status(201).json(newData);
})

// 3. update data (toggle completed)
app.put('/api/todos/:id', (req, res) =>  {
    const idReq = parseInt(req.params.id);
    const databaseIndex = database.findIndex(item => item.id === idReq);

    if(databaseIndex === -1) {
        return res.status(404).json({ message : "data tidak ditemukan" });
    }

    // mengubah completed
    database[databaseIndex].completed = !database[databaseIndex].completed;

    return res.status(201).json(database[databaseIndex]);
})

// 4. menghapus data berdasrkan id
app.delete('/api/todos/:id', (req, res) =>  {
    const idReq = parseInt(req.params.id);
    const databaseIndex = database.findIndex(item => item.id === idReq);

    if(databaseIndex === -1) {
        return res.status(404).json({ message : "data tidak ditemukan" });
    }

    // kalau todonya ketemu kita remove dari database
    database.splice(databaseIndex, 1)

    return res.status(201).json({message : 'data berhasil dihapus'});
})

app.listen(PORT, () => {
    console.log(`server is working on http://localhost:${PORT}`);
})