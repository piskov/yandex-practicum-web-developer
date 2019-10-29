'use strict';

let Api = (function() {
    const BASE_ADDRESS = 'http://95.216.175.5/cohort4/';
    const TOKEN = '19bcc368-2a42-4cba-9b95-1679ba097992';

    class Api {
        loadUser() {
            return fetch(`${BASE_ADDRESS}users/me`, _createRequestParams())
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }

                    return Promise.reject(`Error getting user data: ${response.status}, ${response.statusText}`);
                })
        }

        updateUser(user) {
            const request = _createRequestParams('PATCH');
            request.body = JSON.stringify(user);

            return fetch(`${BASE_ADDRESS}users/me`, request)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }

                    return Promise.reject(`Error updating user data: ${response.status}, ${response.statusText}`);
                })
        }

        loadPlaces() {
            return fetch(`${BASE_ADDRESS}cards`, _createRequestParams())
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }

                    return Promise.reject(`Error getting user data: ${response.status}, ${response.statusText}`);
                })
        }
    }

    /**
     * Builds fetch request object.
     * @param {string} method - Request method type.
     * @returns {{headers: {authorization: *}, method: *}}
     */
    function _createRequestParams(method = 'GET') {
        return {
            method,
            headers: {
                authorization: TOKEN,
                'Content-Type': 'application/json'
            }
        }
    }

    return Api;
})();
