import * as React from "react"

interface P {
  value?: string
  placeholder?: string
  className?: string
  required?: boolean
  multiple?: boolean
  onChange?: (value: string) => void
}

interface S {
  value: string
  isValid: boolean
}

export default class Input extends React.Component<P, S> {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value || '',
      isValid: true
    }
  }

  componentWillReceiveProps(nextProps: P) {
    var isValid: boolean = true
    if (nextProps.required) {
      if (!nextProps.value) {
        isValid = false
      }
    }
    this.setState({
      value: nextProps.value || '',
      isValid: isValid
    })
  }

  getValue(): string {
    return this.state.value || ''
  }

  isValid(val?: boolean): boolean {
    var isValid = true
    if (typeof (val) === 'boolean') {
      isValid = val
    } else {
      if (this.props.required) {
        if (!this.state.value) {
          isValid = false
        }
      }
    }
    this.setState({
      value: this.state.value,
      isValid: isValid
    })
    return isValid
  }

  onChange(event) {
    this.setState({
      value: event.target.value,
      isValid: true
    })
  }

  onBlur() {
    if (this.props.required) {
      var isValid = true
      if (!this.state.value) {
        isValid = false
      }
      this.setState({
        value: this.state.value,
        isValid: isValid
      })
    }
    if (this.props.onChange) {
      this.props.onChange(this.getValue())
    }
  }

  render() {
    var className = this.props.className
    if (!className) {
      className = "text"
      if (this.props.multiple) {
        className = className.replace("text", "textarea")
      }
    }
    if (!this.state.isValid) {
      className += " error"
    }
    if (this.props.multiple) {
      return React.createElement("textarea", { className: className, placeholder: this.props.placeholder, value: this.state.value, onChange: this.onChange.bind(this), onBlur: this.onBlur.bind(this) })
    } else {
      var type: string = className.indexOf("password") !== -1 ? "password" : "text"
      return React.createElement("input", { type: type, autoComplete: "off", className: className, placeholder: this.props.placeholder, value: this.state.value, onChange: this.onChange.bind(this), onBlur: this.onBlur.bind(this) })
    }
  }
}
