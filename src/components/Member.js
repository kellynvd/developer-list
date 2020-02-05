import React, { Fragment } from 'react';
import Moment from 'react-moment';

const Member = ({
  member,
  currentMemberId,
  currentMemberData
}) => {
  if (member.id === currentMemberId) {
    return (
      <div className="member-data-container">
        <div className="member-avatar-container">
          <img src={member.avatar_url} alt={member.name} />
        </div>
        <p className="member-name">{currentMemberData.name}</p>
        <p className="member-created-at">
          No GitHub desde
          <Moment format="DD/MM/YYYY">
            {currentMemberData.created_at}
          </Moment>
        </p>
        <div className="member-info">
            <div className="member-info-title">{currentMemberData.public_repos}</div>
            <div className="member-info-text">Repositórios</div>
            <div className="member-info-title">{currentMemberData.followers}</div>
            <div className="member-info-text">Seguidores</div>
          </div>
        </div>
    )
  }

  return (
    <Fragment>
      <img src={member.avatar_url} alt={member.name} />
      <footer>
        <strong>{member.login}</strong>
      </footer>
    </Fragment>
  )
}

export default Member;
