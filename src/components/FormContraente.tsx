import { Flex, TextInput } from "@mantine/core"
import { DatePicker } from "./DatePicker"

export const FormContraente: React.FC<{ form: any, classes: any, disabled?: boolean }> = ({ form, classes, disabled = true }) => {
  return (
    <>
      <Flex gap="md"
        mt="md"
        justify="center"
        align="center"
        wrap="nowrap">
        <TextInput disabled={disabled} w={'100%'} label="Nome" classNames={classes} {...form.getInputProps('contraente.nome')} />
        <TextInput disabled={disabled} w={'100%'} label="Cognome" classNames={classes} {...form.getInputProps('contraente.cognome')} />
      </Flex>
      {!disabled ? <DatePicker
        label="Data di Nascita"
        placeholder="Seleziona la data di nascita"
        form={form.getInputProps('contraente.data_nascita')}
        classes={classes} /> : <TextInput disabled={disabled} mt="md" label="Data di Nascita" classNames={classes} {...form.getInputProps('contraente.data_nascita')} />}
      <TextInput disabled={disabled} mt="md"
        label="Luogo di Nascita"
        classNames={classes}
        {...form.getInputProps('contraente.luogo_nascita')} />
      <TextInput disabled={disabled} mt="md"
        label="Codice Fiscale"
        classNames={classes}
        {...form.getInputProps('contraente.cf')} />
      <TextInput disabled={disabled} mt="md"
        label="Indirizzo"
        classNames={classes}
        {...form.getInputProps('contraente.indirizzo')} />
      <TextInput disabled={disabled} mt="md" mb="md"
        label="CAP"
        classNames={classes}
        {...form.getInputProps('contraente.cap')} />
    </>
  )
}
