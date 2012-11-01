(function($, undefined){
	window.Validator = {};
	
	
	// list of all the regex
    // name => regex
	/*
    var regex = {
        alpha : "",
        numeric : /^[-]?\d+(\.\d+)?$/,
        digit : /^\d+$/,
        alphanumeric : /^[a-zA-Z0-9]+$/,
        alphadash : /^[a-zA-Z0-9-_]+$/,
        email : /^([a-zA-Z0-9_\.\-])+(\+[a-zA-Z0-9]+)*\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
        uszip : /^((\d{5}([- ])\d{4})|(\d{5})|([AaBbCcEeGgHhJjKkLlMmNnPpRrSsTtVvXxYy]\d[A-Za-z]\s?\d[A-Za-z]\d))$/,
        usstate : /^(A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[ANU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$/,
        usphone : /^([0-9]( |-|.)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-|.)?([0-9]{3}( |-|.)?[0-9]{4}|[a-zA-Z0-9]{7})$/,
        creditcard : /^((4\d{3})|(5[1-5]\d{2})|(6011))([- ])?\d{4}([- ])?\d{4}([- ])?\d{4}|3[4,7]\d{13}$/,
        ssn : /(^|\s)(00[1-9]|0[1-9]0|0[1-9][1-9]|[1-6]\d{2}|7[0-6]\d|77[0-2])(-?|[\. ])([1-9]0|0[1-9]|[1-9][1-9])\3(\d{3}[1-9]|[1-9]\d{3}|\d[1-9]\d{2}|\d{2}[1-9]\d)($|\s|[;:,!\.\?])/,
        url : "",
        ip : "",
        required : /.+/
    };
	*/
	
	
	
	/**
	 * List of all the Validations with
	 * - Rule
	 * - Error Message
	 */
	var validations = {
		required: {
			rule: function(f){
				return $(f).val().match(/[\s]+/);
			},
			message: "should contains alphabets only"
		},
		alpha: {
			rule: function(f){
				return $(f).val().match(/^[a-zA-z\s]+$/);
			},
			message: "should contains alphabets only"
		},
		numeric: {
			rule: function(f){
				return $(f).val().match(/^[-]?\d+(\.\d+)?$/);
			},
			message: "should contains numbers only"
		},
		digit: {
			rule: function(f){
				return $(f).val().match(/^\d+$/);
			},
			message: "should contains positive numbers only"
		},
		alphanumeric: {
			rule: function(f){
				return $(f).val().match(/^[a-zA-Z0-9]+$/);
			},
			message: "should contains alphabets or numbers only"
		},
		email: {
			rule: function(f){
				return $(f).val().match(/^([a-zA-Z0-9_\.\-])+(\+[a-zA-Z0-9]+)*\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);
			},
			message: "not a valid email address"
		},
		uszip: {
			rule: function(f){
				return $(f).val().match(/^(\d{5}\-?(\d{4})? )$/);
			},
			message: "not a valid zipcode"
		}
	};
	
	
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
	 * Validate method
	 * 
	 * loop thru all the fields that have name attribute
	 */
	Validator.validate = function(form){
		form.find("[name]").each(function(i, field){
			
			var rules_to_apply = $(field).attr("data-validate").split("|");
			
			$.each(rules_to_apply, function(j, rule){
				rule = $.trim(rule);
				
				if(validations.hasOwnProperty (rule) ){
				
					if( ! validations[rule].rule(field) ){
						console.log($(field).attr("name") +" failed: "+ rule);
					}
					
				}
			});			
			
		});
	};
	
	
	/**
	 * Return TRUE/FALSE whether Validation has passed or not
	 */
	Validator.passed = function(){
		return errors.length == 0;
	};
	
	
	/**
	 * Return TRUE/FALSE whether Validation has failed or not
	 */
	Validator.failed = function(){
		return errors.length != 0;
	};
	
    
    /**
     * Return an array containing Errors
     */
    Validator.errors = function(){
        return errors;
    };
    
<<<<<<< HEAD
    
    
    // go thru all the input fields, select boxes and textareas
    // and look for validation attributes.
    // test them against required regex
    // store error messages in a global array
    // return true or false
    validator.isValid = function(form){
        errors = [];
        var fieldsToValidate = form.find("[data-validate]");
        
        $.each(fieldsToValidate, function(i, field){
            
            var toValidate = $(field).attr("data-validate").split(" "),
                fieldName = $(field).attr("name");

            validate({
                field : field,
                fieldName: fieldName,
                toValidate : toValidate
            });
        });
        
        return errors.length > 0 ? false : true;
        
    };
    
=======
>>>>>>> Refactored the code
})(jQuery);