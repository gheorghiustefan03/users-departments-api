const db = require('./db');
const resetDb = async (req, res)=>{
    try {
        await db.sync({force: true});
        res.status(200).json({message: "Database reset"});
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
}

module.exports = {db, resetDb};