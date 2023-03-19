import BaseLayout from "@/components/layout/BaseLayout"
import { StepperContratti } from "@/components/WizardContratti/StepperContratti"
import { _useForm } from "@/hooks/useForm"
import { Database } from "@/types/supabase"
import { notifications } from "@mantine/notifications"
import { createServerSupabaseClient, User } from "@supabase/auth-helpers-nextjs"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { GetServerSideProps } from "next"

const Contract: React.FC<{ data: any, user: User }> = ({ data, user }) => {
  const supabase = useSupabaseClient<Database>()
  const { form, partecipanti, setPartecipanti, quote, setQuote, pagamenti, setPagamenti, onExportPDF } = _useForm(data, user, data.partecipanti, data.quote, data.pagamenti)

  const onModifyContract = async (event: React.FormEvent<HTMLFormElement>) => {
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
    delete _values.pagamenti
    delete _values.partecipanti
    delete _values.quote
    const { data, error } = await supabase.from('contracts')
      .update({ ..._values, contraente_id: contraente_id || 0 })
      .eq('id', _values.id)
      .select('id').single()
    console.log({ data, error })

    // update partecipanti, quote, pagamenti with contract_id = data.id
    if (data) {
      const aAll = await Promise.all([
        supabase.from('partecipanti').delete().eq('contract_id', data.id),
        supabase.from('quote').delete().eq('contract_id', data.id),
        supabase.from('pagamenti').delete().eq('contract_id', data.id)
      ])
      console.log({ aAll })
      const bAll = await Promise.all([
        supabase.from('partecipanti').insert(partecipanti.map(p => ({ ...p, contract_id: data.id }))),
        supabase.from('quote').insert(quote.map(q => ({ ...q, contract_id: data.id }))),
        supabase.from('pagamenti').insert(pagamenti.map(p => ({ ...p, contract_id: data.id })))
      ])
      console.log({ bAll })
      notifications.show({
        title: 'Contratto modificato',
        message: 'Il contratto è stato modificato con successo',
      })
    }
  }

  return (
    <BaseLayout title="Contratto">
      <StepperContratti
        onExportPDF={onExportPDF}
        onSubmitForm={onModifyContract}
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
