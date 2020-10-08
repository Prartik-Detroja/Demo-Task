import React, { Component } from "react";
import { Consumer } from "../../context";
import TextinputGroup from "../layout/TextinputGroup";

import axios from "axios";

import { v4 as uuidv4 } from "uuid";

class AddContact extends Component {
  state = {
    name: "",
    email: "",
    gender: "",
    errors: {},
  };

  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, gender } = this.state;

    if (name === "") {
      this.setState({ errors: { name: "Name is required" } });
      return;
    }

    if (email === "") {
      this.setState({ errors: { email: "Email is required" } });
      return;
    }

    if (gender === "") {
      this.setState({ errors: { gender: "Gender is required" } });
      return;
    }

    const newContact = {
      id: uuidv4(),
      name,
      gender,
      email,
    };

    const res = await axios.post(
      "https://gorest.co.in/public-api/users",
      newContact
    );
    dispatch({ type: "ADD_CONTACT", payload: res.data });

    this.setState({
      name: "",
      email: "",
      gender: "",
      errors: {},
    });

    this.props.history.push("/");
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { name, email, gender, errors } = this.state;
    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextinputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextinputGroup
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextinputGroup
                    label="Gender"
                    name="gender"
                    placeholder="Enter your gender"
                    value={gender}
                    onChange={this.onChange}
                    error={errors.gender}
                  />
                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-dark btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
