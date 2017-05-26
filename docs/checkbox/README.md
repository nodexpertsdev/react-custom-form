## CheckboxInput Component Documentation

**Calling of CheckboxInput Component**

```no-highlight
    <CheckboxInput  />
```
**Parameters of CheckboxInput Component**

>**name** *String* Required
>> It must be unique throughout the form.

>**ref** *String*
>> It  holds the values of the form. It must be unique throughout the form.

>**required** *Boolean*
>> It defines that the CheckboxInput is required or not.

>**choices** *String*
>> It is an array of choices with their default values.

>>**Example**
```
[
{value:"First",isChecked:true},
{value:"Second",isChecked:false}
]
```
>**emptyMessage** *String*
>> It is the message shown below the CheckboxInput on submitting a empty required CheckboxInput.

>> **DefaultMessage** Required

>**errorMessage** *String*
>> It is the message shown below the CheckboxInput when the entered value fails validation applied on CheckboxInput.
>> **DefaultMessage**  Input is invalid

>**handleChange**  This will be called on change of data. Any function could be passed in this.


**Example of CheckboxInput**

```no-highlight
    <CheckboxInput
        name={"checkbox1"}
        ref="checkbox1"
        handleChange={this.handleChange}
        required={true}
        choices={[{value:"First",isChecked:true},{value:"Second",isChecked:false}]}
        errorMessage={"Please enter a valid "+element.type}
        emptyMessage="This Field is Required"
	/>
```

**How to get values of form component**
```
  this.refs.checkbox1.state.value
```

**How to check if state of form component is valid or not**
```
  this.refs.checkbox1.state.valid
```
