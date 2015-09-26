angular.module("player").directive("spinner", function () {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "/app/spinner.html",
    };
});
