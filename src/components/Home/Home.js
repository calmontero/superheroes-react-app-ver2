import React from 'react';
import "./Home.css";

function Home() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

    return (
      <div className="home-container">
        <h1 className="home-heading">Super Heroes Page</h1>
        <img className="home-img" alt="heroes" src="https://bit.ly/3HpNIKf" />
      </div>
    )
  }
  
  export default Home;