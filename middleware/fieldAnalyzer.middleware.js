function validateUserFields(req, res, next) {
    const { username, email, password, confirmPassword, dob, location } = req.body;
  
    if (!username || !email || !password || !confirmPassword || !dob || !location) {
      return res.status(400).json({ err: 'Missing required fields' });
    }
  
    if (typeof username !== 'string' || typeof email !== 'string' || typeof password !== 'string' || 
    typeof confirmPassword !== 'string' || typeof dob !== 'string' || typeof location !== 'string') {
      return res.status(400).json({ err: 'Invalid field type(s)' });
    }

    if(password !==confirmPassword){
        return res.status(400).send({err:"confirmPassword does not match with original password"})
    }
  
    next();
  }
  
  module.exports = validateUserFields;
  