const getMe = async (req, res) => {
    const { id, email} = req.user;
    res.json({
      id,    
      email,
    });
  };
  
  module.exports = getMe;