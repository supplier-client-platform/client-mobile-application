// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'rest-client', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'firebase', 'app.loginController', 'app.signupController', 'app.mainMenucontroller', 'app.offersController', 'app.indexController', 'app.myCartController', 'app.lastOrdersController', 'app.favouriteController', 'app.settingsController', 'app.supportController', 'app.forgotPasswordController', 'db-access', 'app.CheckoutController'])

    .config(function ($ionicConfigProvider) {
        //Added config
        //$ionicConfigProvider.views.maxCache(5);
        $ionicConfigProvider.scrolling.jsScrolling(false);
        $ionicConfigProvider.tabs.position('bottom'); // other values: top

        $ionicConfigProvider.backButton.text('').icon('ion-arrow-left-c').previousTitleText(false);
        $ionicConfigProvider.navBar.alignTitle('center');
    })
    .run(function ($ionicPlatform, $rootScope, $state, $dbService) {
        $rootScope.cartList = [];
        $rootScope.extras = false;

        $rootScope.$secondaryBtn = 'Cart';
        $rootScope.$navigate = function () {
            switch ($rootScope.$secondaryBtn) {
                case "Cart":
                    $state.go("myCart");
                    return;
                case "Checkout":
                    $state.go('checkout');
                    return;
                default:
                    return;
            }
        };

        $rootScope.$getClass = function (item) {
            switch (item) {
                case "Cart":
                    return "ion-android-cart";
                case "Checkout":
                    return "icon ion-arrow-right-c";
                default:
                    return "";
            }
        };

        $rootScope.$getText = function (item) {
            switch (item) {
                case "Cart":
                    return $rootScope.cartList.length;
                default:
                    return "";
            }
        };


        $ionicPlatform.ready(function () {
            // Initialize SQLite DB
            $rootScope.db = $dbService.openDataConnection();
            $rootScope.db.init(function () {
              // $rootScope.db.insertUser('lol','abcc',56,'loll').then(function(res){
              //   console.log("Lol data inserted!!");
              // });
              // $rootScope.db.getUserData().then(function(res){
              //   console.log("Lol data retrieved!!" + JSON.stringify(res));
              // });
            });

            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                //cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                console.log("came here");
                // org.apache.cordova.statusbar required
                //StatusBar.styleDefault();
                StatusBar.backgroundColorByHexString("#25263a");
                ionic.Platform.fullScreen(true, true);
            }
        });

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

            if (toState.name === "menu2") {
                $rootScope.$secondaryBtn = 'Cart';
            }
        });

    })
