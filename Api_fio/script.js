"use strict"
function getDynamicTime() {
    const now = new Date(); // Aktuální čas
    const from = new Date(now.getTime() - 48 * 60 * 60 * 1000); // 48 hodin zpět

    const formatDate = (date) =>
        date.toISOString().split('T')[0]; // Formát: rrrr-mm-dd

    return {
        timeNow: now.toISOString(), // Aktuální čas (ISO formát)
        timeFrom: formatDate(from), // Začátek intervalu (48 hodin zpět)
        timeTo: formatDate(now), // Konec intervalu (aktuální datum)
    };
}

// Funkce pro volání API
async function fetchTransactions() {
    const { timeFrom, timeTo } = getDynamicTime();

    // Token a URL pro volání FIO API
    const token = 'd5b16634-f384-4323-9515-3274c4ffd9e9'; // Nahraďte vaším skutečným API tokenem
    const url = `https://fioapi.fio.cz/v1/rest/periods/${token}/${timeFrom}/${timeTo}/transactions.json`;

    try {
        // Volání API pomocí fetch
        const response = await fetch(url);

        // Kontrola odpovědi
        if (!response.ok) {
            throw new Error(`HTTP chyba! Stav: ${response.status}`);
        }

        // Zpracování odpovědi jako JSON
        const data = await response.json();
        console.log('Úspěšně získaná data:', data);
    } catch (error) {
        console.error('Chyba při volání API:', error);
    }
}

// Nastavení opakovaného volání API každých 10 sekund
setInterval(fetchTransactions, 10 * 1000);