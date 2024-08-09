var express = require("express");
const mongoose = require("mongoose");
var app = express();
var port = 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the "public" directory
app.use(express.static(__dirname + '/public'));

// Send the HTML file when accessing the root
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Database connection
mongoose.connect("mongodb+srv://indravijaysinh50:zala@serverlessinstance0.fsmv2a5.mongodb.net/?retryWrites=true&w=majority&appName=ServerlessInstance0", {
    useNewUrlParser: true,
    
    useUnifiedTopology: true

}).then(() => {
    console.log("Database connected");
}).catch((e) => {
    console.log("Error connecting to database", e);
});

// Define the schema and model for storing contacts
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true }
});

const Contact = mongoose.model('Contact', contactSchema);

// Controller logic for saving contact data
const saveContact = async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).send('Your Contact saved successfully');
    } catch (error) {
        res.status(400).send('Error in saving contact: ' + error.message);
    }
};
app.post('/contact', saveContact);
        const addTwoNumber= (n1,n2) => {
             return n1+n2;
        }
    
         app.get("/addTwoNumber", (req,res)=>{
             const n1= parseInt(req.query.n1);
             const n2=parseInt(req.query.n2);
             const result = addTwoNumber(n1,n2);
             res.json({statuscocde:200, data: result }); 
        });
    
         app.get("/Display", (req, res) => {
             const n1 = "<html><body><H1>HELLO THERE </H1></body></html>";
             res.set('Content-Type', 'text/html');
             res.send(Buffer.from(n1));     
        })
        console.log (addTwoNumber(19,12));
        app.listen(port,()=> {
            console.log("hello i'm listening to port "+port);
        })