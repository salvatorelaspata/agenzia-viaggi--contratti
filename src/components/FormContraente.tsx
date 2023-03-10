import { Flex, TextInput } from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"

export const FormContraente: React.FC<{ form: any, classes: any }> = ({ form, classes }) => {
  return (
    <>
      <Flex gap="md"
        mt="md"
        justify="center"
        align="center"
        wrap="nowrap">
        <TextInput w={'100%'} label="Nome" classNames={classes} {...form.getInputProps('contraente.nome')} />
        <TextInput w={'100%'} label="Cognome" classNames={classes} {...form.getInputProps('contraente.cognome')} />
      </Flex>
      <DatePickerInput
        mt="md"
        popoverProps={{ withinPortal: true }}
        label="Data di Nascita"
        placeholder=""
        {...form.getInputProps('contraente.data_nascita')}
        valueFormat="DD-MM-YYYY"
        classNames={classes}
        contentEditable={false}
        clearable={true}
      />
      <TextInput mt="md"
        label="Luogo di Nascita"
        classNames={classes}
        {...form.getInputProps('contraente.luogo_nascita')} />
      <TextInput mt="md"
        label="Codice Fiscale"
        classNames={classes}
        {...form.getInputProps('contraente.cf')} />
      <TextInput mt="md"
        label="Indirizzo"
        classNames={classes}
        {...form.getInputProps('contraente.indirizzo')} />
      <TextInput mt="md"
        label="CAP"
        classNames={classes}
        {...form.getInputProps('contraente.cap')} />
    </>
  )
}
