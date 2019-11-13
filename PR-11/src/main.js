import "../pages/index.css";

import { PlacesRepositoryModel } from './model/places-repository-model.js';
import { PlacesRepositoryViewModel } from './view-model/places-repository-view-model.js';
import { UserModel } from './model/user-model.js';
import { UserViewModel } from './view-model/user-view-model.js';

(async function () {
    const userModel = new UserModel();
    await userModel.loadProfile();
    const userVM = new UserViewModel(userModel);

    const placesRepoModel = new PlacesRepositoryModel();
    await placesRepoModel.loadPlaces();

    const plasesRepoVM = new PlacesRepositoryViewModel(placesRepoModel);
})();
