const fetch = require("node-fetch");
const json = "format=json";
const paginationFalse = "pagination=false";

const getAllPrograms= async (req, res)=>{
  let programs = await fetch(`http://api.sr.se/api/v2/programs?${json}&${paginationFalse}`)
  programs = await programs.json();
  res.json(programs)
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

module.exports ={
getAllPrograms,
getProgramsByChannelId,
getProgramById,
getProgramsByCategories

}