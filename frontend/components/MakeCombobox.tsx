
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import cars from "@/app/data/cars.json"

const makes = Object.keys(cars)

interface MakeComboboxProps {
    onSelect: (make: keyof typeof cars | null) => void
}

export default function MakeCombobox({onSelect}:MakeComboboxProps) {
  return (
    <Combobox items={makes} onValueChange={onSelect}>
      <ComboboxInput className="w-64 h-13" placeholder="Select a make" />
      <ComboboxContent className="bg-med-green text-secondary-text">
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
