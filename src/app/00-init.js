let player = angular.module("player", [
    "templates",
    "ngAnimate",
    "ngSanitize",
]);

player.config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
});
