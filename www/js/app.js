// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
require('../lib/highcharts-ng/dist/highcharts-ng');

var app = angular.module('starter', ['ionic', 'highcharts-ng'])
  .controller('AppCtrl', ($scope) => {
    $scope.chartConfig = {
      options: {
        chart: {
            type: 'bar'
        }
      },
      series: [{
          data: [10, 15, 12, 8, 7]
      }],
      title: {
          text: 'Chart Title'
      },

      loading: false
    };
  })

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });
