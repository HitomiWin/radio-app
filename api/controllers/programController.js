const fetch = require("node-fetch");
const json = "format=json";
const paginationFalse = "pagination=false";
const sqlite3 = require("sqlite3");
const path = require("path");
const db = new sqlite3.Database(path.join(__dirname, "../../myRadioAppDB.db"));

const getAllPrograms= async (req, res)=>{
  let programs = await fetch(`http://api.sr.se/api/v2/programs?${json}&${paginationFalse}`)
  programs = await programs.json();
  res.json(programs.programs)
};

const getProgramsByChannelId = async(req, res)=>{
  let programs = await fetch(`http://api.sr.se/api/v2/programs/index?${json}&${paginationFalse}&channelid=${req.params.channelId}`)
  programs = await programs.json()
  res.json(programs.programs)
}

const getProgramById = async (req, res)=>{
  let program = await fetch(`http://api.sr.se/api/v2/programs/${req.params.programId}?${json}`)
  program = await program.json()
  res.json(program.program)
}
const getProgramsByCategories = async(req,res)=>{
  let programs = await fetch(`http://api.sr.se/api/v2/programs/index?${json}&${paginationFalse}&programcategoryid=${req.params.categoryId}`)
  programs = await programs.json()
  res.json(programs.programs)
}

const getEpisodesByProgramId= async (req, res)=>{
  let episodes =await fetch(`https://api.sr.se/api/v2/episodes/index?programid=${req.params.programId}&${json}&${paginationFalse}`)
  episodes = await episodes.json()
  res.json(episodes.episodes)
}

const addProgramToFavorites = async (req, res )=>{
  let query =/*sql*/`SELECT * FROM usersXprograms WHERE  programId=$programId AND userId = $userId`;
  let params = {
    $userId:req.session.user.userId,
    $programId : req.body.programId
  }
  db.get(query, params, (err, result ) =>{
    console.log("result :",result)
    if(result){
      res.json({
        error:" The program already exists"
      })
    } else {
       query =/*sql*/`INSERT INTO usersXprograms (userId, programId) VALUES ($userId, $programId)`
    
       params ={
        $userId:req.session.user.userId,
        $programId:req.body.programId,   
      }
      db.run(query, params, function (err) {
        if (err) {
          res.status(400).json({
            error: err
          });
          return;
        }
        console.log(this.lastID);
        res.json({
          success: "The program added successfully",
          lastID: this.lastID
        })
      })
    }   
  })
}



module.exports ={
getAllPrograms,
getProgramsByChannelId,
getProgramById,
getProgramsByCategories,
getEpisodesByProgramId,
addProgramToFavorites

}