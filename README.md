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
		- {val} will be replaced by the value of the field
		- {param1} will be replaced by first parameter, 
		  {param2} will be replaced by second paratmer and so on…
		  
		  In size[1], 1 is first argument
		  In between[4,10], 1 is first argument, 10 is second argument.
		
4. Get list of input fields with their error messages
		
		Validation.field_errors()
		
		Returns
		{
			"name": [
				"Name is required field"
			],
			"password" [
				"Password should contain alphabets and numbers only",
				"Password should be minimum 8 charcters long"
			]
		}

5. Get just list of errors

		Validation.errors()
		
		Returns
		[
			"Name is required field",
			"Password should contain alphabets and numbers only",
			"Password should be minimum 8 charcters long"
		]
	

##### Available Rules
1. required
2. alpha
3. numeric
4. digit
5. alphanumeric
6. email
7. uszip
8. usphone
9. creditcard
10. ssn
11. alpha_dash
12. size[x]
13. between[x,y]
14. min[x]
15. max[x]
16. url
17. ipaddress
18. image