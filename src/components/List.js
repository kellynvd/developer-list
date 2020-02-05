import React, { Fragment } from 'react';
import Moment from 'react-moment';
import api from '../services/api';
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
        }};
      return (
        <li key={member.id} onClick={onClick}>
          {member.id === currentMemberId ? (
            <div className="member-data-container">
              <div className="member-avatar-container"><img src={member.avatar_url} alt={member.name} /></div>
              <p className="member-name">{currentMemberData.name}</p>
              <p className="member-created-at">No GitHub desde <Moment format="DD/MM/YYYY">{currentMemberData.created_at}</Moment></p>
              <div className="member-info">
                <div className="member-info-item">
                  <div className="member-info-title">{currentMemberData.public_repos}</div><div className="member-info-text">Repositórios</div>
                  <div className="member-info-title">{currentMemberData.followers}</div><div className="member-info-text">Seguidores</div>
                </div>
              </div>
            </div>
            ) : (
            <Fragment>
              <img src={member.avatar_url} alt={member.name} />
              <footer>
                <strong>{member.login}</strong>
              </footer>
            </Fragment>
            )
          }
        </li>
      );
    })}
  </ul>
)

export default List;
