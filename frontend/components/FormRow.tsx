export default function FormRow({ label, child }:{label:string, child:React.ReactNode}){
    return(
        <div className="flex flex-col gap-1 w-full">
            <label className="ml-1 w-40 text-secondary-text text-left text-xs">{label}</label>
            {child}
        </div>
    )
}