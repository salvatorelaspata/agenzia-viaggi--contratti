import { formProps } from '@/components/WizardContratti/StepperContratti'
import createPDF from '@/jspdf'
import { Database } from '@/types/supabase'
import { useForm } from '@mantine/form'
import { User } from '@supabase/supabase-js'
import { useState } from 'react'

export const _useForm = (
  initialValues: any,
  user: User,
  _partecipanti: Database['public']['Tables']['partecipanti']['Insert'][],
  _quote: Database['public']['Tables']['quote']['Insert'][],
  _pagamenti: Database['public']['Tables']['pagamenti']['Insert'][]
) => {
  const [partecipanti, setPartecipanti] =
    useState<Database['public']['Tables']['partecipanti']['Insert'][]>(
      _partecipanti
    )
  const [quote, setQuote] =
    useState<Database['public']['Tables']['quote']['Insert'][]>(_quote)
  const [pagamenti, setPagamenti] =
    useState<Database['public']['Tables']['pagamenti']['Insert'][]>(_pagamenti)

  const form = useForm<formProps>({
    initialValues: initialValues || {
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
      data_partenza: '', //new Date().toISOString(),
      data_arrivo: '', // new Date().toISOString(),
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
      dataViaggio: [null, null],
    },
  })

  const onExportPDF = () => {
    const pdf = createPDF({ form: form.values, partecipanti, quote, pagamenti })
    pdf.save(`contratto_${new Date().toISOString()}.pdf`)
  }

  return {
    form,
    partecipanti,
    setPartecipanti,
    quote,
    setQuote,
    pagamenti,
    setPagamenti,
    onExportPDF,
  }
}
