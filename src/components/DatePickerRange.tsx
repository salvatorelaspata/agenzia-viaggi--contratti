import { Group, Text } from "@mantine/core"
import { DatePicker } from "@mantine/dates"

interface DatiContrattoProps {
    form: any
    classes: object
    label: string
    placeholder?: string
}

export const DatePickerRange: React.FC<DatiContrattoProps> = ({ label, placeholder, form, classes }) => {
   return ( <Group position="center">
    <Text>{label}L</Text>
    <DatePicker type="range" numberOfColumns={2} {...form}/>
  </Group>)
    }