import { Database } from "@/types/supabase"
import { Button, Divider, Flex, HoverCard, List, Modal, Select, SimpleGrid, Stepper, Text, TextInput, useMantineTheme } from "@mantine/core"

import { useDisclosure } from "@mantine/hooks"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { IconHelp } from "@tabler/icons-react"
import Link from "next/link"
import { useState } from "react"
import { DatePicker } from "../DatePicker"
import { FormContraente } from "../FormContraente"
import { ModalContraenti, ModalContraentiProps } from "../ModalContraenti"

interface DatiContrattoProps {
  form: any
  classes: object
}

export const DatiContratto: React.FC<DatiContrattoProps> = ({ form, classes }) => {

  const onShowModal: ModalContraentiProps['cb'] = (contraente) => {
    form.values.contraente = { ...contraente, data_nascita: contraente.data_nascita }
    form.setValues({ ...form.values })
  }

  return (
    <>
      <Divider labelPosition="center" label="Dati Generali" mb={"lg"} mt={"lg"} />
      {/* <DatePicker
        label="Data"
        placeholder=""
        form={form.getInputProps('data')}
        classes={classes}
      /> */}
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]} spacing="md">
        <TextInput mt="md"
          label="Operatore"
          classNames={classes}
          {...form.getInputProps('operatore')} />
        <Flex direction={'column'} justify="center" align="center" w="100%">
          <Select
            mt="md"
            w={'100%'}
            withinPortal
            data={['Costa Crociera', 'Altro (Specificare)']}
            label="Tipo Pratica"
            classNames={classes}
            {...form.getInputProps('pratica_tipo')}
          />
          {form.getInputProps('pratica_tipo').value.startsWith('Altro') && <TextInput mt={'md'} hidden={true} w={'100%'} label="Altro" classNames={classes} {...form.getInputProps('pratica_tipo_altro')} />}
        </Flex>
        <TextInput mt={'md'} label="Numero Pratica" classNames={classes} {...form.getInputProps('pratica_n')} />
      </SimpleGrid>
      <Divider labelPosition="center" label="Dati Contraente" mb={"lg"} mt={"lg"} />
      <Flex m="md" align={'center'} justify={'end'} >
        <ModalContraenti cb={onShowModal} />
      </Flex>
      <FormContraente form={form} classes={classes} disabled={true} />

    </>

  )
}