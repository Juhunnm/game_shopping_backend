import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes ,Route} from 'react-router-dom';
import axios from 'axios';
import Signup from './components/Signup';
import Login from './components/Login';
import GameBoard from './components/GameBoard';
import SuggestBoard from './components/SuggestBoard';
import Header from './Header';
import MarketBoard from './components/MarketBoard';
import PopularBoard from "./components/PopularBoard";

function App() {
  const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = { name, email };

        axios.post('http://localhost:8080/users', user)
            .then(response => {
                console.log('User created:', response.data);
                // 필요한 경우 상태 초기화
                setName('');
                setEmail('');
            })
            .catch(error => {
                console.error('There was an error creating the user!', error);
            });
    };
  useEffect(() => {
    axios.get('http://localhost:8080/test')
      .then(res => {
        setMessage(res.data);
      })
      .catch(err => {
        console.error('Error fetching the message:', err);
      });
  }, []);

  return (
      <div className="App">
          <Header/>
          {/*<h1>Create User</h1>*/}
          {/*<form onSubmit={handleSubmit}>*/}
          {/*    <div>*/}
          {/*        <label>Name:</label>*/}
          {/*        <input*/}
          {/*            type="text"*/}
          {/*            value={name}*/}
          {/*            onChange={(e) => setName(e.target.value)}*/}
          {/*        />*/}
          {/*    </div>*/}
          {/*    <div>*/}
          {/*        <label>Email:</label>*/}
          {/*        <input*/}
          {/*            type="email"*/}
          {/*            value={email}*/}
          {/*            onChange={(e) => setEmail(e.target.value)}*/}
          {/*        />*/}
          {/*    </div>*/}
          {/*    <button type="submit">Create User</button>*/}
          {/*</form>*/}
          <Routes>
              <Route path='/gameboard' element={<GameBoard/>}/>
              <Route path='/popularboard' element={<PopularBoard/>}/>
              <Route path='/suggestboard' element={<SuggestBoard/>}/>
              <Route path='/marketboard' element={<MarketBoard/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/" element={<h1>Welcome to the React App</h1>}/>
          </Routes>
          {message}
      </div>
  );
}

export default App;
