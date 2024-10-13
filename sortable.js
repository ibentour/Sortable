let allHeroes = [];
let filteredHeroes = [];
let currentPage = 1;
let pageSize = 20;
let currentSort = { column: 'name', direction: 'asc' };

const loadData = (heroes) => {
    allHeroes = heroes;
    filteredHeroes = [...allHeroes];
    sortHeroes('name', 'asc');
    renderTable();
};

const renderTable = () => {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    const start = (currentPage - 1) * pageSize;
    const end = pageSize === 'all' ? filteredHeroes.length : start + parseInt(pageSize);
    const displayedHeroes = filteredHeroes.slice(start, end);

    displayedHeroes.forEach((hero, index) => {
        const row = document.createElement('tr');
        row.classList.add('fade-in');
        row.style.animationDelay = `${index * 0.05}s`;

        row.innerHTML = `
        <td><img src="${hero.images.xs}" alt="${hero.name}" onerror="this.src='placeholder.jpg'"></td>
        <td>${hero.name}</td>
        <td>${hero.biography.fullName || ''}</td>
        <td>
            <div class="powerstats">
                <span class="powerstat">Intelligence: ${hero.powerstats.intelligence}</span>
                <span class="powerstat">Strength: ${hero.powerstats.strength}</span>
                <span class="powerstat">Speed: ${hero.powerstats.speed}</span>
                <span class="powerstat">Durability: ${hero.powerstats.durability}</span>
                <span class="powerstat">Power: ${hero.powerstats.power}</span>
                <span class="powerstat">Combat: ${hero.powerstats.combat}</span>
            </div>
        </td>
        <td>${hero.appearance.race || ''}</td>
        <td>${hero.appearance.gender || ''}</td>
        <td>${hero.appearance.height ? hero.appearance.height.join(", ") : ''}</td>
        <td>${hero.appearance.weight ? hero.appearance.weight.join(", ") : ''}</td>
        <td>${hero.biography.placeOfBirth || ''}</td>
        <td>${hero.biography.alignment || ''}</td>
    `;
    tableBody.appendChild(row);
});
    renderPagination();
};


const renderPagination = () => {
    const paginationDiv = document.getElementById('pagination');
    paginationDiv.innerHTML = '';

    if (pageSize === 'all') return;

    const totalPages = Math.ceil(filteredHeroes.length / pageSize);
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.classList.toggle('active', i === currentPage);
        button.addEventListener('click', () => {
            currentPage = i;
            renderTable();
        });
        paginationDiv.appendChild(button);
    }
};

const searchHeroes = () => {
    const searchInput = document.getElementById('search');
    const filter = searchInput.value.toLowerCase();
    
    if (filter === '') {
        filteredHeroes = [...allHeroes];
    } else {
        filteredHeroes = allHeroes.filter(hero => 
            hero.name.toLowerCase().startsWith(filter) ||
            hero.name.toLowerCase().includes(filter)
        );
    }
    
    currentPage = 1;
    sortHeroes(currentSort.column, currentSort.direction);
    renderTable();
};

const calculateTotalPowerstats = (hero) => {
    return Object.values(hero.powerstats).reduce((total, stat) => total + (parseInt(stat) || 0), 0);
};

const convertWeight = (weight) => {
    if (!weight || weight.length === 0) return 0;
    const value = parseFloat(weight[1]);
    if (isNaN(value)) return 0;
    return weight[1].includes("tons") ? value * 1000 : value;
};

const convertHeight = (height) => {
    if (!height || height.length === 0) return 0;
    const value = parseFloat(height[1]);
    if (isNaN(value)) return 0;
    return height[1].includes("meters") ? value * 100 : value;
};


const sortHeroes = (column, direction) => {
    const getValue = (hero, column) => {
        switch (column) {
            case 'name': return hero.name;
            case 'fullName': return hero.biography.fullName;
            case 'powerstats': 
                return calculateTotalPowerstats(hero);
            case 'race': return hero.appearance.race;
            case 'gender': return hero.appearance.gender;
            case 'height': return convertHeight(hero.appearance.height);
            case 'weight': return convertWeight(hero.appearance.weight);
            case 'placeOfBirth': return hero.biography.placeOfBirth;
            case 'alignment': return hero.biography.alignment;
            default: return '';
        }
    };

    filteredHeroes.sort((a, b) => {
        let aValue = getValue(a, column);
        let bValue = getValue(b, column);

        // Special handling for placeOfBirth
        if (column === 'placeOfBirth' || column === 'gender' || column === 'alignment') {
            aValue = aValue === '-' ? '' : aValue;
            bValue = bValue === '-' ? '' : bValue;
            
            aValue = aValue.replace(/^\(/, '');
            bValue = bValue.replace(/^\(/, '');
        }
        

        if (aValue === '' || aValue === null || aValue === undefined) return 1;
        if (bValue === '' || bValue === null || bValue === undefined) return -1;

        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return direction === 'asc' ? aValue - bValue : bValue - aValue;
        } else {
            return direction === 'asc'
                ? aValue.toString().localeCompare(bValue.toString())
                : bValue.toString().localeCompare(aValue.toString());
        }
    });

    currentSort = { column, direction };
};

document.getElementById('search').addEventListener('input', searchHeroes);
document.getElementById('pageSize').addEventListener('change', (e) => {
    pageSize = e.target.value;
    currentPage = 1;
    renderTable();
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('th[data-column]').forEach(th => {
        th.addEventListener('click', () => {
            const column = th.dataset.column;
            const newDirection = currentSort.column === column && currentSort.direction === 'asc' ? 'desc' : 'asc';
            sortHeroes(column, newDirection);
            renderTable();
        });
    });
});

fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json')
    .then((response) => response.json())
    .then(loadData)
    .catch((error) => {
        console.error('Error fetching data:', error);
        document.getElementById('tableBody').innerHTML = '<tr><td colspan="10">Error loading data. Please try again later.</td></tr>';
    });