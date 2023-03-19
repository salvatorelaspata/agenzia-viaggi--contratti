import { Divider, Flex, SimpleGrid, Switch, Textarea, TextInput } from "@mantine/core"
import { AutocompleteCities } from "../AutocompleteCities"
import { ImageCheckbox } from "../CheckboxWithImage"
import { DatePicker } from "../DatePicker"
import { DatePickerRange } from "../DatePickerRange"

export const DatiViaggio: React.FC<{ form: any, classes: any }> = ({ form, classes }) => {
  return (
    <>
      <Divider labelPosition="center" label="Dati Viaggio" mb={"md"} mt={"md"} />

      <DatePickerRange labelFrom="Data Partenza" labelTo="Data Ritorno"
        placeholder=""
        form={form.getInputProps('dataViaggio')} classes={classes} />

      <SimpleGrid mt={'md'} cols={4} breakpoints={[{ maxWidth: 'md', cols: 2 }, { maxWidth: 'sm', cols: 1 }]}>
        <AutocompleteCities label="Partenza Da" form={form.getInputProps('partenza')} classes={classes} />
        <AutocompleteCities label="Arrivo A" form={form.getInputProps('arrivo')} classes={classes} />
        <Switch w={'100%'} mt={'md'} label="Pacchetto Turistico" {...form.getInputProps('pacchetto_turistico')} />
        <Switch w={'100%'} mt={'md'} label="Servizio Turistico" {...form.getInputProps('servizio_turistico')} />
      </SimpleGrid>

      <Divider labelPosition="center" label="Documentazione Necessaria" mb={"md"} mt={"md"} />

      <SimpleGrid
        cols={4}
        breakpoints={[{ maxWidth: 'md', cols: 2 }, { maxWidth: 'sm', cols: 2 }]}
      >
        {[
          { key: 'd_carta_identita', description: '', title: 'Carta D\'identità' },
          { key: 'd_passaporto', description: '', title: 'Passaporto' },
          { key: 'd_vaccini', description: '', title: 'Vaccini' },
          { key: 'd_visto', description: '', title: 'Visto' },
        ].map((item) => <ImageCheckbox {...item} checked={form.getInputProps(item.key).value} {...form.getInputProps(item.key)} key={item.key} />)}
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
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <Textarea w={'100%'} mt="md" label="Descrizione del Viaggio" minRows={5} {...form.getInputProps('descrizione_viaggio')} />
        <Textarea w={'100%'} mt="md" label="Richieste Particolari" minRows={5} {...form.getInputProps('richieste_particolari')} />
      </SimpleGrid>
    </>
  )
}