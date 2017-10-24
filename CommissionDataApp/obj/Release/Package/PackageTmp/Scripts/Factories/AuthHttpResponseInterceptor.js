var AuthHttpResponseInterceptor = function ($q, $location, $templateCache) {
    return {
        request: function (config) {

            var baseUrl = $("base").first().attr("href");
            if (!$templateCache.get(config.url)) {
                config.url = baseUrl != undefined ? baseUrl + config.url : '' + config.url;
            }
            return config || $q.when(config);
        },
        response: function (response) {
            if (response.status === 401) {
                console.log("Response 401");
            }
            return response || $q.when(response);
        },
        responseError: function (rejection) {
            if (rejection.status === 401) {
                console.log("Response Error 401", rejection);
                $location.path('/login').search('returnUrl', $location.path());
            }
            return $q.reject(rejection);
        }
    }
}

AuthHttpResponseInterceptor.$inject = ['$q', '$location', '$templateCache'];