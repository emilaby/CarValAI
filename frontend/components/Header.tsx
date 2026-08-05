"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header(){
    const pathname = usePathname()
    return(
    <header className="flex justify-between items-center h-18 px-5 py-2 lg:px-8 lg:py-5">
        <h1 className="text-2xl font-bold lg:text-4xl text-primary-text"><Link href="/" className="flex justify-center"><p>CarValAI</p></Link></h1>
        <div className="flex min-w-0 max-w-full gap-5 lg:gap-10">
            <Link href="/" className={`transition hover:text-light-green ${pathname === "/" ? "text-light-green" : ""}`}>
                <p>Home</p>
            </Link>
            <Link href="/predict" className={`tranisition hover:text-light-green ${pathname === "/predict" ? "text-light-green" : ""}`}>
                <p>Predict</p>
            </Link>
        </div>    
    </header>
    )
}