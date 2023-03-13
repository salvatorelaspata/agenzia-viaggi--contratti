export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cities: {
        Row: {
          country: string
          geonameid: number
          id: number
          name: string
          subcountry: string | null
        }
        Insert: {
          country: string
          geonameid: number
          id?: number
          name: string
          subcountry?: string | null
        }
        Update: {
          country?: string
          geonameid?: number
          id?: number
          name?: string
          subcountry?: string | null
        }
      }
      contracts: {
        Row: {
          arrivo: string
          contraente_id: number
          d_carta_identita: boolean
          d_carta_identita_numero: string | null
          d_passaporto: boolean
          d_passaporto_numero: string | null
          d_vaccini: boolean | null
          d_vaccini_numero: string | null
          d_visto: boolean
          d_visto_numero: string | null
          data: string
          data_arrivo: string
          data_partenza: string
          descrizione_viaggio: string
          id: number
          operatore: string
          pacchetto_turistico: boolean
          partenza: string
          pratica_n: string
          pratica_tipo: string
          richieste_particolari: string
          servizio_turistico: boolean
        }
        Insert: {
          arrivo: string
          contraente_id: number
          d_carta_identita: boolean
          d_carta_identita_numero?: string | null
          d_passaporto: boolean
          d_passaporto_numero?: string | null
          d_vaccini?: boolean | null
          d_vaccini_numero?: string | null
          d_visto: boolean
          d_visto_numero?: string | null
          data: string
          data_arrivo: string
          data_partenza: string
          descrizione_viaggio: string
          id?: number
          operatore: string
          pacchetto_turistico: boolean
          partenza: string
          pratica_n: string
          pratica_tipo: string
          richieste_particolari: string
          servizio_turistico: boolean
        }
        Update: {
          arrivo?: string
          contraente_id?: number
          d_carta_identita?: boolean
          d_carta_identita_numero?: string | null
          d_passaporto?: boolean
          d_passaporto_numero?: string | null
          d_vaccini?: boolean | null
          d_vaccini_numero?: string | null
          d_visto?: boolean
          d_visto_numero?: string | null
          data?: string
          data_arrivo?: string
          data_partenza?: string
          descrizione_viaggio?: string
          id?: number
          operatore?: string
          pacchetto_turistico?: boolean
          partenza?: string
          pratica_n?: string
          pratica_tipo?: string
          richieste_particolari?: string
          servizio_turistico?: boolean
        }
      }
      contraente: {
        Row: {
          cap: string
          cf: string
          cognome: string
          data_nascita: string
          id: number
          indirizzo: string
          luogo_nascita: string
          nome: string
        }
        Insert: {
          cap: string
          cf: string
          cognome: string
          data_nascita: string
          id?: number
          indirizzo: string
          luogo_nascita: string
          nome: string
        }
        Update: {
          cap?: string
          cf?: string
          cognome?: string
          data_nascita?: string
          id?: number
          indirizzo?: string
          luogo_nascita?: string
          nome?: string
        }
      }
      pagamenti: {
        Row: {
          contract_id: number
          data: string
          descrizione: string
          id: number
          importo: number
        }
        Insert: {
          contract_id: number
          data: string
          descrizione: string
          id?: number
          importo: number
        }
        Update: {
          contract_id?: number
          data?: string
          descrizione?: string
          id?: number
          importo?: number
        }
      }
      partecipanti: {
        Row: {
          cap: string
          cf: string
          cognome: string
          contract_id: number
          data_nascita: string
          id: number
          indirizzo: string
          luogo_nascita: string
          nome: string
        }
        Insert: {
          cap: string
          cf: string
          cognome: string
          contract_id: number
          data_nascita: string
          id?: number
          indirizzo: string
          luogo_nascita: string
          nome: string
        }
        Update: {
          cap?: string
          cf?: string
          cognome?: string
          contract_id?: number
          data_nascita?: string
          id?: number
          indirizzo?: string
          luogo_nascita?: string
          nome?: string
        }
      }
      quote: {
        Row: {
          contract_id: number
          id: number
          importo: number
          n_pax: number
          servizi: string
          totale: number
        }
        Insert: {
          contract_id: number
          id?: number
          importo: number
          n_pax: number
          servizi: string
          totale: number
        }
        Update: {
          contract_id?: number
          id?: number
          importo?: number
          n_pax?: number
          servizi?: string
          totale?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
