## FileUpload Component Documentation

**Calling of FileUpload Component**

```no-highlight
    <FileUpload  />
```
**Parameters of FileUpload Component**

>**name** *String* Required
>> It must be unique throughout the form.

>**type** *String*
>> It defines the type of FileUpload

>**ref** *String*
>> It  holds the values of the form. It must be unique throughout the form.

>> **Accepted Values:** image, video and csv.

>**required** *Boolean*
>> It defines that the FileUpload is required or not.

>**ext** *Boolean*
>> It is an array of extensions by which it will validate a file.

>**emptyMessage** *String*
>> It is the message shown below the FileUpload on submitting a empty required FileUpload.

>> **DefaultMessage** Required

>**errorMessage** *String*
>> It is the message shown below the FileUpload when the entered value fails validation applied on FileUpload.
>> **DefaultMessage**  Input is invalid

>**handleChange**  This will be called on change of data. Any function could be passed in this.


**Example of FileUpload**

```no-highlight
    <FileUpload
		name="profileIcon"
		type="image"
    ref="refName"
    handleChange={this.handleChange}
		ext={["png","gif","svg","jpg"]}
		required={true}
		emptyMessage="Image is Required"
		errorMessage="Please enter a valid Image"
	/>
```

**How to get values of form component**
```
  this.refs.refName.state.value
```

**How to check if state of form component is valid or not**
```
  this.refs.refName.state.valid
```
