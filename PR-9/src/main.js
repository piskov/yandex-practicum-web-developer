'use strict';
(async function () {
    const userModel = new UserModel();
    await userModel.loadProfile();
    const userVM = new UserViewModel(userModel);

    const placesRepoModel = new PlacesRepositoryModel();
    await placesRepoModel.loadPlaces();

    const plasesRepoVM = new PlacesRepositoryViewModel(placesRepoModel);
})();
