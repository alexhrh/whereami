import SearchVue from './SearchVue';
import PlaceListModel from './PlaceListModel';
import PlaceListVue from './PlaceListVue';

class PlacesController {
    searchVue: SearchVue;
    placeListModel: PlaceListModel;
    placeListVue: PlaceListVue;

    constructor(searchElem, resultsElem) {

        this.searchVue = new SearchVue(searchElem);
        this.placeListModel = new PlaceListModel();
        this.placeListVue = new PlaceListVue(resultsElem);


        this.searchVue.on('search', location => {
            this.placeListModel.getFromServer(location);
        });

        this.placeListModel.on('loaded', placeList => {
            this.placeListVue.render(placeList);
        });


        this.searchVue.render();
    }
}

export default PlacesController;