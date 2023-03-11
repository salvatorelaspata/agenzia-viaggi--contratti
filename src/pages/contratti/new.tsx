import { AutocompleteCities } from "@/components/AutocompleteCities";
import { ImageCheckbox } from "@/components/CheckboxWithImage";
import { FormContraente } from "@/components/FormContraente";
import BaseLayout from "@/components/layout/BaseLayout";
import { DatiContratto } from "@/components/WizardContratti/DatiContratto";
import { DatiViaggio } from "@/components/WizardContratti/DatiViaggio";
import { Partecipanti } from "@/components/WizardContratti/Partecipanti";
import { QuotePagamenti } from "@/components/WizardContratti/QuotePagamenti";
import { Database } from "@/types/supabase";
import { Button, Center, createStyles, Divider, Flex, Group, Input, List, Modal, NumberInput, Paper, rem, SegmentedControl, Select, SimpleGrid, Space, Stepper, Switch, Table, Text, Textarea, TextInput, Title } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { createServerSupabaseClient, User } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
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
  const nextStep = () => setActive((current) => (current < 4 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const [submittedValues, setSubmittedValues] = useState('');

  const [partecipanti, setPartecipanti] = useState<Database['public']['Tables']['partecipanti']['Insert'][]>([]);
  const [quote, setQuote] = useState<Database['public']['Tables']['quote']['Insert'][]>([]);
  const [pagamenti, setPagamenti] = useState<Database['public']['Tables']['pagamenti']['Insert'][]>([]);

  const form = useForm({
    initialValues: {
      data: new Date(),
      operatore: user?.user_metadata?.full_name,
      pratica_tipo: '',
      pratica_numero: '',
      contraente: {
        cap: '',
        cf: '',
        cognome: '',
        data_nascita: new Date(1970, 0, 1),
        indirizzo: '',
        luogo_nascita: '',
        nome: '',
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
      descrizione_viaggio: ''
    },
  });

  const onChangeArrayObjProp = (fn: Function, array: any[], index: number, prop: string, value: string) => {
    array[index][prop] = value
    return fn([...array])
  };

  const onSaveContract = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedValues(JSON.stringify(form.values, null, 2));
    console.log({ form: form.values, partecipanti, quote, pagamenti })
  };

  return (
    <BaseLayout title="Nuovo Contratto">
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
            <Text>Preview</Text>
            <Text>Export PDF</Text>
            <Button type="submit">Salva</Button>
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