## MultipleSelectInput Component Documentation

**Calling of MultipleSelectInput Component**

```no-highlight
    <MultipleSelectInput  />
```
**Parameters of MultipleSelectInput Component**

>**name** *String* Required
>> It must be unique throughout the form.

>**ref** *String*
>> It  holds the values of the form. It must be unique throughout the form.

>**required** *Boolean*
>> It defines that the MultipleSelectInput is required or not.

>**options** *String*
>> It is an array of options with their default values.

>>**Example**
```
[
{value:"First",isChecked:true},
{value:"Second",isChecked:false}
]
```
>**emptyMessage** *String*
>> It is the message shown below the MultipleSelectInput on submitting a empty required MultipleSelectInput.

>> **DefaultMessage** Required

>**errorMessage** *String*
>> It is the message shown below the MultipleSelectInput when the entered value fails validation applied on MultipleSelectInput.

>**handleChange**  This will be called on change of data. Any function could be passed in this.

**Example of MultipleSelectInput**

```no-highlight
    <MultipleSelectInput
        name={"mutiSelectDropdown"}
        ref="mutiSelectDropdown"
        handleChange={this.handleChange}
        required={true}
        options={[{value:"First",isDefault:true},{value:"Second",isDefault:false}]}
        errorMessage={"Please enter a valid "}
        emptyMessage="This Field is Required"
	/>
```

**How to get values of form component**
```
  this.refs.mutiSelectDropdown.state.value
```

**How to check if state of form component is valid or not**
```
  this.refs.mutiSelectDropdown.state.valid
```
