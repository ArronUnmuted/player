let player = angular.module("player", [
    "templates",
    "ngAnimate",
    "ngSanitize",
]);

player.config(($locationProvider) => {
    $locationProvider.html5Mode(true);
});
