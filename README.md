#Validation
---
Javascript Validation Library inspired by Laravel.

*Depends on jQuery*

#####How to use it?
Add a custom attribute called data-validate to all form fields.
Set rules to apply as value of the attribute (multiple rules separated by Pipe).
		
		<input type="text" name="email" data-validate="required|email" />
		<input type="text" name="webpage" data-validate="url" />
		<input type="text" name="phone" data-validate="required|usphone" />

####Public Methods

1. Running Validation

		Validation.run( <form object> );
		
2. Checking if Validation passed or failed

		Validation.passed() // returns TRUE / FALSE
		
		OR
		
		Validation.failed() // returns TRUE / FALSE
		
3. Registering a new Validation Rule

		Validation.register("jk", function(f){
			return false;
		}, "{name} is just kidding with {val}");
		
		Arguments:
		1. Name of the Rule.
		2. Function that will test (should return Boolean value)
		3. Message on error
		
		Message can contain special keywords
		- {name} will be replaced by name of the field
		- {val} will be replace by the value of the field