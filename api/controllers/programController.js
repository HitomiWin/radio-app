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

// const getAllCategories = async (req,res)=>{
//   let categories = await fetch(`http://api.sr.se/api/v2/programcategories?${json}&${paginationFalse}`);
//   categories = await categories.json();
//   res.json(categories)
// }

// const getProgramsByCategories = async(req,res)=>{
//   let programs = await fetch(`http://api.sr.se/api/v2/programs?${json}&${paginationFalse}/index?programcategoryid=${req.params.categoryId}`)
//   programs = await programs.json()
//   res.json(programs)
// }

module.exports ={
getAllPrograms,
getProgramsByChannelId,
// getAllCategories,
// getProgramsByCategories
}