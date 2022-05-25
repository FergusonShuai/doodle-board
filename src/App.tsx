import React from 'react';
import './App.css';
import Canvas from './components/Canvas';

function App() {
  return (
    <div className="App">
      <h1>Doodle Board</h1>
      <div className="CanvasDiv">
        <Canvas></Canvas>
      </div>
    </div>
  );
}

export default App;
