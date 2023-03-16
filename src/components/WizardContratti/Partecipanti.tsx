import { Database } from "@/types/supabase"
import { onChangeArrayObjProp } from "@/utils"
import { Button, Center, Divider, Flex, Table, Text, Textarea, TextInput } from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import { IconPlaylistAdd, IconTrash } from "@tabler/icons-react"
import { AutocompleteCities } from "../AutocompleteCities"

interface PartecipantiProps {
  partecipanti: Database['public']['Tables']['partecipanti']['Insert'][]
  setPartecipanti: React.Dispatch<React.SetStateAction<Database['public']['Tables']['partecipanti']['Insert'][]>>
}
export const Partecipanti: React.FC<PartecipantiProps> = ({ partecipanti, setPartecipanti }) => {
  return (
    <>
      <Divider labelPosition="center" label="Partecipanti" mb={"lg"} mt={"lg"} />
      <Button size={'xs'} color={'gray'} leftIcon={<IconPlaylistAdd />}
        onClick={() => {
          setPartecipanti([...partecipanti, { contract_id: 0, nome: '', cognome: '', data_nascita: '', luogo_nascita: '', cf: '', indirizzo: '', cap: '' }])
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
          {partecipanti.map((item: Database['public']['Tables']['partecipanti']['Insert'], index: number) => (
            <tr key={index}>
              <td><Flex direction={'column'}>
                <TextInput onChange={(event) => onChangeArrayObjProp(setPartecipanti, partecipanti, index, 'nome', event?.target.value)} value={partecipanti[index].nome} placeholder="Nome" m={'xs'} />
                <TextInput onChange={(event) => onChangeArrayObjProp(setPartecipanti, partecipanti, index, 'cognome', event?.target.value)} value={partecipanti[index].cognome} placeholder="Cognome" m={'xs'} />
              </Flex></td> {/* partecipanti[index].nome */} {/* partecipanti[index].cognome */}
              <td><Flex direction={'column'}>
                <DatePickerInput mb={'lg'}
                  onChange={(value) => onChangeArrayObjProp(setPartecipanti, partecipanti, index, 'data_nascita', value?.toISOString() || '')}
                  value={partecipanti[index].data_nascita ? new Date(partecipanti[index].data_nascita) : new Date()}
                  placeholder="Data di Nascita" valueFormat="DD-MM-YYYY" />
                <AutocompleteCities placeholder="Luogo di Nascita" label="" classes={null} form={{
                  value: partecipanti[index].luogo_nascita, onChange: (event: any) => {
                    console.log(event)
                    onChangeArrayObjProp(setPartecipanti, partecipanti, index, 'luogo_nascita', event)
                  }
                }} />
              </Flex> </td> {/* partecipanti[index].data_nascita */} {/* partecipanti[index].luogo_nascita */}
              <td><TextInput onChange={(event) => onChangeArrayObjProp(setPartecipanti, partecipanti, index, 'cf', event?.target.value)} value={partecipanti[index].cf} /> </td> {/* partecipanti[index].cf */}
              <td><Textarea onChange={(event) => onChangeArrayObjProp(setPartecipanti, partecipanti, index, 'indirizzo', event?.target.value)} value={partecipanti[index].indirizzo} /> </td> {/* partecipanti[index].indirizzo */}
              <td><TextInput onChange={(event) => onChangeArrayObjProp(setPartecipanti, partecipanti, index, 'cap', event?.target.value)} value={partecipanti[index].cap} /> </td> {/* partecipanti[index].cap */}
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
    </>
  )
}