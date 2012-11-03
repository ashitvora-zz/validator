(function($, undefined){
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
	var generate_error_message = function(field, message, params){

		message = message.replace( "{name}", $(field).attr("name") )
					  	 .replace( "{val}", $(field).val() );

		$.each(params, function(i, param){
			message = message.replace("{param"+ (i+1) +"}", param);
		});

		return message;
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
			message: "{name} should contains alphabets only"
		},
		numeric: {
			rule: function(f){
				return $(f).val().match(/^[-]?\d+(\.\d+)?$/);
			},
			message: "{name} should contains numbers only"
		},
		digit: {
			rule: function(f){
				return $(f).val().match(/^\d+$/);
			},
			message: "{name} should contains positive numbers only"
		},
		alphanumeric: {
			rule: function(f){
				return $(f).val().match(/^[a-zA-Z0-9]+$/);
			},
			message: "{name} should contains alphabets or numbers only"
		},
		email: {
			rule: function(f){
				return $(f).val().match(/^([a-zA-Z0-9_\.\-])+(\+[a-zA-Z0-9]+)*\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);
			},
			message: "{val} is not a valid email address"
		},
		uszip: {
			rule: function(f){
				return $(f).val().match(/^(\d{5}\-?(\d{4})?)$/);
			},
			message: "{val} is not a valid zipcode"
		},
		usphone: {
			rule: function(f){
				return $(f).val().match(/^([0-9]( |-|.)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-|.)?([0-9]{3}( |-|.)?[0-9]{4}|[a-zA-Z0-9]{7})$/);
			},
			message: "{val} is not a valid phone number"
		},
		creditcard: {
			rule: function(f){
				return $(f).val().match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/);
			},
			message: "{val} is not a valid credit card number"
		},
		ssn: {
			rule: function(f){
				return $(f).val().match(/(^|\s)(00[1-9]|0[1-9]0|0[1-9][1-9]|[1-6]\d{2}|7[0-6]\d|77[0-2])(-?|[\. ])([1-9]0|0[1-9]|[1-9][1-9])\3(\d{3}[1-9]|[1-9]\d{3}|\d[1-9]\d{2}|\d{2}[1-9]\d)($|\s|[;:,!\.\?])/);
			},
			message: "{val} is not a valid social security number"
		},
		alpha_dash: {
			rule: function(f){
				return $(f).val().match(/^([-a-z0-9_-])+$/);
			},
			message: "{name} must contain only letters, numbers, dashes or underscore characters."
		},
		size: {
			rule: function(f, params){
				return $(f).val().length == params[0];
			},
			message: "{name} must be exactly {param1} characters long."
		},
		between: {
			rule: function(f, params){
				value = $(f).val();

				if( isNaN(value) ){
					return value.length > params[0] && value.length < params[1];
				}
				else{
					return value > params[0] && value < params[1];
				}
			},
			message: "{name} must be between {param1} and {param2}."
		},
		min: {
			rule: function(f, params){
				value = $(f).val();

				if( isNaN(value) ){
					return value.length >= parseInt(params[0]);
				}
				else{
					return parseInt(value) >= parseInt(params[0]);
				}
			},
			message: "{name} must be minimum {param1}."
		},
		max: {
			rule: function(f, params){
				value = $(f).val();

				if( isNaN(value) ){
					return value.length <= parseInt(params[0]);
				}
				else{
					return parseInt(value) <= parseInt(params[0]);
				}
			},
			message: "{name} should not be more than {param1}."
		},
		url: {
			rule: function(f){
				return $(f).val().match(/^\b(https?|ftp|file):\/\/[-A-Za-z0-9+&@#\/%?=~_|!:,.;]*[-A-Za-z0-9+&@#\/%=~_|]/);
			},
			message: "{val} is not a valid URL"
		},
		ipaddress: {
			rule: function(f){
				return $(f).val().match(/^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$/);
			},
			message: "{val} is not a valid IP address"
		},
		image: {
			rule: function(f){
				return $(f).val().match(/(.*?)\.(jpg|jpeg|png|gif|bmp)$/i);
			},
			message: "{val} is not an image."
		}

	};
	
	
	/**
	 * Register new Validation
	 * 
	 * -----------------------------------------
	 * 	Validation.register("jk", function(f){
	 * 		return false;
	 * 	}, "{name} is just kidding with {val}");
	 * -----------------------------------------
	 */
	Validation.register = function(name, rule, message){
		if(! validations.hasOwnProperty(name) ){
			validations[name] = {
				rule: rule,
				message: message
			};
		}
	};


	/**
	 * Validate method
	 * 
	 * loop thru all the fields that have name attribute
	 */
	Validation.run = function(form){
		// empty errors array
		errors = [];
		
		form.find("[name]").each(function(i, field){
			
			var validations_to_test = $(field).attr("data-validate").split("|");
			
			$.each(validations_to_test, function(j, v){
				// required, email, size[5], between[1,10]
				v_params = $.trim(v).toLowerCase().split("[");

				v = v_params[0];

				if(v_params.length > 1){
					params = v_params[1].replace("]", "").split(",");
				}
				else{
					params = [];
				}
				
				if(validations.hasOwnProperty (v) ){
					if(! validations[v].rule(field, params) ){
						errors.push( generate_error_message( field, validations[v].message, params) );
					}
				}
			});			
			
		});
	};
	
	
	/**
	 * Return TRUE/FALSE whether Validation has passed or not
	 */
	Validation.passed = function(){
		return errors.length == 0;
	};
	
	
	/**
	 * Return TRUE/FALSE whether Validation has failed or not
	 */
	Validation.failed = function(){
		return errors.length != 0;
	};
	
    
    /**
     * Return an array containing Errors
     */
    Validation.errors = function(){
        return errors;
    };
})(jQuery);