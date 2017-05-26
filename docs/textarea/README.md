## TextAreaInput Component Documentation

**Calling of TextAreaInput Component**

```no-highlight
    <TextAreaInput  />
```
**Parameters of TextAreaInput Component**

>**name** *String* Required
>> It must be unique throughout the form.

>**ref** *String*
>> It  holds the values of the form. It must be unique throughout the form.

>**text** *String*
>> It defines the placeholder text of TextAreaInput

>**required** *Boolean*
>> It defines that the TextAreaInput is required or not.

>**editor** *Boolean*
>> It enables text editor if sets to true.

>**toolbar** *String*
>> It sets the text editing options and toolbars of editor.

>> **Accepted Value:** basic

>**rows** *Number*
>> It sets the number of rows when editor is in false state.

>**cols** *Number*
>> It sets the number of cols when editor is in false state.

>**value** *String*
>> It is the default value that we want to show in TextAreaInput.

>> **Accepted Value:** basic, advance.

>**emptyMessage** *String*
>> It is the message shown below the TextAreaInput on submitting a empty required TextAreaInput.

>> **DefaultMessage** Required

>**errorMessage** *String*
>> It is the message shown below the TextAreaInput when the entered value fails validation applied on TextAreaInput.

>> **DefaultMessage** Please enter a valid value

>**minCharacters** *Number*
>> It defines the minimum limit of number of Characters in the TextInput.

>**maxCharacters** *Number*
>> It defines the maximum limit of number of Characters in the TextInput.

>**minCharactersMessage** *String*
>> It is the message shown below the TextInput when the entered value has length less than minimum required.

>> **DefaultMessage** This Field must be minCharacters long

>**maxCharactersMessage** *String*
>> It is the message shown below the TextInput when the entered value has length more than maximum required.

>> **DefaultMessage** This Field must be maxCharacters long

>**handleChange**  This will be called on change of data. Any function could be passed in this.

**Example of TextAreaInput**

```no-highlight
    <TextAreaInput
		name="usernumber"
		text="Enter Your Text"
    ref="userNumber"
		required={true}
    handleChange={this.handleChange}
		errorMessage="Please enter a valid text"
		emptyMessage=" Dash Board Text is Required"
		editor={true}
		toolbar="advance"
		row={5}
		value="<p>Hello</p>"
	/>
```

**How to get values of form component**
```
  this.refs.userNumber.state.value
```

**How to check if state of form component is valid or not**
```
  this.refs.userNumber.state.valid
```
