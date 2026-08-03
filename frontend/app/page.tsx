import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen w-full pt-20">
      <p className="text-lg font-medium mb-4">AI-POWERED VEHICLE VALUATION</p>
      <h1 className="text-6xl font-bold">Know what your car is worth.</h1>
      <p className="text-xl mt-15"> CarValueAI uses machine learning to estimate your vehicles market value and forecast future values</p>
      <Link href="/predict" className="mt-35 bg-light-green px-10 py-4 rounded-xl text-lg font-semibold hover:bg-med-green transition hover:scale-105 drop-shadow-xl">
        GET STARTED
      </Link>
    </div>
  )
}
