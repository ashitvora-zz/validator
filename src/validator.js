var validator = {};

(function($, undefined){
    
    // list of all the regex
    // name => regex
    var regex = {
        alpha : /^[a-zA-z\s]+$/,
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
    
    
    var validate = function(config){
        var field = config.field,
            name = config.fieldName;
            
            
        $.each(config.toValidate, function(i, rule){
            
            if(! regex[rule].test( $(field).val() ) ){
                //console.error(name +" is not "+ rule);
                errors.push(name +" is not "+ rule);
            }            
            
        });
          
    };
    
    
    
    // stores list of errors
    var errors = [];
    
    
    // returns list of all the errors
    validator.errors = function(){
        return errors;
    };
    
    
    
    // go thru all the input fields, select boxes and textareas
    // and look for validation attributes.
    // test them against required regex
    // store error messages in a global array
    // return true or false
    validator.isValid = function(form){
        errors = [];
        var fieldsToValidate = form.find("input, select");
        
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
    
})(jQuery);