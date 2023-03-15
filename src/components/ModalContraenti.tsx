import { Database } from "@/types/supabase";
import { Avatar, Button, Flex, Group, HoverCard, List, Modal, Text, useMantineTheme } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { IconHelp } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react"
export interface ModalContraentiProps {
  cb: (contraente: Database['public']['Tables']['contraente']['Row']) => void
}
export const ModalContraenti: React.FC<ModalContraentiProps> = ({ cb }) => {
  const [opened, { open, close }] = useDisclosure(false)
  const [contraenti, setContraenti] = useState<Database['public']['Tables']['contraente']['Row'][]>([]);
  const supabase = useSupabaseClient<Database>()
  const theme = useMantineTheme();
  useEffect(() => {
    (!contraenti || contraenti.length === 0) && supabase.from('contraente').select('*').then(({ data, error }) => {
      if (error) return setContraenti([])
      setContraenti(data)
    }), []
  })
  return (
    <>
      <Button mr={'sm'} variant="outline" color="blue" onClick={open}>
        Seleziona contraente
      </Button>
      <HoverCard width={300} position={'top'} shadow="md">
        <HoverCard.Target>
          <IconHelp />
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text size={'md'}>
            Seleziona un contraente dalla lista se presente, altrimenti puoi crearlo da <Link href="/clienti/new">Qui</Link>
          </Text>
          <Text size={'sm'} style={{ fontStyle: 'italic' }}>
            NB i dati di questo form verranno persi.
          </Text>
        </HoverCard.Dropdown>
      </HoverCard>
      <Modal opened={opened} onClose={close}
        title="SELEZIONA IL CONTRAENTE"
        overlayProps={{
          color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}>

        {contraenti.map((contraente, index) => (
          <Flex style={{ borderBottom: '1px solid' }} key={contraente.id}
            align={'center'} w={'100%'} onClick={() => {
              cb(contraente)
              close()
            }} >
            <Avatar />
            <Text ml={'lg'}>{contraente.nome}</Text>
            <Text ml={'lg'}>{contraente.cognome}</Text>
          </Flex>
        ))}
      </Modal>
    </>
  )
}