
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

interface ServiceHistoryComboboxProps {
    onSelect: (serviceHist: string | null) => void
}

const serviceHists = ["No Service History", "Full Service History", "Part Service History"]

export default function ServiceHistoryCombobox({onSelect}:ServiceHistoryComboboxProps) {
  return (
    <Combobox items={serviceHists} onValueChange={onSelect}>
      <ComboboxInput className="w-64 h-13" placeholder="Select service history" />
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
