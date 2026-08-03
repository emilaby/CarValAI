import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts"

type Prediction = {
    years_from_present: number,
    miles: number,
    price: number
}

export default function ForecastGraph({ data } : { data: Prediction[] }) {
    const valueChange = Math.round(data[0]["price"] - data[data.length - 1]["price"])
    const valueDecreased = valueChange >= 0
    const percLost = Math.round((data[0]["price"] - data[data.length - 1]["price"]) / data[0]["price"] * 100)
    const mileageChange = data[data.length - 1]["miles"] - data[0]["miles"]
    return (
        <>
            <div className="grid grid-cols-3 w-4/5 gap-4 mt-10 mb-15">
                <div className="flex flex-col items-center justify-center gap-2 border border-gray-500 rounded-2xl px-5 py-5 bg-slightly-lighter-green shadow-2xl">
                    <h2>Estimated change in value over 5yrs: </h2>
                    <p className={`${valueDecreased ? "text-red-600" : "text-green-500"} ${"text-xl"}`}>{valueDecreased ? "-£" : "£"}{Math.abs(valueChange)}</p>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 border border-gray-500 rounded-2xl px-5 py-5 bg-slightly-lighter-green shadow-2xl">
                    <h2>Estimated % change in value over 5yrs: </h2>
                    <p className={`${valueDecreased ? "text-red-600" : "text-green-500"} ${"text-xl"}`}>{valueDecreased ? "▼" : "▲"} {percLost}%</p>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 border border-gray-500 rounded-2xl px-5 py-5 bg-slightly-lighter-green shadow-2xl">
                    <h2>Estimated total mileage after 5yrs: </h2>
                    <p>{mileageChange + data[0]["miles"]} miles</p>
                </div>
            </div>
            <ResponsiveContainer width="80%" height={500}>
                <AreaChart data={data} width={500}>
                    <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
                    <XAxis dataKey="years_from_present" stroke="#ffffff" tickFormatter={(value) => `${value + new Date().getFullYear()}`} tickMargin={10}/>
                    <YAxis stroke="#ffffff" tickFormatter={(value) => `£${Math.round(value / 1000)}k`} tickMargin={7}/>
                    <Area dataKey="price" name="Value" fill="#84a98c" fillOpacity={0.35} stroke="#ffffff" strokeWidth={2} type="monotone"/>
                    <Tooltip cursor={false} formatter={(value) => `£${Math.round(Number(value)).toLocaleString()}`} labelFormatter={(label) => label === 0 ? "Current value" : `+${label} years`}
                    contentStyle={{backgroundColor: "#1f2937", border: "none", borderRadius: "8px", color: "#ffffff"}}/>
                </AreaChart>
            </ResponsiveContainer>

            
        </>

        
    )
}