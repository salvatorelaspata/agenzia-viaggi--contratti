import type { Database } from "@/types/supabase";
import type { GetServerSideProps } from "next";
import BaseLayout from "@/components/layout/BaseLayout";
import { DatiContratto } from "@/components/WizardContratti/DatiContratto";
import { DatiViaggio } from "@/components/WizardContratti/DatiViaggio";
import { Partecipanti } from "@/components/WizardContratti/Partecipanti";
import { QuotePagamenti } from "@/components/WizardContratti/QuotePagamenti";
import { Box, Button, createStyles, Flex, Group, rem, Stepper, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { createServerSupabaseClient, User } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { createPDF } from "@/jspdf";
import { IconDownload, IconRowInsertTop } from "@tabler/icons-react";

const NewProject: React.FC<{ user: User }> = ({ user }) => {
  const supabase = useSupabaseClient<Database>();
  const { classes } = useStyles();
  const [active, setActive] = useState<number>(0);

  const nextStep = () => setActive((current) => (current < 4 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const [partecipanti, setPartecipanti] = useState<Database['public']['Tables']['partecipanti']['Insert'][]>([]);
  const [quote, setQuote] = useState<Database['public']['Tables']['quote']['Insert'][]>([]);
  const [pagamenti, setPagamenti] = useState<Database['public']['Tables']['pagamenti']['Insert'][]>([]);

  type formProps = Database['public']['Tables']['contracts']['Insert'] & { contraente?: Database['public']['Tables']['contraente']['Row'] } & { dataViaggio: [Date | null, Date | null] };
  const form = useForm<formProps>({
    initialValues: {
      data: new Date().toISOString(), //new Date().toISOString(),
      operatore: user?.user_metadata?.full_name,
      pratica_tipo: '',
      contraente_id: 0,
      pratica_n: '',
      contraente: {
        id: 0,
        cap: '',
        cf: '',
        cognome: '',
        data_nascita: '',
        indirizzo: '',
        luogo_nascita: '',
        nome: '',
        tel: '',
      },
      data_partenza: '',//new Date().toISOString(),
      data_arrivo: '',// new Date().toISOString(),
      pacchetto_turistico: false,
      servizio_turistico: false,
      partenza: '',
      arrivo: '',
      richieste_particolari: '',
      d_visto: false,
      d_carta_identita: false,
      d_passaporto: false,
      d_vaccini: false,
      d_carta_identita_numero: '',
      d_passaporto_numero: '',
      d_vaccini_numero: '',
      d_visto_numero: '',
      descrizione_viaggio: '',
      dataViaggio: [null, null]
    },
  });

  const onChangeArrayObjProp = (fn: Function, array: any[], index: number, prop: string, value: any) => {
    array[index][prop] = value
    return fn([...array])
  };

  const onSaveContract = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ form: form.values, partecipanti, quote, pagamenti })
    const { contraente } = form.values
    // check is new contraente
    let contraente_id;
    // if (contraente && !contraente.id) {
    //   const { data, error } = await supabase.from('contraente')
    //     .insert(contraente)
    //     .select('id').single()
    //   contraente_id = data?.id
    //   console.log({ data, error })
    // } else {
    contraente_id = contraente?.id
    // }
    let _values: any = structuredClone(form.values)
    _values.data_partenza = _values.dataViaggio[0].toISOString()
    _values.data_arrivo = _values.dataViaggio[1].toISOString()
    delete _values.contraente
    delete _values.pratica_numero
    delete _values.dataViaggio
    const { data, error } = await supabase.from('contracts')
      .insert({ ..._values, contraente_id: contraente_id || 0 })
      .select('id').single()
    console.log({ data, error })

    // create partecipanti, quote, pagamenti with contract_id = data.id
    const aPAll: any[] = []
    if (!data?.id) return console.log('no contract id')
    aPAll.push(supabase.from('partecipanti').insert(partecipanti.map(p => ({ ...p, contract_id: data?.id }))))
    aPAll.push(supabase.from('quote').insert(quote.map(q => ({ ...q, contract_id: data?.id }))))
    aPAll.push(supabase.from('pagamenti').insert(pagamenti.map(pg => ({ ...pg, contract_id: data?.id }))))
    Promise.all(aPAll)
      .then((values) => {
        console.log({ values })
      })
      .catch((error) => {
        console.log({ error })
      })
  }

  const onExportPDF = async () => {
    const pdf = createPDF({ form: form.values, partecipanti, quote, pagamenti })
    pdf.save(`contratto_${new Date().toISOString()}.pdf`)
  }

  return (
    <BaseLayout title="Nuovo Contratto">
      <Flex justify={'center'} >
        <Button w={200} ml={'md'} mr={'md'} variant="outline" className={active === 0 && classes.buttonNone || ''} onClick={prevStep}>Indietro</Button>
        <Button w={200} ml={'md'} mr={'md'} className={active === 4 && classes.buttonNone || ''} onClick={nextStep}>Avanti</Button>
      </Flex>
      <form onSubmit={onSaveContract} className={classes.root}>
        <Stepper active={active} onStepClick={setActive} breakpoint="sm" mt={"lg"}>
          <Stepper.Step label="Dati Contratto" description="Dati Contraente">
            <DatiContratto form={form} classes={classes} />
          </Stepper.Step>
          <Stepper.Step label="Dati Viaggio">
            <DatiViaggio form={form} classes={classes} />
          </Stepper.Step>
          <Stepper.Step label="Partecipanti">
            <Partecipanti partecipanti={partecipanti} setPartecipanti={setPartecipanti} onChangeArrayObjProp={onChangeArrayObjProp} />
          </Stepper.Step>
          <Stepper.Step label="Quote" description="Pagamenti">
            <QuotePagamenti quote={quote} setQuote={setQuote} pagamenti={pagamenti} setPagamenti={setPagamenti} onChangeArrayObjProp={onChangeArrayObjProp} />
          </Stepper.Step>
          <Stepper.Completed>
            <Box p={'lg'}>
              <Button leftIcon={<IconDownload />} m={'lg'} color={'green'} onClick={onExportPDF}>Export PDF</Button>
              <Button leftIcon={<IconRowInsertTop />} m={'lg'} type="submit">Salva</Button>
            </Box>
          </Stepper.Completed>
        </Stepper>
      </form>
    </BaseLayout >
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabase = createServerSupabaseClient<Database>(context)
  const { data, error } = await supabase.auth.getUser()
  if (error) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
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

const useStyles = createStyles((theme) => ({
  buttonNone: {
    display: 'none',
  },
  root: {
    position: 'relative',
    paddingBottom: theme.spacing.xl,
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
export default NewProject;