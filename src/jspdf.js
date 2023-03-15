import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

export const createPDF = data => {
  var doc = new jsPDF({
    format: 'a4',
    orientation: 'portrait',
    unit: 'mm',
  })

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
  // doc.text('Data: ', 20, 70)
  // doc.text(data.form.data, 40, 70)
  doc.text('Operatore: ', 20, 70)
  doc.text(data.form.operatore, 40, 70)
  doc.text('Pratica tipo: ', 20, 75)
  doc.text(data.form.pratica_tipo, 40, 75)
  doc.text('Pratica n: ', 20, 80)
  doc.text(data.form.pratica_n, 40, 80)

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
  doc.text(`Quote`, 20, doc.lastAutoTable.finalY + 10)
  doc.line(
    20,
    doc.lastAutoTable.finalY + 11.5,
    70,
    doc.lastAutoTable.finalY + 11.5
  )
  doc.setFontSize(10)
  autoTable(doc, {
    head: [['Servizi', 'Importo', 'N° Pax', 'Totale']],
    body: [
      ...data.quote.map(q => [q.servizi, q.importo, q.n_pax, q.totale]),
      // return total
      [
        '-',
        '-',
        '-',
        `Totale: ${data.quote.reduce(
          (acc, q) => acc + parseInt(q.totale),
          0
        )} €`,
      ],
    ],
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
  doc.text('Firma del contraente', 20, doc.lastAutoTable.finalY + 20)
  doc.line(20, doc.lastAutoTable.finalY + 30, 70, doc.lastAutoTable.finalY + 30)

  doc.text('Firma dell’operatore', 117, doc.lastAutoTable.finalY + 20)
  doc.line(
    117,
    doc.lastAutoTable.finalY + 30,
    167,
    doc.lastAutoTable.finalY + 30
  )

  return doc
}
export default createPDF
