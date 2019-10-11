'use strict';

/**
 * Describes a collection of cards.
 */
class CardList {
    /**
     * Inits a new card list.
     * @param {Element} container - DOM container for cards.
     */
    constructor(container) {
        this.cardsContainer = container;
    }

    /**
     * Adds card to the container.
     * @param {Card} card - Card to be added to the container.
     */
    addCard(card) {
        this.cardsContainer.append(card.cardElement)
    }

    /**
     * Creates cards from json and adds them to the container.
     *
     * @param jsonData {[Object.<string, string>]}
     * Collection of places names and links to photos.
     *
     * @param {ImagePopup} imagePopup
     * Popup to show card’s big photo in.
     */
    addCardsFromJson(jsonData, imagePopup) {
        if (jsonData === undefined
            || jsonData.length === 0) {
            return;
        }

        for (let item of jsonData) {
            this.addCard(new Card(item.name, item.link, imagePopup));
        }
    }
}
