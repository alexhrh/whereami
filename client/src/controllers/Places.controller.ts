import SearchView from '../views/Search.view';
import PlaceListView from '../views/PlaceList.view';
import PlacesService from '../server_access/Places.service';

export default class PlacesController {
    searchView: SearchView;
    placeListView: PlaceListView;

    constructor() {

        this.searchView = new SearchView();
        this.placeListView = new PlaceListView();
        this.searchView.render();

        this.searchView.on('search', params => {
            PlacesService.getPlaces(params)
                .then(placeList => {
                    this.placeListView.render(placeList);
                })
                .catch(err => {
                    console.log(err);
                });
        });
    }
}