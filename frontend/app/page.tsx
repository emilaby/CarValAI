import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <Link href="/predict" className="mt-5 bg-light-green px-3 py-2 rounded-xl">
        GET STARTED
      </Link>
    </div>
  )
}
