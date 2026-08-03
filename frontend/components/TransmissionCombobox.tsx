
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import transmissions from "@/app/data/transmissions.json"

interface TransmissionsComboboxProps {
    onSelect: (transmission: string | null) => void
}

export default function TransmissionCombobox({onSelect}:TransmissionsComboboxProps) {
  return (
    <Combobox items={transmissions} onValueChange={onSelect}>
      <ComboboxInput className="w-64 h-13 bg-dark-green" placeholder="Select transmission" />
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
