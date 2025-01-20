# Installation

## Step 1:
Install MySQL Community Edition and set up account 'root' with no password/empty password

## Step 2: 
Clone repository

## Step 3:
Navigate into the cloned folder and run `npm install`

## Step 4:
Run `npm start`

## Step 5:
Open server in browser at http://localhost:3000

# Pagini
- log in
## Administrator:
- overview pentru grupurile de evenimente
- pop up pentru un formular de adaugare
- detalii eveniment
- export per eveniment
## Participant:
- interfata prezentarea evenimentelor - timeline
- pagina descriere --> inscriere
- meniu utilizator (optional)

# Clase

## Eveniment
- nume: String
- stare: String (OPEN/CLOSED)
- dataDeschidere: datetime
- interval: int (>0 repr nr minute)
- codAccess: String
- listaParticipanti: Array(JSON(nume, dataInregistrare, etc))
- nrLocuriDisponibile: Integer

## GrupEvenimente
- Nume: String
- evenimente: Array(Eveniment)

## Participant
- Nume
- Prenume
- nrTelefon
- email
- dataNastere
- username
- parola
