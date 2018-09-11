import Observer from './Observer';

class SearchVue extends Observer {
    searchElem: HTMLElement;

    constructor(searchElem) {
        super();
        this.searchElem = searchElem;
    }

    render() {
        const parentElem = document.createElement('div');
        parentElem.innerHTML = `
            <div>
                Where are you?
            </div>
            <div>
                <input type="text">
            </div>
            <button>Current position</button>
            <button>Search</button>
            `;

        const location = parentElem.querySelector('input');
        // @ts-ignore
        const [getPos, search] = parentElem.querySelectorAll('button');

        getPos.addEventListener('click', () => {
            getCurrentPosition()
                .then(position => {
                    const coords = `${position.coords.latitude} ${position.coords.longitude}`;
                    location.value = coords;
                    this.trigger('search', coords);
                })
                .catch(err => {
                    console.log(err);
                });
        });

        search.addEventListener('click', () => {
            this.trigger('search', location.value);
        });

        this.searchElem.innerHTML = '';
        // @ts-ignore
        this.searchElem.append(parentElem);
    }
}

function getCurrentPosition(): Promise<Position> {
    if (navigator.geolocation) {
        // @ts-ignore
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    } else {
        throw new Error('geolocation is not supported');
    }
}

export default SearchVue;