import BaseLayout from "@/components/layout/BaseLayout";
import { Database } from "@/types/supabase";
import { Button, createStyles, Divider, Flex, Group, Input, NumberInput, rem, Select, Stepper, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { createServerSupabaseClient, User } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
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
  console.log(user)
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
      partecipanti: [],
      quote: [],
      pagamenti: [],
    },
  });

  return (
    <BaseLayout title="Nuovo Contratto">

      <Stepper active={active} onStepClick={setActive} breakpoint="sm" mt={"lg"}>
        <Stepper.Step label="Dati Contratto" description="Dati Contraente">
          <form onSubmit={form.onSubmit((values) => setSubmittedValues(JSON.stringify(values, null, 2)))} className={classes.root}>
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
          </form>
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Verify email">
          Step 2 content: Verify email
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Get full access">
          Step 3 content: Get full access
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep}>Next step</Button>
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