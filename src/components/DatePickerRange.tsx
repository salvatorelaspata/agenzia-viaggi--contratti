import { Center, Divider, Flex, Grid, Group, Text } from "@mantine/core"
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
    <>
      <Center>
        <Flex justify={'space-between'} w={'50%'}>
          <Text mr={'sm'}> {labelFrom}</Text >
          <Text ml={'sm'} > {labelTo}</Text >
        </Flex>
      </Center>
      <Center><Divider labelPosition="center" label="" mb={"md"} mt={"md"} w={'50%'} /></Center>
      <Center>
        <DatePicker type="range" numberOfColumns={2} {...form} />
      </Center>
    </ >
  )
}