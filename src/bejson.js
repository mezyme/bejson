/**
 * bejson.js
 * https://github.com/jeeinn/bejson
 *
 * Copyright © 2019 Jeeinn
 * Licensed under MIT
 * Created by xyw on 2019/8/19.
 */

;(function (window) {
    
    'use strict';
    
    /**
     *
     * @param str
     * @param debug
     * @returns {boolean}
     */
    function isJsonStrings(str, debug) {
        if (typeof str == 'string') {
            try {
                var obj = JSON.parse(str);
                if (typeof obj != 'object') {
                    if (debug) console.warn('bejson::JSON.parse fail, it should be object, but get type: ' + typeof obj + '!');
                    return false;
                }
                return !!(typeof obj == 'object' && obj);
            } catch (e) {
                if (debug) console.warn('bejson:: ' + str + ' (' + e + ')');
                return false;
            }
        }
        if (debug) console.warn('bejson::It is not a string!');
        return false;
    }
    
    /**
     *
     * @param json
     * @param options
     * @returns {string}
     */
    function formatJson(json, options) {
        var reg = null,
            formatted = '',
            pad = 0,
            PADDING = '    '; // one can also use '\t' or a different number of spaces
        // optional settings
        options = options || {};
        // remove newline where '{' or '[' follows ':'
        options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true);
        // use a space after a colon
        options.spaceAfterColon = (options.spaceAfterColon !== false);
        
        // begin formatting...
        
        // make sure we start with the JSON as a string
        if (typeof json !== 'string') {
            json = JSON.stringify(json);
        }
        // parse and stringify in order to remove extra whitespace
        json = JSON.parse(json);
        json = JSON.stringify(json);
        
        // add newline before and after curly braces
        reg = /([\{\}])/g;
        
        json = json.replace(reg, '\r\n$1\r\n');
        
        // add newline before and after square brackets
        reg = /([\[\]])/g;
        json = json.replace(reg, '\r\n$1\r\n');
        
        // add newline after comma
        reg = /(\,)/g;
        json = json.replace(reg, '$1\r\n');
        
        // remove multiple newlines
        reg = /(\r\n\r\n)/g;
        json = json.replace(reg, '\r\n');
        
        // remove newlines before commas
        reg = /\r\n\,/g;
        json = json.replace(reg, ',');
        
        // optional formatting...
        if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
            reg = /\:\r\n\{/g;
            json = json.replace(reg, ':{');
            reg = /\:\r\n\[/g;
            json = json.replace(reg, ':[');
        }
        if (options.spaceAfterColon) {
            reg = /\:/g;
            json = json.replace(reg, ': ');
        }
        (json.split('\r\n')).forEach(function (node, index) {
            //console.log(node);
            var i = 0,
                indent = 0,
                padding = '';
            
            if (node.match(/\{$/) || node.match(/\[$/)) {
                indent = 1;
            } else if (node.match(/\}/) || node.match(/\]/)) {
                if (pad !== 0) {
                    pad -= 1;
                }
            } else {
                indent = 0;
            }
            
            for (i = 0; i < pad; i++) {
                padding += PADDING;
            }
            
            formatted += padding + node + '\r\n';
            pad += indent;
        });
        
        return formatted;
    }
    
    /**
     *
     * @param strings
     * @param options
     * @returns {boolean|string}
     */
    function bejson(strings, options) {
        strings = strings || '';
        options = options || {debug: false};
        // return formatJson(strings);
        return (isJsonStrings(strings, options.debug) && formatJson(strings, options));
    }
    
    try {
        if (typeof (exports) !== 'undefined') {
            // 环境 nodejs env
            exports.bejson = bejson;
            exports.isJsonStrings = isJsonStrings;
            exports.formatJson = formatJson;
        } else {
            // 浏览器环境 browser env
            window.bejson = bejson;
            window.isJsonStrings = isJsonStrings;
            window.formatJson = formatJson;
        }
    } catch (e) {
        console.error(e);
    }
    
})(typeof window === 'object' ? window : this);

