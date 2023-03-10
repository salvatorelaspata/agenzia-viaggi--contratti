[dati_contratto]
DATA
OP . ADV (auth.uid())
T.O
N. PRATICA T.O
[dati_contraente]
Nome
Cognome
Data di nascita
Luogo di nascita
Codice Fiscale
Indirizzo
CAP
[dati_pacchetto]
Data Partenza
Data Arrivo
Pacchetto Turistico (si/no)
Servizio Turistico (si/no)
Partenza da
Arrivo a
Documenti necessari (multivalued -- enum [VISTO C.IDENTITA' PASSAPORTO VACCINI])
Richieste particolari
[partecipanti] (1..\*)
Cognome
Nome
Data di nascita
Luogo di nascita
Codice Fiscale
[descrizione_viaggio]
descrizione

[quote]
servizi
importo (€)
n.pax
totale (€) (calculated)
[pagamenti]
data
descrizione
importo (€)

TODO
[ ] Salvataggio contratti
[ ] Gestione selezione autocomplete
[ ] Gestione stato contratto (Bozza, In Corso, Completato)
[ ] Visualizzazione Contratto
[ ] Nuovo Contraente
[ ] Salvataggio Contraente
[ ] Refactoring WizardStep
[ ] Gestione "Seleziona contraente"
[ ] Fix Autocompletion
