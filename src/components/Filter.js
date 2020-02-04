import React, { Component } from 'react';
import './Filter.css'

export default class Filter extends Component {
  onChange = (e) => {
    const value = e.target.value;
    const filteredMember = this.props.allMembers.filter((member) => (
      member.login.toLowerCase().search(value.toLowerCase()) !== -1
    ));

    this.props.setFilteredMembers(filteredMember)
  }

  render() {
    return (
      <div className="filter-container">
        <input
          type="text"
          placeholder="Pesquisar Membro"
          onChange={this.onChange}
        />
      </div>
    )
  }
}
