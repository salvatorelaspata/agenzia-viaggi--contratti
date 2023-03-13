import { Database } from "@/types/supabase"
import { Button, Divider, Flex, List, Modal, Select, Stepper, Text, TextInput } from "@mantine/core"

import { useDisclosure } from "@mantine/hooks"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useState } from "react"
import { DatePicker } from "../DatePicker"
import { FormContraente } from "../FormContraente"
interface DatiContrattoProps {
  form: any
  classes: object
}
export const DatiContratto: React.FC<DatiContrattoProps> = ({ form, classes }) => {
  const supabase = useSupabaseClient<Database>()
  const [opened, { open, close }] = useDisclosure(false)
  const [contraenti, setContraenti] = useState<Database['public']['Tables']['contraente']['Row'][]>([]);

  const onShowModal = () => {
    supabase.from('contraente').select('*').then(({ data, error }) => {
      if (error) return setContraenti([])
      setContraenti(data)
      open()
    })
  }
  return (
    <>
      <Divider labelPosition="center" label="Dati Contratto" mb={"lg"} mt={"lg"} />
      <DatePicker
        label="Data"
        placeholder=""
        form={form.getInputProps('data')}
        classes={classes}
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
      <TextInput mt={'md'} label="Numero Pratica" classNames={classes} {...form.getInputProps('pratica_n')} />

      <Divider labelPosition="center" label="Dati Contraente" mb={"lg"} mt={"lg"} />

      <Button mt="md" variant="outline" color="blue" onClick={onShowModal}>
        Seleziona contraente
      </Button>

      <Modal opened={opened} onClose={close} title="SELEZIONA IL CONTRAENTE">
        <List >
          {contraenti.map((contraente, index) => (
            <List.Item key={index} onClick={() => {
              form.values.contraente = { ...contraente, data_nascita: new Date(contraente.data_nascita) || null }
              form.setValues({ ...form.values })
              close()
            }}>
              <Flex gap="md"
                justify="center"
                align="center"
                wrap="nowrap">
                <Text>{contraente.nome} {contraente.cognome}</Text>
                <Text>{contraente.cf}</Text>
              </Flex>
            </List.Item>
          ))}
        </List>
      </Modal>
      <FormContraente form={form} classes={classes} disabled={false} />
    </>

  )
}