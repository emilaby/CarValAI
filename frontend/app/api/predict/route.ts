import { NextRequest, NextResponse } from "next/server"
import { Prediction } from "@/types"

// Requests FastAPI backend for prediction, recieves and returns it.

type Predictions = {
    predictions: Prediction[]
}

export async function POST(req: NextRequest){
    const features = await req.json()
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

    const data: Predictions = await response.json()

    return NextResponse.json(data , {
        status: response.status
    })
}