import type { Database } from "@/types/supabase";
import type { GetServerSideProps } from "next";
import BaseLayout from "@/components/layout/BaseLayout";
import { createServerSupabaseClient, User } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { createPDF } from "@/jspdf";
import { useRouter } from "next/router";
import { StepperContratti } from "@/components/WizardContratti/StepperContratti";
import { notifications } from "@mantine/notifications";
import { IconCheckbox } from "@tabler/icons-react";
import { _useForm } from "@/hooks/useForm";

const NewProject: React.FC<{ user: User }> = ({ user }) => {
  const supabase = useSupabaseClient<Database>();

  const routing = useRouter();

  const { form, partecipanti, setPartecipanti, quote, setQuote, pagamenti, setPagamenti } = _useForm(null, user, [], [], [])

  const onExportPDF = () => {
    const pdf = createPDF({ form: form.values, partecipanti, quote, pagamenti })
    pdf.save(`contratto_${new Date().toISOString()}.pdf`)
  }

  const onSaveContract = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ form: form.values, partecipanti, quote, pagamenti })
    const { contraente } = form.values
    const contraente_id = contraente?.id

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
        notifications.show({
          color: 'teal',
          icon: <IconCheckbox />,
          title: 'Successo',
          message: 'Contratto salvato con successo',
        });
        routing.push('/contratti');
      })
      .catch((error) => {
        console.log({ error })
      })
  }

  return (
    <BaseLayout title="Nuovo Contratto">
      <StepperContratti
        form={form}
        onSubmitForm={onSaveContract}
        onExportPDF={onExportPDF}
        partecipanti={partecipanti}
        setPartecipanti={setPartecipanti}
        quote={quote}
        setQuote={setQuote}
        pagamenti={pagamenti}
        setPagamenti={setPagamenti} />
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

export default NewProject;