import React, { Component } from "react";
import { Consumer } from "../../context";

import { Link } from "react-router-dom";
import { GrEdit, GrTrash, GrCaretDown } from "react-icons/gr";
import axios from "axios";

class Contact extends Component {
  state = {
    showContactInfo: false,
  };

  onDeleteClick = async (id, dispatch) => {
    try {
      await axios.delete(`https://gorest.co.in/public-api/users/${id}`);
      dispatch({ type: "DELETE_CONTACT", payload: id });
    } catch (e) {
      dispatch({ type: "DELETE_CONTACT", payload: id });
    }
  };

  render() {
    const { id, name, email, gender } = this.props.contact;
    const { showContactInfo } = this.state;
    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}{" "}
                <GrCaretDown
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    this.setState({
                      showContactInfo: !this.state.showContactInfo,
                    });
                  }}
                  size="1rem"
                />
                <GrTrash
                  style={{ cursor: "pointer", float: "right" }}
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                />
                <Link to={`contact/edit/${id}`}>
                  <GrEdit
                    style={{
                      float: "right",
                      marginRight: "1rem",
                    }}
                  />
                </Link>
              </h4>
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Gender: {gender}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Contact;
