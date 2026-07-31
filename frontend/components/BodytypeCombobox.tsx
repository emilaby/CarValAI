
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import bodytypes from "@/app/data/body_types.json"

interface BodytypesComboboxProps {
    onSelect: (bodytype: string | null) => void
}

export default function MakeCombobox({onSelect}:BodytypesComboboxProps) {
  return (
    <Combobox items={bodytypes} onValueChange={onSelect}>
      <ComboboxInput placeholder="Select a body type" />
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
