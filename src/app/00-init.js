let player = angular.module("player", [
  "templates",
  "ngAnimate",
  "ngSanitize",
  "angular-preload-image",
]);

player.config(($locationProvider) => {
  $locationProvider.html5Mode(true);
});
