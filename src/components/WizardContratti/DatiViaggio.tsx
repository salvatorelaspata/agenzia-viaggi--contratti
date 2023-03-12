import { Divider, Flex, SimpleGrid, Switch, Textarea, TextInput } from "@mantine/core"
import { AutocompleteCities } from "../AutocompleteCities"
import { ImageCheckbox } from "../CheckboxWithImage"
import { DatePicker } from "../DatePicker"

export const DatiViaggio: React.FC<{ form: any, classes: any }> = ({ form, classes }) => {
  return (
    <>
      <Divider labelPosition="center" label="Dati Viaggio" mb={"md"} mt={"md"} />
      <Flex gap="md"
        justify="center"
        align="center"
        wrap="nowrap">
        <DatePicker
          label="Data Partenza"
          placeholder=""
          form={form.getInputProps('data_partenza')}
          classes={classes}
        />
        <DatePicker
          label="Data Arrivo"
          placeholder=""
          form={form.getInputProps('data_arrivo')}
          classes={classes}
        />
      </Flex>
      <Flex gap="md" mt="md">
        <Switch w={'100%'} label="Pacchetto Turistico" {...form.getInputProps('pacchetto_turistico')} />
        <Switch w={'100%'} label="Servizio Turistico" {...form.getInputProps('servizio_turistico')} />
      </Flex>
      <Flex gap="md" mt="md">
        {/* <TextInput mt="md"
                w={'100%'}
                label="Partenza da"
                classNames={classes}
                {...form.getInputProps('partenza')} /> */}
        <AutocompleteCities label="Partenza Da" form={form.getInputProps('partenza')} classes={classes} />
        <AutocompleteCities label="Arrivo A" form={form.getInputProps('arrivo')} classes={classes} />
        {/* <TextInput mt="md"
                w={'100%'}
                label="Arrivo a"
                classNames={classes}
                {...form.getInputProps('arrivo')} /> */}
      </Flex>
      <Textarea mt="md" label="Descrizione del Viaggio" minRows={5} {...form.getInputProps('descrizione_viaggio')} />
      <Divider labelPosition="center" label="Documentazione Necessaria" mb={"md"} mt={"md"} />
      <SimpleGrid
        cols={4}
        breakpoints={[
          { maxWidth: 'md', cols: 2 },
          { maxWidth: 'sm', cols: 1 },
        ]}
      >
        {[
          { key: 'd_carta_identita', description: '', title: 'Carta D\'identità' },
          { key: 'd_passaporto', description: '', title: 'Passaporto' },
          { key: 'd_vaccini', description: '', title: 'Vaccini' },
          { key: 'd_visto', description: '', title: 'Visto' },
        ].map((item) => <ImageCheckbox {...item} {...form.getInputProps(item.key)} key={item.key} />)}
      </SimpleGrid>
      <SimpleGrid
        cols={4}
        breakpoints={[
          { maxWidth: 'md', cols: 2 },
          { maxWidth: 'sm', cols: 1 },
        ]}
      >
        <TextInput mt="md" label="N° Carta D'Identità" classNames={classes} {...form.getInputProps('d_carta_identita_numero')} disabled={!form.getInputProps('d_carta_identita').value} />
        <TextInput mt="md" label="N° Passaporto" classNames={classes} {...form.getInputProps('d_passaporto_numero')} disabled={!form.getInputProps('d_passaporto').value} />
        <TextInput mt="md" label="Tipo Vaccini" classNames={classes} {...form.getInputProps('d_vaccini_numero')} disabled={!form.getInputProps('d_vaccini').value} />
        <TextInput mt="md" label="N° Visto" classNames={classes} {...form.getInputProps('d_visto_numero')} disabled={!form.getInputProps('d_visto').value} />
      </SimpleGrid>

    </>
  )
}