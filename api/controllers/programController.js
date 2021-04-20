const fetch = require("node-fetch");
const json = "format=json";
const paginationFalse = "pagination=false";

const getAllPrograms= async (req, res)=>{
  let programs = await fetch(`http://api.sr.se/api/v2/programs?${json}&${paginationFalse}`)
  programs = await programs.json();
  res.json(programs)
};

const getProgramsByChannelId = async(req, res)=>{
  let programs = await fetch(`http://api.sr.se/api/v2/programs?${json}&${paginationFalse}/index?channelid=${req.params.channelId}`)
  programs = await programs.json()
  res.json(programs)
}

const getProgramById = async (req, res)=>{
  let program = await fetch(`http://api.sr.se/api/v2/programs/${req.params.programId}?${json} `)
  program = await program.json()
  res.json(program)
}

module.exports ={
getAllPrograms,
getProgramsByChannelId,
getProgramById

}