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

type Prediction = {
    years_from_present: number,
    miles: number,
    price: number
}

export default function Valuation({carData, prediction}:{carData:Car, prediction:Prediction}){
    return(
        <>
            <h1 className="text-3xl mb-4 font-semibold">Your valuation</h1>
            <p className="mb-10 text-xl">{new Date().getFullYear() - carData["age"]} {carData["make"]} {carData["model"]} {carData["variant"]}</p>
            <div className="flex items-baseline justify-between w-166">
                <div className="flex flex-col items-center">
                    <p className="text-xs text-secondary-text">LOW</p>
                    <p className="text-secondary-text">£{Math.round(prediction["price"] * 0.923).toLocaleString()}</p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-5xl font-extrabold mb-2">£{Math.round(prediction["price"]).toLocaleString()}</p>
                    <p className="text-xl text-light-green"> ▼</p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-xs text-secondary-text">HIGH</p>
                    <p className="text-secondary-text">£{Math.round(prediction["price"] * 1.077).toLocaleString()}</p>
                </div>
            </div>
            <div className="mb-30 h-8 w-152 rounded-full bg-linear-to-r from-red-500 via-yellow-400 to-green-500 " />        
        </>

    )
}