require("dotenv").config();
const Hashids = require('hashids');
const  { createClient } =require('@supabase/supabase-js');
const supabaseUrl = 'https://uuwnahknlrbjogoxtzwj.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

let longLink='';
let shortLink='';

const makeShort = async(req, res, next)=>{
const longLink= req.body.longLink;

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
  return error;
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
    return error;
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


module.exports = {makeShort, reroute};