
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import cars from "@/app/data/cars.json"


type VariantComboboxProps = {
    onSelect: (variant: string | null) => void,
    make: keyof typeof cars | null,
    model: string | null
}

export default function ModelCombobox(props:VariantComboboxProps) {
  return (
    <Combobox items={(props.make === null || props.model === null) ? [] : cars[props.make][props.model as keyof typeof cars[typeof props.make]]} onValueChange={props.onSelect}>
      <ComboboxInput className="w-64 h-13 bg-dark-green" placeholder="Select a variant" disabled={props.make === null || props.model === null}/>
      <ComboboxContent className="bg-green text-secondary-text">
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
