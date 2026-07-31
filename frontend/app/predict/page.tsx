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

export default function Predict(){
    const [make, setMake] = React.useState<keyof typeof cars | null>(null)
    const [model, setModel] = React.useState<string | null>(null)
    const [variant, setVariant] = React.useState<string | null>(null)
    const [bodytype, setBodytype] = React.useState<string | null>(null)
    const [transmission, setTransmission] = React.useState<string | null>(null)
    const [fueltype, setFueltype] = React.useState<string | null>(null)

    return(
        <div className="flex flex-col items-center min-h-full w-full">
            <h1 className="mt-5">PREDICTION DATA FORM</h1>
            
            <MakeCombobox onSelect={setMake}/>
            <ModelCombobox onSelect={setModel} make={make}/>
            <VariantCombobox onSelect={setVariant} make={make} model={model}/>
            <BodytypeCombobox onSelect={setBodytype} />
            <TransmissionCombobox onSelect={setTransmission}/>
            <FueltypeCombobox onSelect={setFueltype}/>
    

            <Link href="/predict/result" className="mt-5 bg-light-green px-3 py-2 rounded-xl">
                MAKE PREDICTION
            </Link>            
        </div>
        
    )
}