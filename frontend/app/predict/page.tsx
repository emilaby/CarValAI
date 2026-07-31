import React from "react"
import Link from "next/link"
/*
make,model,variant,car_price,body_type,miles,engine_vol,transmission,fuel_type,full_service,part_service,age
1. Make:

*/

export default function Predict(){
    return(
        <div className="flex flex-col items-center min-h-full w-full">
            <h1 className="mt-5">PREDICTION DATA FORM</h1>
            <Link href="/predict/result" className="mt-5 bg-light-green px-3 py-2 rounded-xl">
                MAKE PREDICTION
            </Link>
        </div>
        
    )
}