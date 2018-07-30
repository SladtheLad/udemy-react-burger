import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price, //ideally, you would still check this value on the server to prevent tampering
      customer: {
        name: 'Slad the Lad',
        address: {
          street: 'Nightmare Street 2',
          zipCode: '10101',
          country: 'USA'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastfast'
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false, });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ loading: false, })
      });
  }

  render() {
    let form = (
      <form>
        <Input inputtype="input" type="text" name="name" placeholder="Your Name" />
        <Input inputtype="input" type="text" name="email" placeholder="Your Email" />
        <Input inputtype="input" type="text" name="street" placeholder="Your Street" />
        <Input inputtype="input" type="text" name="postal" placeholder="Your Postal Code" />
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>);
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
  }
}

export default ContactData;