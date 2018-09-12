import Observer from '../helpers/Observer';
import BrowserTools from '../helpers/BrowserTools';

export default class SearchView extends Observer {
    parrentElem: HTMLElement;

    constructor() {
        super();
        this.parrentElem = document.querySelector('#google-map .search');
    }

    render() {
        const div = document.createElement('div');
        div.innerHTML = `
            <div>
                What are you looking for?
            </div>
            <div>
                <input type="text">
            </div>
            <div>
                How far to look? (in meters)
            </div>
            <div>
                <input type="text">
            </div>
            <div>
                Where are you?
            </div>
            <div>
                <input type="text">
            </div>
            <button>Current position</button>
            <button>Search</button>
            `;

        const [query, radius, location] = div.querySelectorAll('input');
        const [getPos, search] = div.querySelectorAll('button');

        getPos.addEventListener('click', () => {
            BrowserTools.getCurrentPosition()
                .then(position => {
                    const coords = `${position.coords.latitude} ${position.coords.longitude}`;
                    location.value = coords;
                    this.trigger('search', getSearchParams());
                })
                .catch(err => {
                    console.log(err);
                });
        });

        search.addEventListener('click', () => {
            this.trigger('search', getSearchParams());
        });

        this.parrentElem.innerHTML = '';
        this.parrentElem.appendChild(div);

        function getSearchParams() {
            return ({
                query: query.value,
                radius: radius.value,
                location: location.value
            });
        }
    }
}