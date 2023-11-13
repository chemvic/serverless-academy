require("dotenv").config();
const Hashids = require('hashids');
const axios = require('axios');
const  { createClient } =require('@supabase/supabase-js');
const supabaseUrl = 'https://uuwnahknlrbjogoxtzwj.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

let longLink='';
let shortLink='';

const makeShort = async(req, res, next)=>{
const longLink= req.body.longLink;

if (longLink==='') {
    return res.status(400).json({message: 'Enter a valid URL'});
};

try {
  const isAvailable = await checkUrl(longLink);

if (!isAvailable) {
    return res.status(400).json({message: 'Your URL is not valid'})
};  
} catch (error) {
    throw error;
};


try {
 const link = await supabase
  .from('links')
  .select('*')
  .eq('link', longLink); 

  if (link.data.length>0) {
    shortLink = `http://localhost:3000/${link.data[0].shortcode}`;
    return res.status(200).json({shortLink: shortLink});
  };
} catch (error) {
  throw error;
};  

  let hashids = new Hashids(longLink, 7);
  const id = hashids.encode(7, 4, 9);

  try {
   const newLink =  await supabase
  .from('links')
  .insert([
    {
      shortcode: id,
      link: longLink,
    },
  ]); 
  } catch (error) {
    throw error;
  };  

  shortLink = `http://localhost:3000/${id}`;

res.status(201).json({
  success:"OK",
  shortLink: shortLink});
};




const reroute =async(req, res, next)=>{
const shortCode =req.params.shortCode;

try {
  const link = await supabase
  .from('links')
  .select('*')
  .eq('shortcode', shortCode);

  if (link.data.length===0) {
    return res.status(404).json({message: "Invalid short URL"})
  };
  
  res.redirect(link.data[0].link);

} catch (error) {
  return error;
};
};

async function checkUrl(url) {
    try {
        const response = await axios.get(url);
        return response.status === 200;
    } catch (error) {
        return false;
    };
};

module.exports = {makeShort, reroute};