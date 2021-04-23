import {createContext, useEffect, useState} from "react"
export const CategoryContext =createContext();

const CategoryContextProvider=(props)=>{
const [categories, setCategories]=useState(null);
const [category, setCategory]=useState(null);
useEffect(() => {
  getAllCategories()
}, [])


const getAllCategories= async ()=>{
  let categories = await fetch (`/api/v1/categories`)
  categories = await categories.json();
  setCategories(categories.programcategories)
}
const getCategoryById = async (categoryId)=>{
  let category = await fetch (`/api/v1/categories/${categoryId}`);
  category = await category.json();
  setCategory(category.programcategory)
}

const values ={
 categories,
 category,
 getCategoryById

}

  return(
    <CategoryContext.Provider value={values}>
      {props.children}
    </CategoryContext.Provider>
  )
}

export default CategoryContextProvider