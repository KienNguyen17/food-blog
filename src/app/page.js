'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Home() {
    const [db, setDb] = useState({});
    const [currentCategory, setCurrentCategory] = useState("");
    const [currentDish, setCurrectDish] = useState("");

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/food_db.json'); 
            const jsonData = await response.json();
            console.log(jsonData);
            setDb(jsonData);
            const first = Object.keys(jsonData)[0]
            setCurrentCategory(first)
            setCurrectDish(Object.keys(jsonData[first])[0])
        }
        fetchData();
    }, []);

    const renderEntries = (category, dish) => {
        const dishes = db[category] || {}
        const entries = dishes[dish] || [];
        return entries.map((item) => {
            return (
                <div 
                    key={`${item.name} - ${item.location}`}
                    className='mt-4 shadow-[#764838] shadow-md p-3 w-2xs'
                >
                    <p className='text-2xl text-extrabold font-serif text-[#764838]'>{item.name}</p>
                    <p className=''>{item.location}</p>
                    <p className='text-gray-500 italic text-extralight'>{item.note}</p>
                </div>
            )
        })
    }

    const renderDishes = (category) => {
        const dishes = db[category] || {};
        return  Object.entries(dishes).map((item) => {
            return (
                <div 
                    key={item[0]}
                    className={`h-10 text-center rounded-2xl mr-2 p-3 cursor-pointer shadow-[#764838] shadow-sm text-xs font-normal 
                        hover:bg-[#FACA78] hover:text-[#68c7c1] 
                        ${currentDish == item[0] ? 'bg-[#FACA78]' : 'bg-[#DD5341]'}
                        ${currentDish == item[0] ? 'text-[#68c7c1] ' : 'text-[#ffffff]'}`}
                    onClick={() => setCurrectDish(item[0])}
                >
                    {item[0]}
                </div>
            )
        })
    };

    const renderCategories = (db) => {
        return Object.entries(db).map((item) => {
            return (
                <div 
                    key={item[0]}
                    className={`w-50 p-3 bg-[#DD5341] font-normal mb-2 cursor-pointer shadow-[#764838] shadow-md
                        hover:bg-[#FACA78] hover:text-[#68c7c1] 
                        ${currentCategory == item[0] ? 'bg-[#FACA78]' : 'bg-[#DD5341]'}
                        ${currentCategory == item[0] ? 'text-[#68c7c1] ' : 'text-[#ffffff]'}`}
                    onClick={() => {
                        setCurrentCategory(item[0])
                        setCurrectDish(Object.keys(item[1])[0])
                    }}
                >
                    {item[0]}
                </div>
            )
        })
    };

    return (
        <div>
            <div className='flex justify-start pb-8 pt-12 pl-24 pr-24 gap-10 bg-[#DD5341] w-screen h-20" border-[#764838] border-b-12'>
                <Image src="/icon.jpg" width={200} height={200} alt="website-logo"/>
                <div className='flex flex-col'>
                    <h1 className='font-serif text-8xl text-[#FACA78]'>
                        Anh Nguyen
                    </h1>
                    <h1 className='font-serif text-8xl text-[#FACA78]'>
                        Food Review
                    </h1>
                </div>
                <div className='flex flex-col justify-end gap-4'>
                    <div className=''>
                        <div className='rounded-full w-8 h-8 border-2 border-white bg-[#68c7c1]'></div>
                        <div className='rounded-full w-8 h-8 border-2 border-white bg-[#764838]'></div>
                        <div className='rounded-full w-8 h-8 border-2 border-white bg-[#faca78]'></div>
                    </div>
                    <h2 className='text-white text-7xl font-medium font-italianno'>- ăn thủ đô</h2>
                </div>
                
            </div> 
            <div className='flex mt-8 mb-8, ml-24 mr-24 gap-10'>
                <div className='flex flex-col'>
                    {renderCategories(db)}
                </div>
                <div className='flex-col'>
                    <div className='flex'>
                        {renderDishes(currentCategory)} 

                    </div>
                    <div className='flex flex-wrap justify-start gap-x-10'>
                        {renderEntries(currentCategory, currentDish)}
                    </div>
                </div>
                
            </div>
        </div>
    )
};
