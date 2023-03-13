import BaseLayout from "@/components/layout/BaseLayout";
import { FormContraente } from "@/components/FormContraente";
import { Button, createStyles, rem } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconCheckbox } from "@tabler/icons-react";
import type { Database } from "@/types/supabase";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

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

const NewCatalog: React.FC = () => {
  const supabase = useSupabaseClient<Database>()
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      contraente: {
        nome: '',
        cognome: '',
        data_nascita: new Date(1970, 0, 1),
        luogo_nascita: '',
        cf: '',
        indirizzo: '',
        cap: '',
      }
    }
  })

  const onSubmit = () => {
    console.log(form.values)
    const { contraente } = form.values
    supabase.from('contraente').insert({ ...contraente, data_nascita: contraente.data_nascita.toISOString() }).select('nome, cognome').single().then(({ data }) => {
      console.log(data)
      notifications.show({
        color: 'teal',
        icon: <IconCheckbox />,
        title: 'Creazione Cliente',
        message: `Cliente ${data?.nome} ${data?.cognome} creato con successo.`,
        styles: (theme) => ({
          root: {
            backgroundColor: theme.colors.blue[6],
            borderColor: theme.colors.blue[6],

            '&::before': { backgroundColor: theme.white },
          },

          title: { color: theme.white },
          description: { color: theme.white },
          closeButton: {
            color: theme.white,
            '&:hover': { backgroundColor: theme.colors.blue[7] },
          },
        }),
      })
    })
  }
  return (
    <BaseLayout title="Creazione Cliente">
      <FormContraente form={form} classes={classes} disabled={false} />

      <Button onClick={onSubmit}>Submit</Button>
      <Button onClick={() => form.reset()}>Reset</Button>
    </BaseLayout>
  );
};


export default NewCatalog;