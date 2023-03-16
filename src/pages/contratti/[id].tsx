import BaseLayout from "@/components/layout/BaseLayout"
import { StepperContratti } from "@/components/WizardContratti/StepperContratti"
import { _useForm } from "@/hooks/useForm"
import { Database } from "@/types/supabase"
import { createServerSupabaseClient, User } from "@supabase/auth-helpers-nextjs"
import { GetServerSideProps } from "next"

const Contract: React.FC<{ data: any, user: User }> = ({ data, user }) => {
  const { form, partecipanti, setPartecipanti, quote, setQuote, pagamenti, setPagamenti } = _useForm(data, user, data.partecipanti, data.quote, data.pagamenti)
  console.log({ form, partecipanti, quote, pagamenti })
  return (
    <BaseLayout title="Contratto">
      <StepperContratti
        onExportPDF={() => { }}
        onSubmitForm={async () => { }}
        form={form}
        partecipanti={partecipanti}
        setPartecipanti={setPartecipanti}
        quote={quote}
        setQuote={setQuote}
        pagamenti={pagamenti}
        setPagamenti={setPagamenti} />
    </BaseLayout>
  )
}

export default Contract

// retrieve data from supabase
export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id
  const supabase = createServerSupabaseClient<Database>(context)
  const user = await supabase.auth.getUser()
  let data, partecipanti, quote, pagamenti, error
  try {
    const { data: _data, error: _error } = await supabase
      .from('contracts')
      .select('*, contraente(*)')
      .eq('id', id)
      .single()
    data = _data
    error = _error
    console.log({ data, error })
    const [_partecipanti, _quote, _pagamenti] = await Promise.all([
      supabase.from('partecipanti').select('*').eq('contract_id', id),
      supabase.from('quote').select('*').eq('contract_id', id),
      supabase.from('pagamenti').select('*').eq('contract_id', id),
    ])
    console.log({ _partecipanti, _quote, _pagamenti })
    partecipanti = _partecipanti.data
    quote = _quote.data
    pagamenti = _pagamenti.data
  } catch (err) {
    error = err
  }
  if (!data) return { notFound: true }
  const dataWithPartecipanti = { ...data, dataViaggio: [data.data_partenza, data.data_arrivo], partecipanti, quote, pagamenti }
  if (error) {
    console.error(error)
    return {
      notFound: true
    }
  }
  return {
    props: {
      data: dataWithPartecipanti,
      user: user
    }
  }
}
