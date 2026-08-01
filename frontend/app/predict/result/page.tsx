"use client"
import React from "react"
import Link from "next/link"

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
        <div className="flex flex-col items-center">
            
            {predictions && predictions[0] && carData &&
            <div>
                <h1 className="text-2xl">Your valuation:</h1>
                <p className="text-3xl font-bold">£{Math.round(predictions[0]["price"])}</p>
                <p>For {vowels.includes(carData["make"].charAt(0).toLowerCase()) ? "an" : "a"} {carData["make"]} {carData["model"]}</p>
            </div>}
        
        </div>
        
    )
}