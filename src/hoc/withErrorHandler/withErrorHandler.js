import React, { useState, useEffect } from 'react'

import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [errorState, setErrorState] = useState(null)

    //creates a reference to the request interceptor on the fly
    const reqInterceptor = axios.interceptors.request.use(req => {
      setErrorState(null)
      return req
    })
    //creates a reference to the response interceptor on the fly
    const resInterceptor = axios.interceptors.response.use(
      res => res,
      error => {
        setErrorState(error)
      }
    )

    useEffect(() => {
      return () => {
        axios.interceptors.reqeust.eject(reqInterceptor)
        axios.interceptors.response.eject(resInterceptor)
      }
    }, [])

    const errorConfirmedHandler = () => {
      setErrorState(null)
    }

    return (
      <React.Fragment>
        <Modal show={errorState} modalClosed={errorConfirmedHandler}>
          {errorState ? errorState.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </React.Fragment>
    )
  }
}

export default withErrorHandler
