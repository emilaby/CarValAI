import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center min-h-screen w-full pt-20 px-5">
      <p className="text-base lg:text-lg font-medium mb-4">AI-POWERED VEHICLE VALUATION</p>
      <h1 className="text-4xl lg:text-6xl font-bold">Know what your car is worth.</h1>
      <p className="text-lg lg:text-xl mt-10 lg:mt-15"> CarValAI uses machine learning to estimate your vehicles market value and forecast future values</p>
      <Link href="/predict" className="mt-20 lg:mt-35 bg-light-green px-6 lg:px-10 py-3 lg:py-4 rounded-xl text-lg font-semibold hover:bg-med-green transition hover:scale-105 drop-shadow-xl">
        GET STARTED
      </Link>
    </div>
  )
}
