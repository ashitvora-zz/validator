/*!
 * Validation Library
 *
 * Depends on jQuery (Tested on jQuery 1.8.2)
 *
 * Released under the MIT license
 *
 * Author: Ashit Vora (ashit.vora @ alfanso . com)
 */

(function($, undefined){
	"use strict";
	
	window.Validation = {};
	
	/**
	 * Errors
	 *
	 * Array containing array of errors.
	 * Each error has
	 * - Error Message
	 * - Field on which error occured
	 */
	var errors = [];


	/**
	 * Generate error message
	 */
	var generate_error_message = function(field, message){
		return message.replace( "{name}", $(field).attr("name") )
		              .replace( "{val}", $(field).val() );
	};
	
	
	/**
	 * List of all the Validations with
	 * - Rule
	 * - Error Message
	 */
	var validations = {
		required: {
			rule: function(f){
				return $(f).val().match(/[\S]+/);
			},
			message: "{name} can not be blank"
		},
		alpha: {
			rule: function(f){
				return $(f).val().match(/^[a-zA-z\s]+$/);
			},
			message: "{name} should contain letters and spaces only"
		},
		numeric: {
			rule: function(f){
				return $(f).val().match(/^[-]?\d+(\.\d+)?$/);
			},
			message: "{name} should contain numbers only"
		},
		digit: {
			rule: function(f){
				return $(f).val().match(/^\d+$/);
			},
			message: "{name} should contain digits only"
		},
		alphanumeric: {
			rule: function(f){
				return $(f).val().match(/^[a-zA-Z0-9]+$/);
			},
			message: "{name} should contain letters and numbers only"
		},
		email: {
			rule: function(f){
				return $(f).val().match(/^([a-zA-Z0-9_\.\-])+(\+[a-zA-Z0-9]+)*\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);
			},
			message: "{val} is not a valid email address"
		},
		uszip: {
			rule: function(f){
				return $(f).val().match(/^(\d{5}\-?(\d{4})? )$/);
			},
			message: "{val} is not a valid US zipcode"
		},
		usphone: {
			rule: function(f){
				return $(f).val().match(/^([0-9]( |-|.)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-|.)?([0-9]{3}( |-|.)?[0-9]{4}|[a-zA-Z0-9]{7})$/);
			},
			message: "{val} is not a valid US phone number"
		},
		creditcard: {
			rule: function(f){
				return $(f).val().match(/^((4\d{3})|(5[1-5]\d{2})|(6011))([- ])?\d{4}([- ])?\d{4}([- ])?\d{4}|3[4,7]\d{13}$/);
			},
			message: "{val} is not a valid credit card number"
		},
		ssn: {
			rule: function(f){
				return $(f).val().match(/(^|\s)(00[1-9]|0[1-9]0|0[1-9][1-9]|[1-6]\d{2}|7[0-6]\d|77[0-2])(-?|[\. ])([1-9]0|0[1-9]|[1-9][1-9])\3(\d{3}[1-9]|[1-9]\d{3}|\d[1-9]\d{2}|\d{2}[1-9]\d)($|\s|[;:,!\.\?])/);
			},
			message: "{val} is not a valid US social security number"
		}
	};
	
	
	/**
	 * Register Validation
	 *
	 * -----------------------------------------
	 * Validation.register("jk", function(f){
	 *     return false;
	 * }, "{name} is just kidding with {val}");
	 * -----------------------------------------
	 */
	Validation.register = function(name, rule, message){
		validations[name] = {
			rule: rule,
			message: message
		};
	};


	/**
	 * Update message method
	 *
	 * Update the error message of an existing rule
	 */
	Validation.update_message = function(name, message){
		if( validations.hasOwnProperty(name) ){
			validations[name].message = message;
		}
	};


	/**
	 * Validate method
	 *
	 * loop thru all the fields that have the data-validate attribute
	 */
	Validation.run = function(form){
		// empty errors array
		errors = [];
		
		form.find("[data-validate]").each(function(i, field){
			
			var validations_to_test = $(field).attr("data-validate").split("|");
			
			$.each(validations_to_test, function(j, v){
				v = $.trim(v).toLowerCase();
				
				if(validations.hasOwnProperty (v) ){
					if(! validations[v].rule(field) ){
						errors.push( generate_error_message( field, validations[v].message) );
					}
				}
			});
			
		});
	};
	
	
	/**
	 * Return TRUE/FALSE whether Validation has passed or not
	 */
	Validation.passed = function(){
		return errors.length === 0;
	};
	
	
	/**
	 * Return TRUE/FALSE whether Validation has failed or not
	 */
	Validation.failed = function(){
		return errors.length > 0;
	};
	
    
	/**
	 * Return an array containing Errors
	 */
	Validation.errors = function(){
		return errors;
	};
})(jQuery);