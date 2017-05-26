## TextInput Component Documentation

**Calling of TextInput Component**

```no-highlight
    <TextInput  />
```
**Parameters of TextInput Component**

>**name** *String* Required
>> It must be unique throughout the form.

>**ref** *String*
>> It  holds the values of the form. It must be unique throughout the form.

>**type** *String*
>> It defines the type of TextInput

>> **Accepted Values:** email, number, password, name, confirmPassword, text, url, alphanumeric.

>**text** *String*
>> It defines the placeholder text of TextInput

>**required** *Boolean*
>> It defines that the TextInput is required or not.

>**password** *Boolean*
>> It is only applicable when we have defined type as password.

>> **Accepted Value:** password

>**value** *String*
>> It is the default value that we want to show in TextInput.

>**minCharacters** *Number*
>> It defines the minimum limit of number of Characters in the TextInput.

>**maxCharacters** *Number*
>> It defines the maximum limit of number of Characters in the TextInput.

>**emptyMessage** *String*
>> It is the message shown below the TextInput on submitting a empty required TextInput.

>> **DefaultMessage** Required

>**errorMessage** *String*
>> It is the message shown below the TextInput when the entered value fails validation applied on TextInput.

>> **DefaultMessage**  Input is invalid

>**minCharactersMessage** *String*
>> It is the message shown below the TextInput when the entered value has length less than minimum required.

>> **DefaultMessage** This Field must be minCharacters long

>**maxCharactersMessage** *String*
>> It is the message shown below the TextInput when the entered value has length more than maximum required.

>> **DefaultMessage** This Field must be maxCharacters long.

>**handleChange**  This will be called on change of data. Any function could be passed in this.

**Example of TextInput**

```no-highlight
    <TextInput
		type="email"
    handleChange={this.handleChange}
		name="useremail"
		text="Email"
		ref="userEmail"
		required={true}
		errorMessage="Please enter a valid email"
		emptyMessage="Email is Required"
	/>
```


**How to get values of form component**
```
  this.refs.userEmail.state.value
```

**How to check if state of form component is valid or not**
```
  this.refs.userEmail.state.valid
```
