// Main application JavaScript
// Uses the unmanaged libraries from vendor-libs.js and chart-utils.js

// ========================================
// AngularJS 1.2.0 (VULNERABLE VERSION)
// ========================================
// Developer comment: "Using AngularJS for frontend, copied from tutorial"

/*! AngularJS v1.2.0 | (c) 2010-2013 Google, Inc. | angularjs.org */
var angular = (function() {
    'use strict';
    
    var angular = {
        version: {
            full: '1.2.0'
        }
    };
    
    // Vulnerable module system
    angular.module = function(name, requires) {
        return {
            controller: function(name, constructor) {
                // Vulnerable: No input sanitization
                window[name + 'Controller'] = constructor;
            },
            directive: function(name, factory) {
                // Vulnerable: Direct DOM manipulation without sanitization
                window[name + 'Directive'] = factory;
            }
        };
    };
    
    // Vulnerable $sanitize service (XSS risks)
    angular.sanitize = function(html) {
        // VULNERABLE: Incomplete sanitization
        return html.replace(/<script[^>]*>.*?<\/script>/gi, ''); // Incomplete, can be bypassed
    };
    
    return angular;
})();

// Application module
var app = angular.module('customerApp', []);

// Main controller using vulnerable libraries
app.controller('MainController', function($scope) {
    $scope.appName = 'Customer Web Application';
    $scope.users = [];
    $scope.chartData = null;
    
    // Load user data using jQuery (vulnerable version)
    $scope.loadData = function() {
        console.log('Loading data with jQuery ' + $.fn.jquery);
        
        // Simulate API call
        setTimeout(function() {
            $scope.users = [
                { id: 1, name: 'John Doe', lastLogin: '2024-01-15' },
                { id: 2, name: 'Jane Smith', lastLogin: '2024-01-14' },
                { id: 3, name: 'Bob Johnson', lastLogin: '2024-01-13' }
            ];
            
            // Use vulnerable Lodash to process data
            var processedUsers = _.map($scope.users, function(user) {
                return _.extend({}, user, { 
                    formattedDate: ChartUtils.formatDate(user.lastLogin),
                    displayName: ChartUtils.renderTemplate('User: {{name}}', user)
                });
            });
            
            $('#user-data').html('<pre>' + JSON.stringify(processedUsers, null, 2) + '</pre>');
        }, 500);
    };
    
    $scope.generateReport = function() {
        console.log('Generating report...');
        
        var reportTemplate = '<h3>Report for {{title}}</h3><p>Generated: {{date}}</p>';
        var reportData = {
            title: 'User Activity Report',
            date: ChartUtils.formatDate(new Date())
        };
        
        var reportHtml = ChartUtils.renderTemplate(reportTemplate, reportData);
        $('#charts').html(reportHtml); // Potential XSS if data is user-controlled
    };
    
    $scope.exportData = function() {
        console.log('Exporting data...');
        alert('Export functionality would use the vulnerable libraries to process data');
    };
});

// Initialize the application when DOM is ready
$(document).ready(function() {
    console.log('App initialized with vulnerable libraries:');
    console.log('- jQuery:', $.fn.jquery || '1.8.0');
    console.log('- Lodash:', _.VERSION || '2.0.0'); 
    console.log('- Moment:', moment.version || '2.0.0');
    console.log('- Handlebars:', Handlebars.VERSION || '1.0.0');
    console.log('- AngularJS:', angular.version.full || '1.2.0');
    
    // Bind button events
    $('#load-data').click(function() {
        angular.element(document.body).scope().loadData();
    });
    
    $('#generate-report').click(function() {
        angular.element(document.body).scope().generateReport();
    });
    
    $('#export-data').click(function() {
        angular.element(document.body).scope().exportData();
    });
    
    console.log('Application ready - but using vulnerable unmanaged libraries!');
});
