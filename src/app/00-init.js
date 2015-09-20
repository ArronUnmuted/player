let player = angular.module("player", [
    "ngAnimate",
    "ngSanitize",
]);

player.config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
});
