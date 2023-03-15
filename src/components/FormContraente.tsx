import { Input, rem, SimpleGrid, TextInput } from "@mantine/core"
import { useId } from "@mantine/hooks";
import { DatePicker } from "./DatePicker"

import { IMaskInput } from 'react-imask';


export const FormContraente: React.FC<{ form: any, classes?: any, disabled?: boolean }> = ({ form, classes, disabled = true }) => {
  const id = useId();
  return (
    <>
      <SimpleGrid cols={2} breakpoints={[
        { maxWidth: 'sm', cols: 1 },
      ]}>
        <TextInput disabled={disabled} w={'100%'} label="Nome" classNames={classes} {...form.getInputProps('contraente.nome')} />
        <TextInput disabled={disabled} w={'100%'} label="Cognome" classNames={classes} {...form.getInputProps('contraente.cognome')} />
      </SimpleGrid>
      <SimpleGrid cols={2} breakpoints={[
        { maxWidth: 'sm', cols: 1 },
      ]}>
        {!disabled ?
          // <DatePicker
          //   label="Data di Nascita"
          //   placeholder="Seleziona la data di nascita"
          //   form={form.getInputProps('contraente.data_nascita')}
          //   classes={classes} />
          <Input.Wrapper id={id} label="Data di Nascita" classNames={classes} w={'100%'}
            mt="md" style={{ height: rem(54), }}>
            <Input<any> style={{ height: rem(54) }}
              component={IMaskInput}
              mask="00/00/0000"
              id={id}
            />
          </Input.Wrapper>
          : <TextInput disabled={disabled} mt="md" label="Data di Nascita" classNames={classes} {...form.getInputProps('contraente.data_nascita')} />}
        <TextInput disabled={disabled} mt="md"
          label="Luogo di Nascita"
          classNames={classes}
          {...form.getInputProps('contraente.luogo_nascita')} />
      </SimpleGrid>
      <SimpleGrid cols={3} breakpoints={[
        { maxWidth: 'sm', cols: 1 },
        { maxWidth: 'md', cols: 2 },
      ]}>
        <TextInput disabled={disabled} mt="md"
          label="Codice Fiscale"
          classNames={classes}
          {...form.getInputProps('contraente.cf')} />
        <TextInput disabled={disabled} mt="md"
          label="Indirizzo"
          classNames={classes}
          {...form.getInputProps('contraente.indirizzo')} />
        <TextInput disabled={disabled} mt="md"
          label="CAP"
          classNames={classes}
          {...form.getInputProps('contraente.cap')} />
      </SimpleGrid>
      <SimpleGrid cols={1} mt="md" mb="md">
        {/* phone */}
        <TextInput disabled={disabled}
          label="Telefono"
          classNames={classes}
          {...form.getInputProps('contraente.tel')} />
      </SimpleGrid>
    </>
  )
}
