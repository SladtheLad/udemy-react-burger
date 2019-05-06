import React from 'react'

import classes from './Modal.css'
import Backdrop from '../Backdrop/Backdrop'

const Modal = props => {
  // //ensures Modal only gets updated when it is visible
  // const shouldComponentUpdate = (nextProps, nextState) => {
  //     return nextProps.show !== props.show || nextProps.children !== props.children; //ensures the spinner still gets updated even if the modal doesn't.
  // }

  return (
    <React.Fragment>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0'
        }}
      >
        {props.children}
      </div>
    </React.Fragment>
  )
}

export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
)
