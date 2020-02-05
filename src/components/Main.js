import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './Main.css';
import Filter from './Filter'
import List from './List'
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
        <List
          filteredMembers={filteredMembers}
          currentMemberId={currentMemberId}
          setCurrentMemberId={setCurrentMemberId}
          currentMemberData={currentMemberData}
          setCurrentMemberData={setCurrentMemberData}
        />
        ) : (
        <div className="empty">Nenhum membro encontrado :(</div>
      )}
    </div>
  );
}
