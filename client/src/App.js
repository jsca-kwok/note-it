import React from 'react';
import { BrowserRouter, Route, Switch} from "react-router-dom";
import Hero from './components/Hero/Hero';
import Demo from './pages/Demo/Demo';
import Note from './pages/Note/Note';
import Header from './components/Header/Header';

function App() {
  return (
  
    <BrowserRouter>
        <Header />
      <Switch>
        <Route path="/" exact component={Hero}/>
        <Route path="/demo" component={Demo}/>
        <Route path="/note/:id" component={Note} />
      </Switch>
    </BrowserRouter>
   
  );
}

export default App;
