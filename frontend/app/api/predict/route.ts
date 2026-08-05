import { NextRequest, NextResponse } from "next/server"

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

    const data = await response.json()

    return NextResponse.json(data, {
        status: response.status
    })
}