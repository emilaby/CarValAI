import Link from "next/link"

export default function Header(){
    return(
    <header className="flex sticky rounded-xs top-0 justify-center items-center bg-med-green/80 backdrop-blur-xs h-18 sm:h-17 shadow-lg z-10">
        <h1 className="text-2xl lg:text-3xl text-primary-text ml-3 mr-3"><Link href="/" className="flex justify-center"><p>CAR PRICE PREDICTOR</p></Link></h1>
    </header>
    )
}