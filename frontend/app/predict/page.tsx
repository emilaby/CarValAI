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
import { InputItems } from "openai/resources/responses.js"
import { useRouter } from "next/navigation"


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
        <div className="flex flex-col items-center min-h-full w-full">
            <h1 className="text-xl mt-5 mb-4">PREDICTION DATA FORM</h1>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 items-center">
                <FormRow label="Make" child={<MakeCombobox onSelect={setMake}/>}/>
                <FormRow label="Model" child={<ModelCombobox onSelect={setModel} make={make}/>}/>
                <FormRow label="Variant" child={<VariantCombobox onSelect={setVariant} make={make} model={model}/>}/>
                <FormRow label="Body Type" child={<BodytypeCombobox onSelect={setBodytype} />}/>
                <FormRow label="Transmission" child={<TransmissionCombobox onSelect={setTransmission}/>}/>
                <FormRow label="Fuel Type" child={<FueltypeCombobox onSelect={setFueltype}/>}/>
                <FormRow label="Service History" child={<ServiceHistoryCombobox onSelect={setServiceHist}/>}/>
                <FormRow label="Miles" child={<input className="w-56" name="miles" type="text" placeholder="Enter mileage"/>}/>
                <FormRow label="Year" child={<input className="w-56" name="year" type="text" placeholder="Enter year"/>}/>
                <FormRow label="Engine Size" child={<input className="w-56" name="engineVol" type="text" placeholder="Enter engine volume in Litres"/>}/>
                <div className="flex flex-col items-center mt-5">
                    {missingDetails && <p className="italic text-xs mb-2 text-red-500">Please ensure all fields have been filled</p>}
                    <button type="submit" className=" bg-light-green px-3 py-2 rounded-xl">
                        MAKE PREDICTION
                    </button> 
                </div>
    
            </form>       
        </div>
        
    )
}