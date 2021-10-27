const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors');

const app = express()
require('dotenv').config()
const ObjectId = require('mongodb').ObjectId
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 7000;

// childrenUser
// zxyPJrFR89G3LlQ5

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ew1rb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const run = async() => {
    try {
      await client.connect();
      const database = client.db("childHelp");
      const displayFeature = database.collection("features");
      const volenteers = database.collection("volenteer");

      app.get('/features', async(req,res)=>{
        const cursor = displayFeature.find({})
        const result = await cursor.toArray()
        res.send(result)
      })


      app.post('/add',async(req,res)=> {
          const newEvent = req.body
          const result = await displayFeature.insertOne(newEvent)
          res.json(result)
      })

      app.post('/regi',async(req,res)=> {
          const newMember = req.body
          const result = await volenteers.insertOne(newMember)
          
          res.json(result)
      })

      app.get('/list', async(req,res)=>{
        const cursor = volenteers.find({})
        const result = await cursor.toArray()
        res.send(result)
      })

      app.delete('/list/:id', async(req,res)=>{
        const id = req.params.id
        const cursor = {_id : ObjectId(id)}
        const result = await volenteers.deleteOne(cursor)
        res.json(result)
      })


      console.log('connected')
    }
    finally{
        await client.connect()
    }
}
run().catch(console.dir)
// childHelp
// features

app.get('/',(req,res)=>{
    res.send('this is home')
})


app.listen(port,()=>{
    console.log('Magic Magic Magic on port',port)
})