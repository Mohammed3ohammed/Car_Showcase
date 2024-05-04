"use client";
import { useState } from "react";
import {SearchManuFacturer }from "./";

const SearchBar = () => {
    const [manufacturer, setManuFacturer] = useState("");
    const handleSearch =  () => {}
  return (
   <form className="searchbar" onSubmit={handleSearch}>
    <div className="searchbar__item">
    <SearchManuFacturer
          manufacturer = {manufacturer}
          setManufacturer = {setManuFacturer}
        />
    </div>
   </form>
  )
}

export default SearchBar;
