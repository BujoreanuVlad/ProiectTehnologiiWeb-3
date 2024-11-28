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
