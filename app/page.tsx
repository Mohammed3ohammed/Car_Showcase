"use client";

import { useEffect, useState } from "react";
import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from "../components";
import { fuels, yearsOfProduction } from "../constants";
import { fetchCars } from "../utils";
import Image from "next/image";


export default function Home( ) {
const [allCars, setAllCars] = useState([]);
const [loading, setLoading] = useState(false);

// search states

const [manufacturer, setManuFacturer] = useState("");
const [model, setModel] = useState("");

// filter states
const [fuel, setFuel] = useState("");
const [year, setYear] = useState(2024);

// pagination states

const [limit, setLimit] = useState(10);

const getCars = async () => {
  setLoading(true);
 try {
  const result  = await fetchCars({
    manufacturers: manufacturer || '',  
    year: year   || 2022 ,
    fule: fuel   || ''  ,
    limit: limit || 10  ,
    model: model || ''   ,
  });
      setAllCars(result);

 } catch (error) {
  console.log(error);

 } finally {
    setLoading(false);
 }
 
}

useEffect (() => {
    
    getCars();

}, [ fuel, year , limit, manufacturer ,model ])

const isDataEmpty = !Array.isArray(allCars) || allCars.length <1 || !allCars;
  return (
    <main className="overflow-hidden">
        <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4-l font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

      <div className="home__filters">
        <SearchBar  setManufacturer={setManuFacturer} setModel={setModel}  />
        <div 
        className="home__filter-container">
          <CustomFilter title="fuel" option={fuels}  setFilter={setFuel}  />
          <CustomFilter title="year" option={yearsOfProduction}  setFilter={setYear} />
        </div>
      </div>
            {allCars.length > 0 ? (
              <section>
              <div className='home__cars-wrapper'>
              {allCars?.map((car) => (
                <CarCard key={car}  car={car} />
              ))}
         </div>

              {loading && (
                <div className="">
                  <Image src="/loader.svg" alt="loader" width={50} height={50} className="object-contain" />
                </div>
              )}

              <ShowMore 
              pageNumber={limit  / 10}
              isNext={limit > allCars.length }
              setLimit={setLimit}
              />

           
              </section>
            ) : (
              <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
            <p>{allCars?.message}</p>
          </div>
            )}

      </div>
    </main>
  );
}
