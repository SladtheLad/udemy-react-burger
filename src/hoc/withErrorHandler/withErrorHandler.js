import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }


    // Since we are wrapping these interceptors, this ensures that the child components will render after data is received
    componentWillMount() {
      //creates a reference to the request interceptor on the fly
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      //creates a reference to the response interceptor on the fly
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({ error: error });
      });
    };

    componentWillUnmount() {
      //allows us to unmount the instanced axios calls when they are no longer needed
      //from any given component this is wrapped around
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <React.Fragment>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </React.Fragment >
      );
    }
  }
};

export default withErrorHandler;