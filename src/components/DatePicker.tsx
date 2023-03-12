import { DatePickerInput } from "@mantine/dates"
import { IconCalendar } from "@tabler/icons-react"

interface DatiContrattoProps {
  form: any
  classes: object
  label: string
  placeholder?: string
}

export const DatePicker: React.FC<DatiContrattoProps> = ({ label, placeholder, form, classes }) => {
  return (
    <DatePickerInput
      mt="md"
      w={'100%'}
      icon={<IconCalendar style={{ marginTop: '1rem' }} size="1.5rem" stroke={1} />}
      popoverProps={{ withinPortal: true }}
      label={label}
      placeholder={placeholder || label}
      {...form}
      valueFormat="DD-MM-YYYY"
      classNames={classes}
      clearable={false}
    />
  )
}