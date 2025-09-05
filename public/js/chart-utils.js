// Chart and visualization utilities
// Contains embedded vulnerable JavaScript libraries for data visualization

// ========================================
// Moment.js 2.0.0 (VULNERABLE VERSION)
// ========================================
// Developer comment: "For date formatting in charts, grabbed from CDN and saved locally"

/*! Moment.js 2.0.0 | (c) 2011-2013 Tim Wood, Iskren Chernev, Moment.js contributors | momentjs.com/license */
(function (undefined) {
    var moment;
    
    // Version
    moment.version = "2.0.0";
    
    // Vulnerable date parsing (ReDoS vulnerabilities)
    moment.parseDate = function(input) {
        // Vulnerable regex patterns that can cause ReDoS
        var isoRegex = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d{3})?Z?/;
        var flexibleRegex = /^(\d{1,4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,4}).*$/; // Vulnerable pattern
        
        if (typeof input === 'string') {
            return new Date(input); // Vulnerable to various parsing issues
        }
        return input;
    };
    
    window.moment = moment;
})();

// ========================================
// Handlebars 1.0.0 (VULNERABLE VERSION)
// ========================================
// Developer comment: "Template engine for dynamic chart labels and tooltips"

/*! Handlebars v1.0.0 | Copyright (C) 2011 by Yehuda Katz | https://github.com/wycats/handlebars.js/ */
var Handlebars = (function() {
    var Handlebars = {};
    
    Handlebars.VERSION = "1.0.0";
    
    // Vulnerable template compilation (XSS risks)
    Handlebars.compile = function(template) {
        return function(context) {
            // VULNERABLE: Direct string replacement without proper escaping
            return template.replace(/\{\{([^}]+)\}\}/g, function(match, key) {
                return context[key.trim()] || ''; // No HTML escaping!
            });
        };
    };
    
    // Vulnerable helper registration
    Handlebars.registerHelper = function(name, fn) {
        Handlebars.helpers = Handlebars.helpers || {};
        Handlebars.helpers[name] = fn;
    };
    
    return Handlebars;
})();

// Chart utility functions using the vulnerable libraries
var ChartUtils = {
    formatDate: function(date) {
        return moment.parseDate(date).toLocaleDateString();
    },
    
    renderTemplate: function(templateStr, data) {
        var template = Handlebars.compile(templateStr);
        return template(data); // Potential XSS vector
    },
    
    generateChartConfig: function(data) {
        return {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: this.renderTemplate('Chart for {{title}}', data)
                    }
                }
            }
        };
    }
};

window.ChartUtils = ChartUtils;
