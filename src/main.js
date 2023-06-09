// Fetch the items from the JSON file
function loadItems() {
    return fetch('data/data.json')
        // response object에 있는 json이라는 api를 이용해서 response body를 json의 object로 변환
        .then(response => response.json())
        .then(json => json.items);
}

// Update the list with the given items(visible로 대체)
function displayItems(items) {
    const container = document.querySelector('.items');
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

// Cteate HTMl list item from the given
function createHTMLString(item) {
    return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
        <span class="item__description">${item.gender}, ${item.size}</span>
    </li>
    `;
}

function createElement(item) {
    const img = document.createElement('img');
    img.setAttribute('class', 'item__thumbnail');
    img.setAttribute('src', item.image);
    img.setAttribute('alt', item.type);

    const span = document.createElement('span');
    span.setAttribute('class', 'item__description');
    span.innerText = `${item.gender}, ${item.size}`;

    const li = document.createElement('li');
    li.setAttribute('class', 'item');
    li.setAttribute('data-type', item.type);
    li.setAttribute('data-color', item.color);
    li.append(img);
    li.append(span);
    return li;
}

// 필터링 
function onButtonClick(event, items) {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;
    if (key == null || value == null) {
        return;
    }

    // displayItems(items.filter(item => item[key] === value));
    visibleItems(items, key, value);
}
// 로고 버튼 눌렀을 때 전체 리스트
function onLogoClick(event, items) {
    items.forEach(c => {
        c.classList.remove('invisible');
    });
}

function visibleItems(items, key, value) {
    items.forEach(item => {
        if (item.dataset[key] === value) {
            item.classList.remove('invisible');
        } else {
            item.classList.add('invisible');
        }
    });
}

function setEventListeners(items) {
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.clickbox');
    logo.addEventListener('click', () => displayItems(items));
    buttons.addEventListener('click', event => onButtonClick(event, items));
}

// main
loadItems()
    .then(items => { // 받아 온 함수를 items를 함수에 전달
        // displayItems(items);
        // setEventListeners(items); 받아 온 items를 이용하여 버튼 클릭 시 필터링하기 위해 적절한 이벤트리스너 작성
        const elements = items.map(createElement);
        const container = document.querySelector('.items');
        container.append(...elements);

        const logo = document.querySelector('.logo');
        logo.addEventListener('click', event => onLogoClick(event, elements));

        const buttons = document.querySelector('.clickbox');
        buttons.addEventListener('click', event => onButtonClick(event, elements));

    })
    .catch(console.log);