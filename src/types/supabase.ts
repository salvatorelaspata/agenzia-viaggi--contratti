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
      contracts: {
        Row: {
          arrivo: string
          contraente_id: number
          d_carta_identita: string
          d_passaporto: string
          d_vaccini: number
          d_visto: string
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
          d_carta_identita: string
          d_passaporto: string
          d_vaccini: number
          d_visto: string
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
        Update: {
          arrivo?: string
          contraente_id?: number
          d_carta_identita?: string
          d_passaporto?: string
          d_vaccini?: number
          d_visto?: string
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
          cap: number
          cf: string
          cognome: string
          data_nascita: string
          id: number
          indirizzo: number
          luogo_nascita: string
          nome: string
        }
        Insert: {
          cap: number
          cf: string
          cognome: string
          data_nascita: string
          id: number
          indirizzo: number
          luogo_nascita: string
          nome: string
        }
        Update: {
          cap?: number
          cf?: string
          cognome?: string
          data_nascita?: string
          id?: number
          indirizzo?: number
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
          id: number
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
          cf: number
          cognome: string
          contract_id: number
          data_nascita: string
          id: number
          luogo_nascita: string
          nome: string
        }
        Insert: {
          cf: number
          cognome: string
          contract_id: number
          data_nascita: string
          id: number
          luogo_nascita: string
          nome: string
        }
        Update: {
          cf?: number
          cognome?: string
          contract_id?: number
          data_nascita?: string
          id?: number
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
          id: number
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
