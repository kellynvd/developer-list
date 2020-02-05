import React from 'react';
import api from '../services/api';
import Member from './Member'

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
        <li key={member.id} onClick={onClick}>
          <Member
            member={member}
            currentMemberId={currentMemberId}
            currentMemberData={currentMemberData}
          />
        </li>
      );
    })}
  </ul>
)

export default List;
