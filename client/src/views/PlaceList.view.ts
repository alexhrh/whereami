import PlaceView from './Place.view';

export default class PlaceListView {
    parentElem: HTMLElement;
    table: HTMLElement;
    tbody: HTMLElement;
    rendered: boolean;

    constructor() {
        this.parentElem = document.querySelector('#google-map .places');
        this.rendered = false;
    }

    render(placeList) {
        if (!this.rendered) {
            this.table = document.createElement('table');
            this.table.innerHTML = `
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Distance</th>
                    </tr>
                </tbody>`;

            this.tbody = this.table.querySelector('tbody');
            this.parentElem.innerHTML = '';
            this.parentElem.appendChild(this.table);
            this.rendered = true;
        }

        this.update(placeList);
    }

    update(placeList) {
        this.tbody.innerHTML = '';

        placeList.forEach(place => {
            const placeView = new PlaceView(this.tbody);
            placeView.render(place);
        });
    }
}