"use client"
import React from "react"
import ForecastGraph from "@/components/ForecastGraph"
import Valuation from "@/components/Valuation"
import Loading from "@/components/Loading"
import {Car, Prediction} from "@/types"

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
        <div className="flex flex-col items-center mt-10 pb-10 min-h-screen w-full">
            {(!predictions || !carData) && <Loading/>}

            {predictions && predictions[0] && carData &&
            <div className="flex flex-col items-center w-full">
                <Valuation carData={carData} prediction={predictions[0]}/>
                <div className="w-7/10 border-t border-gray-600"/>
                <h1 className="text-2xl lg:text-3xl font-semibold mt-15 mb-3">Value Forecast</h1>
                <h2 className="text-secondary-text">Valuation forecast over the next 5 years</h2>
                <ForecastGraph data={predictions}/>
            </div>}
        </div>
        
    )
}