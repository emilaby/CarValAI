
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import fuelTypes from "@/app/data/fuel_types.json"

interface FueltypeComboboxProps {
    onSelect: (fuel: string | null) => void
}

export default function FueltypeCombobox({onSelect}:FueltypeComboboxProps) {
  return (
    <Combobox items={fuelTypes} onValueChange={onSelect}>
      <ComboboxInput className="w-64 h-13 bg-dark-green" placeholder="Select fuel type" />
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
