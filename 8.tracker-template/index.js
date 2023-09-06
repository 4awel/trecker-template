let express = require(`express`);
let app = express();
let port = 3005;

app.listen(port, function () {
    console.log(`http://localhost:${port}`);
});

// Настройка CORS
let cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173' }));


// Настройка POST-запроса — JSON
app.use(express.json());

// Настройка БД
let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/emotion-tracker');

// Schems

const noteSchema = new mongoose.Schema({
    description: String,
    date: Date,
    category: Number,
    title: String
    // type: mongoose.ObjectId, // populate('category')
    // ref: 'Category'
    // }   
});
const Note = mongoose.model('notes', noteSchema);


const categoriesSchema = new mongoose.Schema({
    type: String,
    value: Number,
});
const Category = mongoose.model('category', categoriesSchema);

// Routers
app.get('/notes/all', async function (req, res) {
    const notes = await Note.find();
    res.send(notes);
});

app.post('/notes/create', async function (req, res) {
    const { category } = req.body;
    const { date } = req.body;
    const { description } = req.body;
    const { title } = req.body;

    console.log(category, date, description, title);

    let notes = new Note({
        category: category,
        description: description,
        date: date,
        title: title
    })

    await notes.save();

    res.send('ok');
});
});