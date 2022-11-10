const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const { ObjectID } = require('bson');
const app = express()
const port = process.env.PORT || 5000
require('dotenv').config()

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vb0ze04.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        const serviceCollection = client.db('luxuryInterior').collection('services');
        const reviewCollection = client.db('luxuryInterior').collection('reviews');

        // all services
        app.get('/services', async(req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services)
        })

        // limited service
        app.get('/servicelimit', async(req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const servicelimit = await cursor.limit(3).toArray();
            res.send(servicelimit)
        })

        // service by id
        app.get('/services/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectID(id)};
            const service = await serviceCollection.findOne(query);
            res.send(service)
        })
        
        // insert service 
        app.post('/services', async(req, res) => {
            const service = req.body;
            const result = await serviceCollection.insertOne(service)
            res.send(result)
        })

        // reviews api
        app.post('/reviews', async(req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result)
        })
    }
    finally{

    }
}
run().catch(err => console.error(err))



app.get('/', (req, res) => {
    res.send('luxury interior server running')
})

app.listen(port, (req, res) => {
    console.log(`luxury interior server running on port ${port}`)
})