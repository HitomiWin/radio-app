import {createContext, useEffect, useState} from "react"
export const CategoryContext =createContext();

const CategoryContextProvider=(props)=>{
const [categories, setCategories]=useState(null);
const [programsByCategory, setProgramsByCategory]= useState(null);
const [categoryName, setCategoryName]=useState(null)
useEffect(() => {
  getAllCategories()
}, [])

useEffect(()=>{
  getCategoryName();
},[categoryName])

const getAllCategories= async ()=>{
  let categories = await fetch (`/api/v1/categories`)
  categories = await categories.json();
  setCategories(categories)
}
const getProgramsByCategory = async (categoryId)=>{
  let programs = await fetch(`/api/v1/categories/${categoryId}`);
  programs = await programs.json();
  setProgramsByCategory(programs.programs)
}

const getCategoryName =(categoryName)=>{
  setCategoryName(categoryName)
}



const values ={
 categories,
 programsByCategory,
 getProgramsByCategory,
 categoryName,
 getCategoryName,

}
  return(
    <CategoryContext.Provider value={values}>
      {props.children}
    </CategoryContext.Provider>
  )
}

export default CategoryContextProvider