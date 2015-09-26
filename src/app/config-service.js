angular.module("player").factory("ConfigService", function ($http) {
    let ConfigService = {
        getConfig(username) {
            return $http
                .get("https://itframe.innovatete.ch/player/" + username)
                .then(function (response) {
                    return response.data;
                });
        },
    };

    return ConfigService;
});
