// import metoer packages;
import React, { Component } from 'react';
export class  InputError extends Component {
  constructor(props) {
    super(props);
    // return {
    //   message: 'Input is invalid'
    // };
  }
  render(){ 
     var errorClass ="hidden";
     if(this.props.visible)
      errorClass="error-message";
     else
      errorClass="hidden ";
     // classNames(this.props.className, {
    //   'error_container':   true,
    //   'visible':           this.props.visible,
    //   'invisible':         !this.props.visible
    // });

    return (
      <div className={errorClass}>
        <span>{this.props.errorMessage}</span>
      </div>
    )
  }
}
