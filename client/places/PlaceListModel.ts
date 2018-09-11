import Observer from './Observer';

class PlaceListModel extends Observer {
    placeList: Array<any>;

    constructor() {
        super();
        this.placeList = [];
    }

    getFromServer(location) {
        getPlaces(location)
            .then(placeList => {
                this.placeList = placeList;
                this.trigger('loaded', placeList);
            })
            .catch(err => {
                console.log(err);
            });
    }
}

async function getPlaces(location) {
    const rawResponse = await fetch('/findplaces', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({location})
    });

    return await rawResponse.json();
}

export default PlaceListModel;