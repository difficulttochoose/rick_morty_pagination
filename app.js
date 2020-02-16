const createHTMLNode = (tag, attrs, inner) => {
    const element = document.createElement(tag);
    attrs.map(attr => { element.setAttribute(attr.name, attr.value.join(' ')) });
    inner ? element.innerHTML = inner : null;
    return element;
}
let url = `https://rickandmortyapi.com/api/character/?page=${1}`;

const foo = (url) => {
    axios
        .get(url)
        .then(res => {
            const page = res.data.info;
            let nextLink = page.next;
            let prevLink = page.prev;
            let next = createHTMLNode('a', [{ name: 'class', value: ['page-link'] }, { name: 'href', value: [`${nextLink}`] }], '»');
            let prev = createHTMLNode('a', [{ name: 'class', value: ['page-link'] }, { name: 'href', value: [`${prevLink}`] }], '«');
            let nextLi = createHTMLNode('li', [{ name: 'class', value: ['page-item'] }], null);
            let prevLi = createHTMLNode('li', [{ name: 'class', value: ['page-item'] }], null);
            let ul = createHTMLNode('ul', [{ name: 'class', value: ['pagination justify-content-center'] }], null);
            let nav = createHTMLNode('nav', [], null);
            nextLi.appendChild(next);
            prevLi.appendChild(prev);
            ul.appendChild(prevLi);
            ul.appendChild(nextLi);
            nav.appendChild(ul);
            next.addEventListener('click', (e) => {
                app.innerHTML = '';
                e.preventDefault();
                foo(nextLink);
            });
            prev.addEventListener('click', (e) => {
                app.innerHTML = '';
                e.preventDefault();
                foo(prevLink);
            });
            let result = [];
            for (let j = 0; j < res.data.results.length; j++) {
                result.push(res.data.results[j]);
            }
            const columns = {
                id: 'ID',
                name: 'Full Name',
                status: 'Status',
                species: 'Species',
                gender: 'Gender',
            };

            let tr = document.createElement('tr');

            for (key in columns) {
                let th = document.createElement('th');
                th.innerHTML = columns[key];
                tr.appendChild(th);
            }

            let thead = document.createElement('thead');
            thead.appendChild(tr);
            let table = document.createElement('table');
            table.appendChild(thead);

            let tbody = document.createElement('tbody');

            for (let i = 0; i < result.length; i++) {
                let tr2 = document.createElement('tr');
                for (key in columns) {
                    if (Object.keys(result[i])[key] === Object.keys(columns)[key]) {
                        let td = document.createElement('td');
                        td.innerHTML = result[i][key];
                        tr2.appendChild(td);
                    }
                }
                tbody.appendChild(tr2);
            }

            table.appendChild(tbody);

            let col = document.createElement('div');
            col.setAttribute('class', 'col-12');
            let row = document.createElement('div');
            row.setAttribute('class', 'row');
            let container = document.createElement('div');
            container.setAttribute('class', 'container');

            col.appendChild(table);
            row.appendChild(col);
            container.appendChild(row);

            const app = document.getElementById('app');
            document.getElementById('app').appendChild(container);
            document.getElementById('app').appendChild(nav);
        })
}
foo(url);