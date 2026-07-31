
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
      <ComboboxInput placeholder="Select fuel type" />
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
