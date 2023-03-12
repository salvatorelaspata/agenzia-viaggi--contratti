import { Database } from "@/types/supabase"
import { Button, Divider, NumberInput, Table, TextInput } from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import { IconPlaylistAdd } from "@tabler/icons-react"

interface QuotePagamentiProps {
  quote: Database['public']['Tables']['quote']['Insert'][]
  setQuote: React.Dispatch<React.SetStateAction<Database['public']['Tables']['quote']['Insert'][]>>
  pagamenti: Database['public']['Tables']['pagamenti']['Insert'][]
  setPagamenti: React.Dispatch<React.SetStateAction<Database['public']['Tables']['pagamenti']['Insert'][]>>
  onChangeArrayObjProp: (setArray: any, array: any[], index: number, prop: string, value: any) => void
}

export const QuotePagamenti: React.FC<QuotePagamentiProps> = ({ quote,
  setQuote,
  pagamenti,
  setPagamenti,
  onChangeArrayObjProp }) => {
  return (
    <>
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
          {quote.map((item: Database['public']['Tables']['quote']['Insert'], index: number) => (
            <tr key={index}>
              <td><TextInput value={quote[index]['servizi'] || ''} onChange={(event) => onChangeArrayObjProp(setQuote, quote, index, 'servizi', event?.target.value)} /></td> {/* item.servizio */}
              <td><NumberInput value={quote[index]['importo'] || ''} onChange={(event) => onChangeArrayObjProp(setQuote, quote, index, 'importo', event)} decimalSeparator="," precision={0} min={0} step={10} /></td> {/* item.importo */}
              <td><NumberInput value={quote[index]['n_pax'] || ''} onChange={(event) => onChangeArrayObjProp(setQuote, quote, index, 'n_pax', event)} decimalSeparator="," precision={0} min={0} step={10} /></td> {/* item.pax */}
              <td><TextInput value={quote[index]['totale'] || ''} onChange={(event) => onChangeArrayObjProp(setQuote, quote, index, 'totale', event?.target.value)} /></td> {/* item.totale */}
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
          {pagamenti.map((item: Database['public']['Tables']['pagamenti']['Insert'], index: number) => (
            <tr key={index}>
              <td>
                <DatePickerInput
                  onChange={(value) => onChangeArrayObjProp(setPagamenti, pagamenti, index, 'data', value?.toISOString() || '')}
                  value={pagamenti[index].data ? new Date(pagamenti[index].data) : new Date()}
                  placeholder="Data" valueFormat="DD-MM-YYYY" />
              </td>
              <td><TextInput value={pagamenti[index]['descrizione'] || ''} onChange={(event) => onChangeArrayObjProp(setPagamenti, pagamenti, index, 'descrizione', event?.target.value)} /></td> {/* item.descrizione */}
              <td><NumberInput value={pagamenti[index]['importo'] || ''} onChange={(event) => onChangeArrayObjProp(setPagamenti, pagamenti, index, 'importo', event)} decimalSeparator="," precision={0} min={0} step={10} /></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}