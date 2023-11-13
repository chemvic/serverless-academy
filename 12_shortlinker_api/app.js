const express = require('express');
require("dotenv").config();
// const supabaseUrl = 'https://uuwnahknlrbjogoxtzwj.supabase.co';
// const supabaseKey = process.env.SUPABASE_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);
const Hashids = require('hashids');
const hashids = new Hashids('abra cadabra', 7);


const app= express();

app.use(express.json());

let longLink='';

const makeShort =async(req, res)=>{
const longLink= req.body.longLink;
const id = hashids.encode(7, 4, 9);
console.log("REQUEST: ", longLink);
console.log("ID: ", id);
res.status(200).json({success:"OK"});
};

const reroute =async(req, res)=>{
const shortCode =req.params.shortCode;
console.log(shortCode);
res.redirect(longLink).status(302).json({
  success:"OK",
  longLink: "This is longLink"
});
};

app.post('/shortLink', makeShort );
app.get('/:shortCode', reroute);



app.use((req, res, next) => {
    res.status(404).json({ success:true, error: "Not found" });
  });

app.use((err, req, res, next)=>{
const{status=500, message= "Server error"}=err;
res.status(status).json({message});
});
app.listen(3000, ()=>{
    console.log('Server running on port 3000');
});