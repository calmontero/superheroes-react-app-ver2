import React, { useState, useEffect } from "react";
import HeroesForm from "../HeroesForm/HeroesForm";
import HeroesSearch from "../HeroesSearch/HeroesSearch";
import HeroesCard from "../HeroesCard/HeroesCard";
//import './HeroesContainer.css';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Typography from '@mui/material/Typography';

function HeroesContainer() {
    const [heroes, setHeroes] = useState([]);
    const [search, setSearch] = useState("");
    const [sortType, setSortType] = useState(""); 
  
    //Recover the data
    useEffect(() => (
      fetch('https://json-server-pj-backend.herokuapp.com/heroes')
        .then((response) => response.json())
        .then((heroData) => setHeroes(heroData))
    ),[]);

    function handleAddHero(newHero) {
      const updatedHeroes = [...heroes, newHero];
      setHeroes(updatedHeroes);
    }
  
    function handleDeleteHero(id) {
      const updatedHeroes = heroes.filter((heroList) => heroList.id !== id);
      setHeroes(updatedHeroes);
    } 
    // Sort the Heroes List
    useEffect(() => {
      const sorted = [...heroes].sort((a, b) => a.name.localeCompare(b.name));
      setHeroes(sorted);
    }, [sortType])

    const displayHeroes = heroes.filter((heroesList) => {
      return heroesList.name.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <div className="Container">
          <Typography variant="h5" color="primary" >Create a Hero
            <HeroesForm onAddHero={handleAddHero} />
          </Typography>
          <br />
          <Typography variant="h5" color="primary" >Search a Hero
            <HeroesSearch  onSearch={search} onSearchChange={setSearch} />
          </Typography>
          <br />
          <ButtonGroup disableElevation variant="outlined" color="secondary">
            <Button onClick={() => setSortType("name")} >Sort List</Button> 
          </ButtonGroup>

          <br />
            { heroes.displayHeroes === 0
              ? <h1>Loading...</h1>
              :displayHeroes.map(heroes => {
                return < HeroesCard 
                          key={heroes.id} 
                          heroes={heroes}
                          onDeleteHero={handleDeleteHero}
                          />
              })
            }
        </div>
    );
}

export default HeroesContainer;