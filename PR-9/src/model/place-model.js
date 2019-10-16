'use strict';

/**
 * Describes a card for a Place.
 */
class PlaceModel {
    /**
     * Inits a new place card.
     *
     * @param {string} name
     * Name of the place to be shown on the card.
     *
     * @param {string} link
     * Link to the place‘s photo to be shown as a card background.

     * @param {string} _id
     * Place id.
     */
    constructor({name, link, _id}) {
        this.name = name;
        this.link = link;
        this._id = _id;
    }
}
