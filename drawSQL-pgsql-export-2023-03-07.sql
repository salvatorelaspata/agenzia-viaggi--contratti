CREATE TABLE "partecipanti"(
    "id" BIGINT NOT NULL,
    "nome" TEXT NOT NULL,
    "cognome" TEXT NOT NULL,
    "data_nascita" DATE NOT NULL,
    "luogo_nascita" TEXT NOT NULL,
    "cf" BIGINT NOT NULL,
    "contract_id" BIGINT NOT NULL
);
ALTER TABLE
    "partecipanti" ADD PRIMARY KEY("id");
CREATE TABLE "contracts"(
    "id" BIGINT NOT NULL,
    "data" DATE NOT NULL,
    "operatore" TEXT NOT NULL,
    "pratica_tipo" TEXT NOT NULL,
    "pratica_n" TEXT NOT NULL,
    "contraente_id" BIGINT NOT NULL,
    "data_partenza" DATE NOT NULL,
    "data_arrivo" DATE NOT NULL,
    "pacchetto_turistico" BOOLEAN NOT NULL,
    "servizio_turistico" BOOLEAN NOT NULL,
    "partenza" TEXT NOT NULL,
    "arrivo" TEXT NOT NULL,
    "richieste_particolari" TEXT NOT NULL,
    "d_visto" TEXT NOT NULL,
    "d_carta_identita" TEXT NOT NULL,
    "d_passaporto" TEXT NOT NULL,
    "d_vaccini" BIGINT NOT NULL,
    "descrizione_viaggio" TEXT NOT NULL
);
ALTER TABLE
    "contracts" ADD PRIMARY KEY("id");
CREATE TABLE "contraente"(
    "id" BIGINT NOT NULL,
    "nome" TEXT NOT NULL,
    "cognome" TEXT NOT NULL,
    "data_nascita" DATE NOT NULL,
    "luogo_nascita" TEXT NOT NULL,
    "cf" TEXT NOT NULL,
    "indirizzo" BIGINT NOT NULL,
    "cap" INTEGER NOT NULL
);
ALTER TABLE
    "contraente" ADD PRIMARY KEY("id");
CREATE TABLE "quote"(
    "id" BIGINT NOT NULL,
    "servizi" TEXT NOT NULL,
    "importo" DOUBLE PRECISION NOT NULL,
    "n_pax" INTEGER NOT NULL,
    "totale" INTEGER NOT NULL,
    "contract_id" BIGINT NOT NULL
);
ALTER TABLE
    "quote" ADD PRIMARY KEY("id");
CREATE TABLE "pagamenti"(
    "id" BIGINT NOT NULL,
    "data" DATE NOT NULL,
    "descrizione" TEXT NOT NULL,
    "importo" DOUBLE PRECISION NOT NULL,
    "contract_id" BIGINT NOT NULL
);
ALTER TABLE
    "pagamenti" ADD PRIMARY KEY("id");
ALTER TABLE
    "quote" ADD CONSTRAINT "quote_contract_id_foreign" FOREIGN KEY("contract_id") REFERENCES "contracts"("id");
ALTER TABLE
    "pagamenti" ADD CONSTRAINT "pagamenti_contract_id_foreign" FOREIGN KEY("contract_id") REFERENCES "contracts"("id");
ALTER TABLE
    "partecipanti" ADD CONSTRAINT "partecipanti_contract_id_foreign" FOREIGN KEY("contract_id") REFERENCES "contracts"("id");
ALTER TABLE
    "contracts" ADD CONSTRAINT "contracts_contraente_id_foreign" FOREIGN KEY("contraente_id") REFERENCES "contraente"("id");