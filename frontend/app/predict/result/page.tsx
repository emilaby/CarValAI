"use client"
import React from "react"
import Link from "next/link"
import ForecastGraph from "@/components/ForecastGraph"

type Prediction = {
    years_from_present: number,
    miles: number,
    price: number
}

type Car = {
    make: string,
    model: string,
    variant: string,
    body_type: string,
    fuel_type: string,
    transmission: string,
    age: number,
    engine_vol: number,
    full_service: number,
    part_service: number,
    miles: number
}

const vowels = ["a", "e", "i", "o", "u"]

/*
[{"years_from_present":0,"miles":100000,"price":8571.63},{"years_from_present":1,"miles":108000,"price":11814.87},
{"years_from_present":2,"miles":116000,"price":13412.69},{"years_from_present":3,"miles":124000,"price":10938.33},
{"years_from_present":4,"miles":132000,"price":12473.41},{"years_from_present":5,"miles":140000,"price":9621.5}]
*/

export default function Result(){
    const [predictions, setPredictions] = React.useState<Prediction[]>([])
    const [carData, setCarData] = React.useState<Car>()
    React.useEffect(() => {
        const predictionsFetched = sessionStorage.getItem("predictions")
        const carDataFetched = sessionStorage.getItem("car")
        if (predictionsFetched){
            setPredictions(JSON.parse(predictionsFetched))
        }
        if(carDataFetched){
            setCarData(JSON.parse(carDataFetched))
        }
    }, [])

    return(
        <div className="flex flex-col items-center mt-10">
            
            {predictions && predictions[0] && carData &&
            <div className="flex flex-col items-center w-full">
                <h1 className="text-3xl mb-4 font-semibold">Your valuation</h1>
                <p className="mb-10 text-xl">{new Date().getFullYear() - carData["age"]} {carData["make"]} {carData["model"]} {carData["variant"]}</p>
                <div className="flex items-baseline justify-between w-166">
                    <div className="flex flex-col items-center">
                        <p className="text-xs text-secondary-text">LOW</p>
                        <p className="text-secondary-text">£{Math.round(predictions[0]["price"] * 0.923).toLocaleString()}</p>
                    </div>
                    <div className="flex flex-col items-center">
                    <p className="text-5xl font-extrabold mb-2">£{Math.round(predictions[0]["price"]).toLocaleString()}</p>
                    <p className="text-xl text-light-green"> ▼</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <p className="text-xs text-secondary-text">HIGH</p>
                        <p className="text-secondary-text">£{Math.round(predictions[0]["price"] * 1.077).toLocaleString()}</p>
                    </div>
                </div>
 
                <div className="mb-30 h-8 w-152 rounded-full bg-linear-to-r from-red-500 via-yellow-400 to-green-500 " />
                <div className="w-7/10 border-t border-gray-600"/>
                <h1 className="text-3xl font-semibold mt-10 mb-3">Value Forecast</h1>
                <h2 className="text-secondary-text">Valuation forecast over the next 5 years</h2>
                <ForecastGraph data={predictions}/>
                <p className="mb-10"></p>
            </div>
           
            }
            
        
        </div>
        
    )
}