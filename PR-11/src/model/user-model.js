'use strict';

let UserModel = (function () {
    /**
     * Describes a user profile.
     */
    class UserModel {
        /**
         * Inis new user model.
         * @param {string} name - User’s name.
         * @param {string} about - User’s description.
         * @param {string} photoUrl - User’s avatar url.
         * @param {string} id - User’s id
         */
        constructor(name = '', about = '', photoUrl = '', id = '') {
            this.name = name;
            this.about = about;
            this.avatar = photoUrl;
            this._id = id;
        }

        /**
         * Loads user profile from the server.
         * @returns {Promise<void>} Awaitable object.
         */
        async loadProfile() {
            await _api.loadUser()
                .then(data => {
                    const {name, about, avatar, _id} = data;
                    this.name = name;
                    this.about = about;
                    this.avatar = avatar;
                    this._id = _id;
                })
                .catch(error => console.log(error));
        }

        /**
         * Saves user profile to the server.
         * @returns {Promise<void>} Awaitable object.
         */
        async saveProfile() {
            await _api.updateUser(this)
                .then(data => {
                    const {name, about, avatar, _id} = data;
                    this.name = name;
                    this.about = about;
                    this.avatar = avatar;
                    this._id = _id;
                })
                .catch(error => console.log(error));
        }
    }


    // # ------ Fields ------ #

    const _api = new Api();


    return UserModel;
})();
