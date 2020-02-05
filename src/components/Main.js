import React, { useEffect, useState, Fragment } from 'react';
import Moment from 'react-moment';
import api from '../services/api';
import './Main.css';
import Filter from './Filter'
import logo from '../assets/logo.png';


export default function Main() {
  const [ allMembers, setAllMembers] = useState([]);
  const [ filteredMembers, setFilteredMembers] = useState([]);
  const [ currentMemberId, setCurrentMemberId] = useState([]);
  const [ currentMemberData, setCurrentMemberData] = useState([]);

   useEffect (() => {
     async function loadMembers() {
      const response = await api.get('orgs/grupotesseract/public_members')
      setAllMembers(response.data);
      setFilteredMembers(response.data);
     }
     loadMembers();
   }, [])

   return (
    <div className="main-container">
      <a href='https://www.grupotesseract.com.br/' target="blank">
        <img src={logo} alt="Tesseract" width="150px" height="150px"/>
      </a>

      <Filter
        allMembers={allMembers}
        setFilteredMembers={setFilteredMembers}
      />

      {filteredMembers.length > 0 ? (
        <ul>
          {filteredMembers.map(member => {
            const onClick = async () => {
              if (currentMemberId !== member.id) {
                setCurrentMemberId(member.id)
                const response = await api.get(`/users/${member.login}`)
                setCurrentMemberData(response.data);
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
        </ul>) : (
        <div className="empty">Nenhum membro encontrado :(</div>
      )}
    </div>
  );
}
