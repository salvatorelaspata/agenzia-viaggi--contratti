import { IconDownload, IconRowInsertTop } from "@tabler/icons-react"
import { Dispatch, SetStateAction, useState } from "react"
import { DatiContratto } from "@/components/WizardContratti/DatiContratto";
import { DatiViaggio } from "@/components/WizardContratti/DatiViaggio";
import { Partecipanti } from "@/components/WizardContratti/Partecipanti";
import { QuotePagamenti } from "@/components/WizardContratti/QuotePagamenti";
import { Box, Button, Center, createStyles, Flex, Stepper, rem } from "@mantine/core";
import { Database } from "@/types/supabase";
import { UseFormReturnType } from "@mantine/form";

export type formProps = Database['public']['Tables']['contracts']['Insert'] & { contraente?: Database['public']['Tables']['contraente']['Row'] } & { dataViaggio: [Date | null, Date | null] };

interface StepperProps {
  onSubmitForm: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
  onExportPDF: () => void
  partecipanti: Database['public']['Tables']['partecipanti']['Insert'][];
  setPartecipanti: Dispatch<SetStateAction<Database['public']['Tables']['partecipanti']['Insert'][]>>;
  quote: Database['public']['Tables']['quote']['Insert'][];
  setQuote: Dispatch<SetStateAction<Database['public']['Tables']['quote']['Insert'][]>>;
  pagamenti: Database['public']['Tables']['pagamenti']['Insert'][];
  setPagamenti: Dispatch<SetStateAction<Database['public']['Tables']['pagamenti']['Insert'][]>>;
  form: UseFormReturnType<formProps, (values: formProps) => formProps>
}

export const StepperContratti: React.FC<StepperProps> = ({ onSubmitForm, onExportPDF, form, partecipanti, quote, pagamenti, setPartecipanti, setQuote, setPagamenti }) => {
  const { classes } = useStyles();
  const [active, setActive] = useState<number>(0);

  const nextStep = () => setActive((current) => (current < 4 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (<>
    <Flex justify={'center'} >
      <Button w={200} ml={'md'} mr={'md'} variant="outline" className={active === 0 && classes.buttonNone || ''} onClick={prevStep}>Indietro</Button>
      <Button w={200} ml={'md'} mr={'md'} className={active === 4 && classes.buttonNone || ''} onClick={nextStep}>Avanti</Button>
    </Flex>
    <form onSubmit={onSubmitForm} className={classes.root}>
      <Stepper active={active} onStepClick={setActive} breakpoint="sm" mt={"lg"}>
        <Stepper.Step label="Dati Contratto" description="Dati Contraente">
          <DatiContratto form={form} classes={classes} />
        </Stepper.Step>
        <Stepper.Step label="Dati Viaggio">
          <DatiViaggio form={form} classes={classes} />
        </Stepper.Step>
        <Stepper.Step label="Partecipanti">
          <Partecipanti partecipanti={partecipanti} setPartecipanti={setPartecipanti} />
        </Stepper.Step>
        <Stepper.Step label="Quote" description="Pagamenti">
          <QuotePagamenti quote={quote} setQuote={setQuote} pagamenti={pagamenti} setPagamenti={setPagamenti} />
        </Stepper.Step>
        <Stepper.Completed>
          <Center>
            <Box p={'lg'}>
              <Button h={200} w={200} style={{ fontSize: rem(20) }} leftIcon={<IconDownload />} m={'lg'} color={'green'} onClick={onExportPDF}>Export PDF</Button>
              <Button h={200} w={200} style={{ fontSize: rem(20) }} leftIcon={<IconRowInsertTop />} m={'lg'} type="submit">Salva</Button>
            </Box>
          </Center>
        </Stepper.Completed>
      </Stepper>
    </form>
  </>
  )
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