import { FormContraente } from "@/components/FormContraente";
import BaseLayout from "@/components/layout/BaseLayout";
import { Button, createStyles, rem } from "@mantine/core";
import { useForm } from "@mantine/form";

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

  return (
    <BaseLayout title="Creazione Cliente">
      <FormContraente form={form} classes={classes} />

      <Button onClick={() => console.log(form.values)}>Submit</Button>
      <Button onClick={() => form.reset()}>Reset</Button>
    </BaseLayout>
  );
};


export default NewCatalog;