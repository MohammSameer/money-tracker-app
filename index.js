var bodyParser = require("body-parser")
var express = require("express")
var mongoose = require("mongoose")

const app=express()
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect('mongodb://0.0.0.0:27017/moneylist',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex :true
})
var db = mongoose.connection
db.on('error',()=> console.log("error in connecting to database"))
db.once('open',() => console.log(`connected to the database`))

app.post("/add",(req,res) =>{
    var category_select = req.body.category_select
    var amount_input = req.body.amount_input
    var info = req.body.info
    var date_input = req.body.date_input

    var data={
        "category":category_select,
        "Amount":amount_input,
        "info":info,
        "Date":date_input
    }
    db.collection('users').insertOne(data,(err,collection) => {
       if(err){
          throw err;
       }
       console.log(`record inserted successfully`)
    })
})

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-origin":'*'
    })
    return res.redirect('index.html')
}).listen(5000)
console.log(`listening on port 5000`);
