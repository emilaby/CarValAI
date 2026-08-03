"use client"
import React from "react"
import Link from "next/link"
import MakeCombobox from "@/components/MakeCombobox"
import ModelCombobox from "@/components/ModelCombobox"
import VariantCombobox from "@/components/VariantCombobox"
import BodytypeCombobox from "@/components/BodytypeCombobox"
import cars from "@/app/data/cars.json"
import TransmissionCombobox from "@/components/TransmissionCombobox"
import FueltypeCombobox from "@/components/FueltypeCombobox"
import ServiceHistoryCombobox from "@/components/ServiceHistoryCombobox"
import FormRow from "@/components/FormRow"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"

export default function Predict(){
    const [make, setMake] = React.useState<keyof typeof cars | null>(null)
    const [model, setModel] = React.useState<string | null>(null)
    const [variant, setVariant] = React.useState<string | null>(null)
    const [bodytype, setBodytype] = React.useState<string | null>(null)
    const [transmission, setTransmission] = React.useState<string | null>(null)
    const [fueltype, setFueltype] = React.useState<string | null>(null)
    const [serviceHist, setServiceHist] = React.useState<string | null>(null)
    const [missingDetails, setMissingDetails] = React.useState<boolean>(false)

    const router = useRouter()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const miles = formData.get("miles")
        const year = formData.get("year")
        const engineSize = formData.get("engineVol")


        if (!make || !model || !variant || !bodytype || !transmission || !fueltype || !serviceHist || !miles || !year || !engineSize ){
            setMissingDetails(true)
            return
        }
        const data = {
            make,
            model,
            variant,
            body_type: bodytype,
            miles: Number(miles),
            engine_vol: Number(engineSize),
            transmission,
            fuel_type: fueltype,
            full_service: serviceHist === "No Service History" || serviceHist === "Part Service History" ? 0 : 1,
            part_service:  serviceHist === "Full Service History" || serviceHist === "No Service History" ? 0 : 1,
            age: new Date().getFullYear() - Number(year)
        }

        try{
            const res = await fetch("http://localhost:8000/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })

            if (!res.ok){
                console.error("error fetching")
                return
            }

            const result = await res.json()
            sessionStorage.setItem(
                "predictions",
                JSON.stringify(result.predictions)
            )
            sessionStorage.setItem(
                "car",
                JSON.stringify(data)
            )
            router.push("/predict/result")

        } catch (err){
            console.error(err)
        }
    }

    return(
        <div className="flex flex-col items-center min-h-full w-full py-10">            
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 items-center">
                <div className="grid grid-cols-3 items-center justify-center mb-10 border border-gray-500 rounded-3xl p-10 shadow-2xl bg-slightly-lighter-green">
                    <h1 className="col-span-1 text-3xl text-left font-medium">Vehicle</h1>
                    <div className="col-span-2 grid grid-cols-2 gap-5 p-10">
                        <FormRow label="MAKE" child={<MakeCombobox onSelect={setMake}/>}/>
                        <FormRow label="MODEL" child={<ModelCombobox onSelect={setModel} make={make}/>}/>
                        <FormRow label="BODY TYPE" child={<BodytypeCombobox onSelect={setBodytype} />}/>
                    </div>
                </div>
                
                <div className="grid grid-cols-3 text-4xl items-center justify-center mb-10 border border-gray-500 rounded-3xl p-10 shadow-2xl bg-slightly-lighter-green">
                    <h1 className="col-span-1 text-3xl font-medium">Specs</h1>
                    <div className="col-span-2 grid grid-cols-2 gap-5 p-10">
                        <FormRow label="VARIANT" child={<VariantCombobox onSelect={setVariant} make={make} model={model}/>}/>
                        <FormRow label="TRANSMISSION" child={<TransmissionCombobox onSelect={setTransmission}/>}/>
                        <FormRow label="FUEL TYPE" child={<FueltypeCombobox onSelect={setFueltype}/>}/>
                        <FormRow label="ENGINE SIZE" child={<Input className="w-64 h-13 placeholder:text-secondary-text bg-dark-green" name="engineVol" type="text" placeholder="Enter engine volume in Litres"/>}/>
                    </div>
                </div>
                <div className="grid grid-cols-3 text-4xl items-center justify-center border border-gray-500 rounded-3xl p-10 shadow-2xl bg-slightly-lighter-green">
                    <h1 className="col-span-1 text-3xl font-medium">Condition</h1>
                    <div className="col-span-2 grid grid-cols-2 gap-5  p-10">
                        <FormRow label="SERVICE HISORY" child={<ServiceHistoryCombobox onSelect={setServiceHist}/>}/>
                        <FormRow label="MILES" child={<Input className="w-64 h-13 placeholder:text-secondary-text bg-dark-green" name="miles" type="text" placeholder="Enter mileage"/>}/>
                        <FormRow label="YEAR" child={<Input className="w-64 h-13 placeholder:text-secondary-text bg-dark-green" name="year" type="text" placeholder="Enter year"/>}/>
                    </div>
                </div>

                <div className="flex flex-col items-center mt-5">
                    {missingDetails && <p className="italic text-xs mb-2 text-red-500">Please ensure all fields have been filled</p>}
                    <button type="submit" className="bg-light-green px-10 py-4 rounded-xl text-lg font-semibold drop-shadow-lg hover:bg-med-green transition hover:scale-105">
                        MAKE PREDICTION
                    </button> 
                </div>
    
            </form>       
        </div>
        
    )
}