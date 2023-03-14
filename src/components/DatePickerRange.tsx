import { Divider, Flex, Group, Text } from "@mantine/core"
import { DatePicker } from "@mantine/dates"

interface DatiContrattoProps {
  form: any
  classes: object
  labelFrom: string
  labelTo: string
  placeholder?: string
}

export const DatePickerRange: React.FC<DatiContrattoProps> = ({ labelFrom, labelTo, placeholder, form, classes }) => {
  return (
    <Flex direction={'column'} w={'100%'}>
      <Flex justify={'space-around'}><Text> {labelFrom}</Text ><Text > {labelTo}</Text ></Flex>
      <Divider labelPosition="center" label="" mb={"md"} mt={"md"} />
      <DatePicker type="range" numberOfColumns={2} {...form} />
    </Flex >
  )
}