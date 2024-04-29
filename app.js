// Pobieranie danych o kryptowalutach z API
const apiUrl = 'https://api.coincap.io/v2/assets';

async function fetchCryptoData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
        return [];
    }
}

// Tworzenie elementu dla pojedynczej kryptowaluty
function createCryptoItem(crypto) {
    const cryptoItem = document.createElement('div');
    cryptoItem.classList.add('crypto-item');

    const cryptoName = document.createElement('h3');
    cryptoName.textContent = `${crypto.name} (${crypto.symbol})`;
    cryptoItem.appendChild(cryptoName);

    const currentPrice = document.createElement('p');
    currentPrice.textContent = `Aktualna cena: $${parseFloat(crypto.priceUsd).toFixed(2)}`;
    cryptoItem.appendChild(currentPrice);

    const priceChange = document.createElement('p');
    priceChange.textContent = `Zmiana w ciągu 24h: ${parseFloat(crypto.changePercent24Hr).toFixed(2)}%`;
    cryptoItem.appendChild(priceChange);

    return cryptoItem;
}

// Wyświetlanie listy kryptowalut
function displayCryptoList(cryptoList) {
    const cryptoContainer = document.getElementById('crypto-list');
    while (cryptoContainer.firstChild) {
        cryptoContainer.removeChild(cryptoContainer.firstChild);
    }

    cryptoList.forEach(crypto => {
        const cryptoItem = createCryptoItem(crypto);
        cryptoContainer.appendChild(cryptoItem);
    });
}

// Odświeżanie danych o kryptowalutach po kliknięciu przycisku
document.getElementById('refresh-button').addEventListener('click', async () => {
    const cryptoData = await fetchCryptoData();
    displayCryptoList(cryptoData);
});

// Inicjalne pobranie danych
refreshCryptoData();
