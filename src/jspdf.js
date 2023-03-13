import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

const data = {
  form: {
    data: '2023-03-08T23:00:00.000Z',
    operatore: 'Salvatore La Spata',
    pratica_tipo: 'Costa Crociera',
    contraente_id: 0,
    pratica_n: '123131312',
    contraente: {
      id: 0,
      cap: '00159',
      cf: 'adaslkj',
      cognome: 'La Spata',
      data_nascita: '2023-02-28T23:00:00.000Z',
      indirizzo: 'Via S. Polo dei Cavalieri 42',
      luogo_nascita: 'Captag9',
      nome: 'Salvatore',
    },
    data_partenza: '2023-03-02T23:00:00.000Z',
    data_arrivo: '2023-02-28T23:00:00.000Z',
    pacchetto_turistico: true,
    servizio_turistico: true,
    partenza: 'Caltanissetta',
    arrivo: 'Rome',
    richieste_particolari: '',
    d_visto: false,
    d_carta_identita: true,
    d_passaporto: false,
    d_vaccini: false,
    descrizione_viaggio: 'asdasdasdasdsad\nas\ndsa\nd\nasd\nasdasdsadasdasdas',
    pratica_numero: '123',
    d_carta_identita_numero: '123123212312312',
  },
  partecipanti: [
    {
      contract_id: 0,
      nome: '123',
      cognome: '123',
      data_nascita: '2023-03-08T23:00:00.000Z',
      luogo_nascita: 'Caxito',
      cf: '12312312',
      indirizzo: '3123213213',
      cap: '213231232',
    },
    {
      contract_id: 0,
      nome: '123231',
      cognome: '23123213213',
      data_nascita: '2023-03-01T23:00:00.000Z',
      luogo_nascita: '11233213',
      cf: '3213123',
      indirizzo: '32132321',
      cap: '213213',
    },
  ],
  quote: [
    {
      contract_id: 0,
      servizi: '312222',
      importo: 123,
      n_pax: 2313123,
      totale: '222131',
    },
  ],
  pagamenti: [
    {
      contract_id: 0,
      data: '2023-10-30T23:00:00.000Z',
      descrizione: '1232131',
      importo: 123,
    },
  ],
}

