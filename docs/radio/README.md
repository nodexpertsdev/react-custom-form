## RadioInput Component Documentation

**Calling of RadioInput Component**

```no-highlight
    <RadioInput  />
```
**Parameters of RadioInput Component**

>**name** *String* Required
>> It must be unique throughout the form.

>**ref** *String*
>> It  holds the values of the form. It must be unique throughout the form.

>**required** *Boolean*
>> It defines that the RadioInput is required or not.

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
>> It is the message shown below the RadioInput on submitting a empty required RadioInput.

>> **DefaultMessage** Required

>**errorMessage** *String*
>> It is the message shown below the RadioInput when the entered value fails validation applied on RadioInput.

>**handleChange**  This will be called on change of data. Any function could be passed in this.


**Example of RadioInput**

```no-highlight
    <RadioInput
        name={"radio1"}
        ref="radio1"
        handleChange={this.handleChange}
        required={true}
        choices={[{value:"First",isDefault:true},{value:"Second",isDefault:false}]}
        errorMessage={"Please enter a valid "}
        emptyMessage="This Field is Required"
	/>
```

**How to get values of form component**
```
  this.refs.radio1.state.value
```

**How to check if state of form component is valid or not**
```
  this.refs.radio1.state.valid
```
