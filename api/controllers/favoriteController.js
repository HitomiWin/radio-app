const sqlite3 = require("sqlite3");
const path = require("path");
const db = new sqlite3.Database(path.join(__dirname, "../../myRadioAppDB.db"));

const getAllFavoriteChannels =(req, res)=>{

 let query =/*sql*/`SELECT usersXchannels.channelId FROM usersXchannels WHERE userId =$userId`
 let params = {
   $userId:req.session.user.userId
 }
 db.all(query,params,(err, channels)=>{
  if(channels){
    res.json(channels)
  }else(
   res.json({error:"Channels not founds"})
  )
 })  
}
const getAllFavoritePrograms =(req, res)=>{
 let query =/*sql*/`SELECT usersXprograms.programId FROM usersXprograms WHERE userId =$userId`
 let params = {
   $userId:req.session.user.userId
 }
 db.all(query,params,(err, programs)=>{
   if(programs){
     res.json(programs)
   }else(
    res.json({error:"Programs not founds"})
   )
 }) 
}

module.exports={
  getAllFavoriteChannels,
  getAllFavoritePrograms
}
