angular.module("player").factory("ConfigService", ($http) => {
    let ConfigService = {
        getConfig(username) {
            return $http
                .get("https://itframe.innovatete.ch/player/" + username)
                .then(response => response.data);
        },
    };

    return ConfigService;
});
