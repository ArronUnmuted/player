angular.module("player").factory("ConfigService", ($http, $q) => {
  let ConfigService = {
    getConfig(username) {
      if (!username) {
        return $q.reject();
      }
      return $http
        .get("https://itframe.innovatete.ch/player/" + username)
        .then(response => response.data);
    },
  };

  return ConfigService;
});
