import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './components/Main'

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" component={Main}/>
    </BrowserRouter>
  );
}
