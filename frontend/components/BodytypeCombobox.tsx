
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

export default function BodytypeCombobox({onSelect}:BodytypesComboboxProps) {
  return (
    <Combobox items={bodytypes} onValueChange={onSelect} >
      <ComboboxInput className="w-64 h-13" placeholder="Select a body type" />
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