export const createPDF = data => {
  var doc = new jsPDF({
    format: 'a4',
    orientation: 'portrait',
    unit: 'mm',
  })

  // applyPlugin(jsPDF)

  doc.rect(15, 15, 60, 34)
  doc.setFont('overlock')
  doc.setFontSize(9)

  // intestazione agenzia
  doc.text('AIR SEA LAND TRAVEL S.A.S.', 45, 22, { align: 'center' })
  doc.text('PIAZZA BELLINI 15/16 CALTAGIRONE', 45, 28, { align: 'center' })
  doc.text('TEL. 0933.34461 0933.55400', 45, 34, { align: 'center' })
  doc.text('EMAIL airsealandtravel@libero.it', 45, 40, { align: 'center' })
  doc.text('P.IVA 02274720875', 45, 46, { align: 'center' })

  // titolo
  doc.setFontSize(12)
  doc.text('CONFERMA DI PACCHETTO TURISTICO', 117, 22, { align: 'center' })

  // sottotitolo
  doc.setFontSize(10)
  doc.text('Modulo da utilizzare per adempiere', 117, 28, { align: 'center' })
  doc.text("alle disposizioni 16/2/1966 dell'art. 35", 117, 34, {
    align: 'center',
  })
  doc.text('del Codice del Turismo.', 117, 40, { align: 'center' })

  doc.addImage(
    'https://scontent-fco2-1.xx.fbcdn.net/v/t39.30808-6/316660777_523931066418667_2806132648482296837_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=3U7b69ogP_IAX9frTYL&_nc_ht=scontent-fco2-1.xx&oh=00_AfC0k0d63n1X76bZ-M32jIfAJmOMiiIn7ALmgSGJ9xBnEg&oe=6413F709',
    'JPEG',
    160,
    15,
    30,
    20
  )

  doc.line(15, 55, 195, 55)

  // dati contratto
  doc.setFontSize(12)
  doc.text('Dati Contratto', 20, 65)
  doc.line(20, 66.5, 70, 66.5)
  doc.setFontSize(10)
  doc.text('Data: ' + data.form.data, 20, 70)
  doc.text('Operatore: ' + data.form.operatore, 20, 75)
  doc.text('Pratica tipo: ' + data.form.pratica_tipo, 20, 80)
  doc.text('Contraente: ' + data.form.contraente_id, 20, 85)
  doc.text('Pratica n: ' + data.form.pratica_n, 20, 90)

  // dati contraente
  doc.setFontSize(12)
  doc.text('Dati Contraente', 110, 65)
  doc.line(110, 66.5, 160, 66.5)
  doc.setFontSize(10)
  doc.text('Cognome: ' + data.form.contraente.cognome, 110, 70)
  doc.text('Nome: ' + data.form.contraente.nome, 110, 75)
  doc.text('Data di nascita: ' + data.form.contraente.data_nascita, 110, 80)
  doc.text('Luogo di nascita: ' + data.form.contraente.luogo_nascita, 110, 85)
  doc.text('Codice Fiscale: ' + data.form.contraente.cf, 110, 90)
  doc.text('Indirizzo: ' + data.form.contraente.indirizzo, 110, 95)
  doc.text('CAP: ' + data.form.contraente.cap, 110, 100)

  // dati viaggio
  doc.setFontSize(12)
  doc.text('Dati viaggio', 20, 110)
  doc.line(20, 111.5, 70, 111.5)
  doc.setFontSize(10)
  doc.text('Data partenza: ' + data.form.data_partenza, 20, 115)
  doc.text('Data arrivo: ' + data.form.data_arrivo, 20, 120)
  doc.text(
    'Pacchetto turistico: ' + (data.form.pacchetto_turistico ? 'Si' : 'No'),
    20,
    125
  )
  doc.text(
    'Servizio turistico: ' + (data.form.servizio_turistico ? 'Si' : 'No'),
    20,
    130
  )
  doc.text('Partenza: ' + data.form.partenza, 20, 135)
  doc.text('Arrivo: ' + data.form.arrivo, 20, 140)
  doc.text('Richieste particolari: ' + data.form.richieste_particolari, 20, 145)

  // descrizione viaggio
  doc.setFontSize(12)
  doc.text('Descrizione viaggio', 110, 110)
  doc.line(110, 111.5, 160, 111.5)
  doc.setFontSize(10)
  doc.text(data.form.descrizione_viaggio, 110, 115)

  // table partecipanti
  doc.setFontSize(10)

  doc.setFontSize(12)
  doc.text(`Partecipanti (${data.partecipanti.length})`, 20, 155)
  doc.line(20, 156.5, 70, 156.5)
  doc.setFontSize(10)

  autoTable(doc, {
    head: [
      [
        'Cognome',
        'Nome',
        'Data di nascita',
        'Luogo di nascita',
        'Codice Fiscale',
        'Indirizzo',
        'CAP',
      ],
    ],
    body: data.partecipanti.map(p => [
      p.cognome,
      p.nome,
      p.data_nascita,
      p.luogo_nascita,
      p.cf,
      p.indirizzo,
      p.cap,
    ]),
    startY: 158,
    theme: 'striped',
    margin: { left: 20 },
    styles: {
      fontSize: 8,
    },
  })

  doc.setFontSize(12)
  console.log(doc.lastAutoTable.finalY)
  doc.text('Quote', 20, doc.lastAutoTable.finalY + 10)
  doc.line(
    20,
    doc.lastAutoTable.finalY + 11.5,
    70,
    doc.lastAutoTable.finalY + 11.5
  )
  doc.setFontSize(10)
  autoTable(doc, {
    head: [['Servizi', 'Importo', 'N° Pax', 'Totale']],
    body: data.quote.map(q => [q.servizi, q.importo, q.n_pax, q.totale]),
    startY: doc.lastAutoTable.finalY + 13,
    theme: 'striped',
    margin: { left: 20 },
    styles: {
      fontSize: 8,
    },
  })

  const alignY = doc.lastAutoTable.finalY + 10

  // table pagamenti
  doc.setFontSize(12)
  doc.text(100, alignY, 'Pagamenti')
  doc.line(100, alignY + 1.5, 150, alignY + 1.5)
  doc.setFontSize(10)
  autoTable(doc, {
    head: [['Data', 'Descrizione', 'Importo']],
    body: data.pagamenti.map(p => [p.data, p.descrizione, p.importo]),
    startY: alignY + 3,
    theme: 'striped',
    margin: { left: 100 },
    styles: {
      fontSize: 8,
    },
  })

  // note contrattuali
  doc.setFontSize(12)
  doc.text('Note Contrattuali', 20, alignY)
  doc.line(20, alignY + 1.5, 50, alignY + 1.5)
  doc.setFontSize(7)
  doc.text(
    20,
    alignY + 5,
    "il/i sottoscrittore/i del presente contratto si impegna a pagare i servizi sopra descritti, versando un acconto pari al 30% del totale previsto, effettuando il saldo 15 giorni prima della partenza. In caso di rinuncia, saranno applicate le penalità nella misura stabilita dal tour operator organizzatore, come espressamente enunciate nel catalogo che viene preso in visione o dall'agenzia , il /i contraente/i accetta/no le norme contrattuali in esso contenute, dichiarando di essere stato edotto contestualmente su modalità, tempi e servizi forniti la cui conferma è subordinata all'accettazione da parte del tour operator organizzatore. nel caso di utilizzazione di voli charter gli orari di partenza e arrivo sono indicativi in quanto possono subire variazioni di cui l'agenzia non è responsabile",
    { maxWidth: 75 }
  )

  // Firma del contraente e dell'operatore
  doc.setFontSize(10)
  doc.text('Firma del contraente', 20, doc.lastAutoTable.finalY + 30)
  doc.line(20, doc.lastAutoTable.finalY + 40, 70, doc.lastAutoTable.finalY + 40)

  doc.text('Firma dell’operatore', 117, doc.lastAutoTable.finalY + 30)
  doc.line(
    117,
    doc.lastAutoTable.finalY + 40,
    167,
    doc.lastAutoTable.finalY + 40
  )

  return doc
}
