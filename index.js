// person
// CGvMG9WNV5dZJAhz


const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


// middleware

app.use(cors())
app.use(express.json());



const uri = "mongodb+srv://person:CGvMG9WNV5dZJAhz@cluster0.ry4vt7x.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();


        const teacherCollection = client.db('person').collection('teacher');

        app.get('/teacher', async(req, res) => {
            const cursor = teacherCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/teacher/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: new ObjectId(id)};
            const result = await teacherCollection.findOne(query);
            res.send(result);
        } )

        app.post('/teacher', async(req, res) => {
            const addTeacher = req.body;
            console.log(addTeacher);
            const result = await teacherCollection.insertOne(addTeacher);
            res.send(result);
        })

        app.put('/teacher/:id', async(req, res) => {
            const id = req.params.id;
            const filter = {_id: new ObjectId(id)};
            const options = { upsert: true };
            const updatedTeacher = req.body;
            const teacher = {
                $set: {
                    name: updatedTeacher.name,
                    address: updatedTeacher.address
                }
            }

            const result = await teacherCollection.updateOne( filter, teacher, options );
            res.send(result);

        })

        app.delete('/teacher/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await teacherCollection.deleteOne(query);
            res.send(result);
        })

        const studentCollection = client.db('person').collection('student');



        app.get('/student', async(req, res) => {
            const cursor = studentCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/student/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await studentCollection.findOne(query);
            res.send(result)
        })


        app.post('/student', async(req, res) => {
            const addStudent = req.body;
            console.log(addStudent);
            const result = await studentCollection.insertOne(addStudent);
            res.send(result);
        })

        app.put('/student/:id', async(req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id)};
            const options = { upsert: true };
            const updatedStudent = req.body;
            const student = {
                $set: {
                    name: updatedStudent.name,
                    address: updatedStudent.address
                }
            }

            const result = await studentCollection.updateOne( filter, student, options );
            res.send(result);
        })

        app.delete('/student/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await studentCollection.deleteOne(query);
            res.send(result);
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('web running')
})

app.listen(port, () => {
    console.log(`server running on port: ${port}`)
})