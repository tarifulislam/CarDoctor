// carDoctor
// C0Tn58yREvrUA1qX

const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 5000


// middleware ------------------------------------------
app.use(cors({
   origin:["http://localhost:5173"],
   credentials: true
}))
app.use(express.json())
app.use(cookieParser())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rngkdhw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// my created middle ware -------------------------------
// const logger = async(req, res, next) =>{
//   console.log("called --------------", req.host, req.originalUrl);
//   next()
// }

// const verifyToken = async(req, res, next) =>{
//   const token = req.cookies?.token;
//   // console.log('value of middleware token : --', token);
//   if(!token){
//     return res.status(401).send({message : "token nai forbiden"})
//   }
//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
//     // for error  --------------
//     if(err){
//       console.log(err);
//       return res.status(401).send({message : "unauthorized access"})
//     }
//     // if token is valid then it work --------------------
//     // console.log("value of the token --" , decoded);
//     req.user = decoded;
//     next()
//   })
// }


// my created middle ware ----------------------------  ----------------------------

  const logger = (req, res, next) => {
    console.log('loged info', req.method, req.url);
    next();
  }

  const verifyToken = (req, res, next) => {
    const token = req?.cookies?.token;
    // console.log('token in the middle ware', token);
    if(!token){
      return res.status(401).send({message : 'unauthorized access'})
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
      if(err){
        console.log(err);
        return res.status(401).send({message : 'unauthorized access'})
      }
      req.user = decoded;
      next()
    })
  }

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const serviceCollection = client.db('carDr').collection('services')
    const bookingCollection = client.db('carDr').collection('bookings')

    // auth related api  -------------------------------------------------
    // app.post('/jwt',logger, async (req, res) => {
    //     const user = req.body;
    //     console.log(user);
    //     // make jwt token ------
    //     const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1h"})
    //     // res.cookie().send()
    //     res
    //     .cookie('token', token,{
    //         httpOnly : true,
    //         secure: false, // false for anly http website.
    //     })
    //     .send({success: true})
    // })

   // auth related api again -------------------------------------------------
    app.post('/jwt', async(req, res)=>{
      const user = req.body;
      console.log('user for token', user);
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1h"}) // payload  > secret > time.
      res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send({success: true});

    })
    // for delete cookiee from client side  ------
    app.post('/logout', async(req, res)=>{
      const user = req.body;
      console.log('loggin out ---------');
      res.clearCookie('token', {maxAge: 0}).send({success: true})

    })



    // services related api  -------------------------------------------------
    // for get all data -----------------------
    app.get('/services', async(req, res)=>{
        const cursor = serviceCollection.find()
        const result = await cursor.toArray()
        res.send(result)
    })

    app.get('/services/:id',async(req, res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}

        const options = {
            projection:{title: 1, price: 1, img:1, description: 1}
        }
        const result = await serviceCollection.findOne(query, options)
        res.send(result)
    })



    // booking data ----------------------------------------------------------------
    app.get('/bookings', logger, verifyToken, async(req, res)=>{
      console.log(req.query.email);
      // console.log('check cookie ----', req.cookies);
      // console.log("see token fot test", req.cookies.token);
      // console.log("token owner info ------- ", req.user);

      // for secure user date from unauthronized access.
      if(req.user.email !== req.query.email){
        return res.status(403).send({message : 'forbiden access'})
      }

      let query = {}
      if(req.query?.email){
        query = {email: req.query.email}
      }
      const result = await bookingCollection.find(query).toArray()
      res.send(result)
    })


    app.post('/bookings', async(req, res)=>{
      const booking = req.body
      const result = await bookingCollection.insertOne(booking)
      res.send(result)
    })


    app.get('/bookings/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await bookingCollection.findOne(query)
      res.send(result)
    })

    app.delete('/bookings/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await bookingCollection.deleteOne(query)
      res.send(result)
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



app.get('/',(req, res)=>{
    res.send("server is running")
})

app.listen(port, (req, res)=>{
    console.log(`server is running on port ${port}`);
})