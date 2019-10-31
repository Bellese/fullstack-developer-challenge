
import React, { Component } from 'react';
import ReactDOM, { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root');

class Modal extends Component {

  constructor(props) {
    super(props)
    this.el = document.createElement('div');
  }
  
  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return createPortal(
      this.props.children,
      this.el,
    );

  }
}

export default Modal