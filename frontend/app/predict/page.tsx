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

    function handleSubmit(e: React.FormEvent){
        e.preventDefault()
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

                <button type="submit" className="mt-5 bg-light-green px-3 py-2 rounded-xl">
                    MAKE PREDICTION
                </button>     
            </form>       
        </div>
        
    )
}