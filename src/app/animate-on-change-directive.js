angular.module("player").directive("animateOnChange", function ($animate, $timeout) {
    return (scope, element, attr) => {
        scope.$watch(attr.animateOnChange, (newValue, oldValue) => {
            if (newValue === oldValue) {
                return;
            }
            $animate.addClass(element, "changed").then(() => {
                $timeout(() => $animate.removeClass(element, "changed"), 500);
            });
        });
    };
});
