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

/*
miles,engine_vol,year

*/
export default function Predict(){
    const [make, setMake] = React.useState<keyof typeof cars | null>(null)
    const [model, setModel] = React.useState<string | null>(null)
    const [variant, setVariant] = React.useState<string | null>(null)
    const [bodytype, setBodytype] = React.useState<string | null>(null)
    const [transmission, setTransmission] = React.useState<string | null>(null)
    const [fueltype, setFueltype] = React.useState<string | null>(null)
    const [serviceHist, setServiceHist] = React.useState<string | null>(null)
    const [missingDetails, setMissingDetails] = React.useState<boolean>(false)


    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        
        if (!make || !model || !variant || !bodytype || !transmission || !fueltype || !serviceHist){
            setMissingDetails(true)
            return
        }
        const formData = new FormData(e.currentTarget)
        const data = {
            make,
            model,
            variant,
            body_type: bodytype,
            miles: Number(formData.get("miles")),
            engine_vol: Number(formData.get("engine_vol")),
            transmission,
            fuel_type: fueltype,
            full_service: serviceHist === "No Service History" || serviceHist === "Part Service History" ? 0 : 1,
            part_service:  serviceHist === "Full Service History" || serviceHist === "No Service History" ? 0 : 1,
            age: new Date().getFullYear() - Number(formData.get("year"))
        }
        console.log(data)
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
                <FormRow label="Engine Size" child={<input className="w-56" name="engine_vol" type="text" placeholder="Enter engine volume in Litres"/>}/>
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