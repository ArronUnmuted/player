angular.module("player").directive("spinner", () => {
    return {
        restrict: "E",
        replace: true,
        templateUrl: "/app/spinner.html",
    };
});
