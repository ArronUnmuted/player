export default /*@ngInject*/ () => {
  return {
    restrict: "E",
    replace: true,
    template: require("./spinner.html"),
  };
};
