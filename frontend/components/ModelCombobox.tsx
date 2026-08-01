
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import cars from "@/app/data/cars.json"


type ModelComboboxProps = {
    onSelect: (make: string | null) => void,
    make: keyof typeof cars | null
}

export default function ModelCombobox(props:ModelComboboxProps) {
  return (
    <Combobox items={props.make === null ? [] : Object.keys(cars[props.make])} onValueChange={props.onSelect}>
      <ComboboxInput className="w-56" placeholder="Select a model" disabled={props.make === null}/>
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
