const ctrlWrapper = require('../../helpers/ctrlWrapper');
const getMe = async (req, res) => {
    const { uuid, email} = req.user;
    res.json({success:true,
      data:{
      id: uuid,   
      email
      }    
    });
  };
  
  module.exports = {getMe: ctrlWrapper(getMe)};