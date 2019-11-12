'use strict';

let PlacesRepositoryModel = (function () {
    /**
     * Describes a collection of places.
     */
    class PlacesRepositoryModel {
        constructor() {
            this.places = [];
        }

        /**
         * Adds a place to the collection.
         * @param {PlaceModel} place - New place.
         */
        addPlace(place) {
            this.places.push(place);
        }

        /**
         * Deletes a place from the collection.
         * @param {PlaceModel} place - Place to delete.
         */
        deletePlace(place) {
            this.places =
                this.places.filter(p => p._id !== place._id);
        }

        /**
         * Load places from the server.
         * @returns {Promise<void>} Operation to await
         */
        async loadPlaces() {
            await _api.loadPlaces()
                .then(data => {
                    this.places = _parsePlacesFromJson(data);
                })
                .catch(error => console.log(error));
        }
    }


    // # ------ Fields ------ #

    const _api = new Api();


    // # ------ Functions ------ #
    /**
     * Creates places from json.
     *
     * @param jsonData {[Object.<string, string, string]}
     * Collection of places names and links to photos.
     *
     * @returns {[PlaceModel]} - Parsed places.
     * @private
     */
    function _parsePlacesFromJson(jsonData) {
        const places = [];

        if (jsonData === undefined
            || jsonData.length === 0) {
            return places;
        }

        for (let item of jsonData) {
            const {name, link, _id} = item;
            places.push(new PlaceModel(name, link, _id));
        }

        return places;
    }


    return PlacesRepositoryModel;
})();
