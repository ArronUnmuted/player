angular.module("player").directive("messageEvent", ($window, $scope) => {
  return {
    link(scope) {
      $window.addEventListener("message", ({ origin = "", data = {}} = {}) => {
        $scope.$apply(() => {
          if (!origin.includes("https://control.shoutca.st") && !origin.includes("http://localhost")) {
            return;
          }
          if (data.type === "reloadConfig") {
            return scope.$broadcast("message::" + data.type, data.config);
          }
          return scope.$broadcast("message::unknown", data);
        });
      });
    },
  };
});
