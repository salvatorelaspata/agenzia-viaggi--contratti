import { AutocompleteCities } from "@/components/AutocompleteCities";
import { ImageCheckbox } from "@/components/CheckboxWithImage";
import BaseLayout from "@/components/layout/BaseLayout";
import { Database } from "@/types/supabase";
import { Button, Center, createStyles, Divider, Flex, Group, Input, List, Modal, NumberInput, Paper, rem, SegmentedControl, Select, SimpleGrid, Space, Stepper, Switch, Table, Text, Textarea, TextInput, Title } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { createServerSupabaseClient, User } from "@supabase/auth-helpers-nextjs";
import { IconPlaylistAdd, IconTrash, IconUser } from "@tabler/icons-react";
import { GetServerSideProps } from "next";
import { useState } from "react";


const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
  },

  input: {
    height: rem(54),
    paddingTop: rem(18),
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: `calc(${theme.spacing.sm} / 2)`,
    zIndex: 1,
  },
}));

const NewProject: React.FC<{ user: User }> = ({ user }) => {
  const { classes } = useStyles();
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const [submittedValues, setSubmittedValues] = useState('');

  const [partecipanti, setPartecipanti] = useState<Database['public']['Tables']['partecipanti']['Insert'][]>([]);
  const [quote, setQuote] = useState<Database['public']['Tables']['quote']['Insert'][]>([]);
  const [pagamenti, setPagamenti] = useState<Database['public']['Tables']['pagamenti']['Insert'][]>([]);

  const [opened, { open, close }] = useDisclosure(false)

  const form = useForm({
    initialValues: {
      data: new Date(),
      operatore: user?.user_metadata?.full_name,
      pratica_tipo: '',
      pratica_numero: '',
      contraente: {
        nome: '',
        cognome: '',
        data_nascita: null,
        luogo_nascita: '',
        cf: '',
        indirizzo: '',
        cap: ''
      },
      data_partenza: null,
      data_arrivo: null,
      pacchetto_turistico: false,
      servizio_turistico: false,
      partenza: '',
      arrivo: '',
      richieste_particolari: '',
      d_visto: false,
      d_carta_identita: false,
      d_passaporto: false,
      d_vaccini: false,
      descrizione_viaggio: '',
      partecipanti: [] as Database['public']['Tables']['partecipanti']['Insert'][],
      quote: [],
      pagamenti: [],
    },
  });

  return (
    <BaseLayout title="Nuovo Contratto">
      <form onSubmit={form.onSubmit((values) => setSubmittedValues(JSON.stringify(values, null, 2)))} className={classes.root}>

        <Stepper active={active} onStepClick={setActive} breakpoint="sm" mt={"lg"}>
          <Stepper.Step label="Dati Contratto" description="Dati Contraente">
            <Divider labelPosition="center" label="Dati Contratto" mb={"lg"} mt={"lg"} />
            <DatePickerInput
              mt="md"
              popoverProps={{ withinPortal: true }}
              label="Data"
              placeholder=""
              {...form.getInputProps('data')}
              valueFormat="DD-MM-YYYY"
              classNames={classes}
              clearable={false}
            />
            <TextInput mt="md"
              label="Operatore"
              classNames={classes}
              {...form.getInputProps('operatore')} />
            <Flex gap="md"
              justify="center"
              align="center"
              mt="md"
              wrap="nowrap">
              <Select
                w={'100%'}
                withinPortal
                data={['Costa Crociera', 'Altro (Specificare)']}
                label="Tipo Pratica"
                classNames={classes}
                {...form.getInputProps('pratica_tipo')}
              />
              {form.getInputProps('pratica_tipo').value.startsWith('Altro') && <TextInput hidden={true} w={'100%'} label="Altro" classNames={classes} {...form.getInputProps('pratica_tipo_altro')} />}
            </Flex>
            <TextInput mt={'md'} label="Numero Pratica" classNames={classes} {...form.getInputProps('pratica_numero')} />

            <Divider labelPosition="center" label="Dati Contraente" mb={"lg"} mt={"lg"} />
            <Button mt="md" variant="outline" color="blue" onClick={open}>
              Seleziona contraente
            </Button>

            <Modal opened={opened} onClose={close} title="SELEZIONA IL CONTRAENTE">
              <List >
                <Paper onClick={close}>
                  <Text>antani</Text>
                </Paper>
                <Paper>
                  <Text>prostanti</Text>
                </Paper>
              </List>
            </Modal>
            <Flex gap="md"
              justify="center"
              align="center"
              mt="md"
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
              clearable={false}
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

          </Stepper.Step>
          <Stepper.Step label="Dati Viaggio">
            <Divider labelPosition="center" label="Dati Viaggio" mb={"md"} mt={"md"} />
            <Flex gap="md"
              justify="center"
              align="center"
              wrap="nowrap">
              <DatePickerInput
                mt="md"
                popoverProps={{ withinPortal: true }}
                label="Data Partenza"
                w={'100%'}
                placeholder=""
                {...form.getInputProps('data_partenza')}
                valueFormat="DD-MM-YYYY"
                classNames={classes}
                clearable={false}
              />
              <DatePickerInput
                mt="md"
                popoverProps={{ withinPortal: true }}
                label="Data Arrivo"
                w={'100%'}
                placeholder=""
                {...form.getInputProps('data_arrivo')}
                valueFormat="DD-MM-YYYY"
                classNames={classes}
                clearable={false}
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

          </Stepper.Step>
          <Stepper.Step label="Partecipanti">
            <Divider labelPosition="center" label="Partecipanti" mb={"lg"} mt={"lg"} />
            <Button size={'xs'} color={'gray'} leftIcon={<IconPlaylistAdd />}
              onClick={() => {
                setPartecipanti([...partecipanti, { contract_id: 0, nome: '', cognome: '', data_nascita: '', luogo_nascita: '', cf: '' }])
              }}>Aggiungi Partecipante</Button>

            <Table>
              <thead>
                <tr>
                  <th><Flex direction={'column'}>
                    <Text>NOME</Text>
                    <Text>COGNOME</Text>
                  </Flex></th>
                  <th>DATA E LUOGO DI NASCITA</th>
                  <th>CODICE FISCALE</th>
                  <th>INDIRIZZO</th>
                  <th>CAP</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {partecipanti.map((item: any, index: number) => (
                  <tr key={index}>
                    <td><Flex direction={'column'}><TextInput placeholder="Nome" m={'xs'} /><TextInput placeholder="Cognome" m={'xs'} /></Flex></td> {/* item.nome */} {/* item.cognome */}
                    <td><Flex direction={'column'}><DatePickerInput mb={'lg'} placeholder="Data di Nascita" />
                      <AutocompleteCities placeholder="Luogo di Nascita" label="" classes={null} form={{ value: '', onChange: () => { } }} /></Flex> </td> {/* item.data_nascita */} {/* item.luogo_nascita */}
                    <td><TextInput /> </td> {/* item.cf */}
                    <td><Textarea /> </td> {/* item.indirizzo */}
                    <td><TextInput /> </td> {/* item.cap */}
                    <td><IconTrash onClick={() => {
                      setPartecipanti(partecipanti.filter((item: any, i: number) => i !== index))
                    }} /></td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={8}>
                    <Center m={20}>
                      <Text size={'lg'}>Totale Partecipanti: {partecipanti.length}</Text>
                    </Center>
                  </td>
                </tr>
              </tfoot>
            </Table>
          </Stepper.Step>
          <Stepper.Step label="Quote" description="Pagamenti">
            <Divider labelPosition="center" label="Quote" mb={"lg"} mt={"lg"} />
            <Button size={'xs'} color={'gray'} leftIcon={<IconPlaylistAdd />}
              onClick={() => {
                setQuote([...quote, { contract_id: 0, servizi: '', importo: 0, n_pax: 0, totale: 0 }])
              }}>Aggiungi Quota</Button>
            <Table>
              <thead>
                <tr>
                  <th>SERVIZI</th>
                  <th>IMPORTO</th>
                  <th>N. PAX</th>
                  <th>TOTALE</th>
                </tr>
              </thead>
              <tbody>
                {quote.map((item: any, index: number) => (
                  <tr key={index}>
                    <td><TextInput /></td> {/* item.servizio */}
                    <td><NumberInput /></td> {/* item.importo */}
                    <td><NumberInput /></td> {/* item.pax */}
                    <td><TextInput /></td> {/* item.totale */}
                  </tr>
                ))}
              </tbody>
            </Table>
            <Divider labelPosition="center" label="Pagamenti" mb={"lg"} mt={"lg"} />
            <Button size={'xs'} color={'gray'} leftIcon={<IconPlaylistAdd />}
              onClick={() => {
                const data = new Date()
                setPagamenti([...pagamenti, {
                  contract_id: 0,
                  data: `${data.getDate()}-${data.getMonth() + 1}-${data.getFullYear()}`,
                  descrizione: '',
                  importo: 0
                }])
              }}>Aggiungi Pagamento</Button>
            <Table>
              <thead>
                <tr>
                  <th>DATA</th>
                  <th>DESCRIZIONE</th>
                  <th>IMPORTO</th>
                </tr>
              </thead>
              <tbody>
                {pagamenti.map((item: any, index: number) => (
                  <tr key={index}>
                    <td><DatePickerInput /></td> {/* item.data */}
                    <td><Textarea /></td> {/* item.descrizione */}
                    <td><NumberInput /></td> {/* item.importo */}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Stepper.Step>
          <Stepper.Completed>
            <Text>Preview</Text>
            <Text>Export PDF</Text>
          </Stepper.Completed>
        </Stepper>
      </form>
      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>Indietro</Button>
        <Button onClick={nextStep}>Avanti</Button>
      </Group>
    </BaseLayout >
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabase = createServerSupabaseClient<Database>(context)
  const { data, error } = await supabase.auth.getUser()
  if (error) {
    return {
      props: {
        user: null
      }
    }
  } else {
    return {
      props: {
        user: data.user
      }
    }
  }
}

export default NewProject;