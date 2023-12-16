const User = require("../models/users_schema");

// for adding users
module.exports.createUser = async function(req, res) {
    
    console.log(req.body);
    console.log(req.body.username);
    try {
        const {
         
            username,
            password,
            confirm_password
        } = req.body;
        if(password != confirm_password){
            
            res.status(400).json({message: "Password and confirm password doesn't match", status: "fail"})
            return;
        }
        // console.log("hii");
        
        const check = await User.findOne({ username });
        if (check) {
            res.status(400).json({message: "User Already exist" , status: "fail"})
            return;
        }
        
        // const capitalize = s => s[0].toUpperCase() + s.slice(1)
        
        const user = new User({
            username,
            password
          
        });
        await user.save(); 
 
        res.status(200).json({message: "User account created successfully", status: "success"}) 
        return;
           
      } catch (error) {  
        res.status(500).json({ message: error.message, status: "fail" });
    } 
}

// login function for login users
module.exports.login = async function(req, res) {
    const {username, password} = req.body;
    // console.log(req.cookies.id);
    try {
        
        const check = await User.findOne({ username });
        if (!check || check.password != password) {
            
            res.status(400).json({ message: "Incorrect credentials" });
            return;
        }
        
        res.status(200).json({message : "User logged in successfully", status: true, user : check})
        
    } catch (error) {  
        res.status(500).json({ message: error.message });
    } 
}
