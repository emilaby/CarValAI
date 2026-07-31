export default function FormRow({ label, child }:{label:string, child:React.ReactNode}){
    return(
        <div className="flex items-center gap-4 w-full">
            <label className="w-40 text-secondary-text text-left">{label}:</label>
            {child}
        </div>
    )
}