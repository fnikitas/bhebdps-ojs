document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const itemsContainer = document.getElementById('items');
    const CACHE_DURATION = 10 * 60 * 1000; 

   
    function createCurrencyElement(valute) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        
        itemDiv.innerHTML = `
            <div class="item__code">${valute.CharCode}</div>
            <div class="item__value">${valute.Value.toFixed(2)}</div>
            <div class="item__currency">руб.</div>
        `;
        
        return itemDiv;
    }


    function updateUI(valutes) {
        itemsContainer.innerHTML = '';
        Object.values(valutes).forEach(valute => {
            itemsContainer.appendChild(createCurrencyElement(valute));
        });
    }


    function checkCache() {
        const cachedData = localStorage.getItem('currencyData');
        const cachedTime = localStorage.getItem('cacheTime');
        
        if (cachedData && cachedTime) {
            const currentTime = new Date().getTime();
            if (currentTime - cachedTime < CACHE_DURATION) {
                updateUI(JSON.parse(cachedData));
                return true;
            }
        }
        return false;
    }


    async function loadData() {
        try {
            loader.classList.add('loader_active');
            
            const response = await fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses');
            const data = await response.json();
            
            localStorage.setItem('currencyData', JSON.stringify(data.response.Valute));
            localStorage.setItem('cacheTime', new Date().getTime());
            
            updateUI(data.response.Valute);
        } catch (error) {
            console.error('Ошибка загрузки:', error);
        } finally {
            loader.classList.remove('loader_active');
        }
    }


    const hasValidCache = checkCache();
    loadData(); 
    

    if (!hasValidCache) loader.classList.add('loader_active');
});