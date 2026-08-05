export default function FormCard({children, heading}:{children: React.ReactNode[], heading:string}){
    return(
    <div className="flex flex-col lg:grid lg:grid-cols-3 items-center lg:justify-center mb-10 border border-gray-500 rounded-3xl p-4 lg:p-10 shadow-2xl bg-slightly-lighter-green">
        <h1 className="text-2xl lg:col-span-1 lg:text-3xl text-left font-medium">{heading}</h1>
        <div className="flex flex-col lg:col-span-2 lg:grid lg:grid-cols-2 gap-5 p-5 lg:p-10">
            {children}
        </div>
    </div>
    )
}