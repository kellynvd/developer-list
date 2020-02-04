import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './Main.css';
import Filter from './Filter'
import logo from '../assets/logo.png';


export default function Main() {
  const [ allMembers, setAllMembers] = useState([]);
  const [ filteredMembers, setFilteredMembers] = useState([]);

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
          {filteredMembers.map(member => (
            <li key={member.id}>
              <img src={member.avatar_url} alt={member.name} />
              <footer>
                <strong>{member.login}</strong>
            </footer>
            </li>
          ))}
        </ul>) : (
        <div className="empty">Nenhum membro encontrado :(</div>
      )}
    </div>
  );
}
