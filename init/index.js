const mongoose = require('mongoose');
const Listing = require('../models/listing');
const initData = require('./data.js');

async function main(){

     await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}
main().then(()=>{

    console.log("connected to db");
}) 
.catch ((err)=>{
    console.log(err);
});

    const initDB = async()=>{
        await Listing.deleteMany({});
        initData.data = initData.data.map((obj)=>(
            {
            ...obj, 
            owner : "6a2a6c38ddb44122ef360ff0",    
            }
        ));
        await Listing.insertMany(initData.data);
        console.log("All data inserted");
    }

initDB();

