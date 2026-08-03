export default function FormCard({children, heading}:{children: React.ReactNode[], heading:string}){
    return(
    <div className="grid grid-cols-3 items-center justify-center mb-10 border border-gray-500 rounded-3xl p-10 shadow-2xl bg-slightly-lighter-green">
        <h1 className="col-span-1 text-3xl text-left font-medium">{heading}</h1>
        <div className="col-span-2 grid grid-cols-2 gap-5 p-10">
            {children}
        </div>
    </div>
    )
}