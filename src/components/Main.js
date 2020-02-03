import React, { useEffect, useState } from 'react';
import './Main.css';
import api from '../services/api';

export default function Main() {
  const [ members, setMembers] = useState([]);

   useEffect (() => {
     async function loadMembers() {
      const response = await api.get('orgs/grupotesseract/public_members')
      setMembers(response.data);
     }
     loadMembers();
   }, [])

   return (
    <div className="main-container">
       { members.length > 0 ? (
      <ul>
        { members.map( member => (
          <li key={member.id}>
            <img src={member.avatar_url} alt={member.name}/>
            <footer>
              <strong>{member.login}</strong>
          </footer>
          </li>
        ))}
      </ul> ): (
        <div className="empty">Acabou :(</div>
      ) }
    </div>
  );
}
