const User = require('../models/users_schema');
const Health = require('../models/health_schema');



// this function fetches the daily health documents from the health collection based on user Id. 
module.exports.HealthReport = async function(req, res){
    const {userId} = req.params;

    const health = await Health.find({userId});
    res.status(200).json({health : health})
}

// this function adds daily health details
module.exports.addDailyHealth = async function(req, res) {

    // console.log(req.body.email);
    try {
        const {
        sleep ,
        steps,
        drink,
        exercise,
        score,
        id
        } = req.body;

        
        const healthObj = new Health({
            sleep,
            steps,
            drink,
            exercise,
            score,
            userId: id
          
        });
        await healthObj.save(); 
        res.status(200).json({message: "Daily health added successfully", status : true})
           
      } catch (error) {  
        res.status(500).json({ message: error.message });
      } 
}
