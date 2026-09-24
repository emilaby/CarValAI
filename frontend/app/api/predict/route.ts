import { NextRequest, NextResponse } from "next/server"
import { Car, Prediction } from "@/types"

// Requests FastAPI backend for prediction, recieves and returns it.

export async function POST(req: NextRequest){
    const features: Car = await req.json()
    const response = await fetch(
        "https://carvalai-backend-983599078404.europe-west2.run.app/predict",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": process.env.BACKEND_API_KEY!
            },
            body: JSON.stringify(features)
        }
    )

    const data: Prediction[] = await response.json()

    return NextResponse.json(data , {
        status: response.status
    })
}