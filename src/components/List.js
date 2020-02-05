import React, { Fragment } from 'react';
import api from '../services/api';
import ListItem from './ListItem'
import './List.css'

const List = ({
  filteredMembers,
  currentMemberId,
  currentMemberData,
  setCurrentMemberId,
  setCurrentMemberData
}) => (
  <ul>
    {filteredMembers.map(member => {
      const onClick = async () => {
        if (currentMemberId !== member.id) {
          const response = await api.get(`/users/${member.login}`)
          setCurrentMemberData(response.data);
          setCurrentMemberId(member.id)
        } else {
          setCurrentMemberId(null)
          setCurrentMemberData(null);
        }
      };

      return (
        <ListItem
          member={member}
          currentMemberId={currentMemberId}
          currentMemberData={currentMemberData}
          onClick={onClick}
        />
      );
    })}
  </ul>
)

export default List;
