"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header(){
    const pathname = usePathname()
    return(
    <header className="flex justify-between items-center h-18 sm:h-17 px-8 py-5">
        <h1 className="text-2xl font-bold lg:text-3xl text-primary-text"><Link href="/" className="flex justify-center"><p>CarValAI</p></Link></h1>
        <div className="flex min-w-0 max-w-full gap-5 lg:gap-10">
            <Link href="/" className={`transition hover:text-light-green ${pathname === "/" ? "text-light-green" : ""}`}>
                <p>Home</p>
            </Link>
            <Link href="/predict" className={`tranisition hover:text-light-green ${pathname === "/predict" ? "text-light-green" : ""}`}>
                <p>Predict</p>
            </Link>
            <Link href="/" className={`transition hover:text-light-green ${pathname === "" ? "text-light-green" : ""}`}>
                <p>About</p>
            </Link>
        </div>    
        
    </header>
    )
}