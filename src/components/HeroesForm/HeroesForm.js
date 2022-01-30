import React, { useState } from "react";
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makeStyles } from "@material-ui/core/styles";

const BASE_URL = 'https://json-server-pj-backend.herokuapp.com/heroes';
/*
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));*/

function HeroesForm({ onAddHero }) {
  const[form, setForm] = useState({
    name: '',
    realname: '',
    image: ''
  });

  const [publisher, setPublisher] = useState('');
  const [alignment, setAlignment] = useState('');

  const handleChangePublisher = (e) => {
    setPublisher(e.target.value);
  };

  const handleChangeAlignment = (e) => {
    setAlignment(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        realname: form.realname,
        publisher: publisher,
        alignment: alignment,
        image: form.image,
        isFavorite: false,
      }),
    })
    .then((response) => response.json())
    .then((newHero) => onAddHero(newHero), setPublisher(""), setAlignment(""));
  }

  const updateField = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="form">
            <form  noValidate autoComplete="on" onSubmit={handleSubmit} >
                <Input 
                type="text"
                name="name"
                placeholder="Enter a hero's name..."
                value={form.name}
                onChange={updateField}
                style = {{width: 250}}
                />
                
                <Input
                type="text"
                name="realname"
                placeholder="Enter a hero's real name..."
                className="Input-text"
                value={form.realname}
                onChange={updateField}
                style = {{width: 250}}
                />
                
                <FormControl variant="standard" sx={{ m: -2,  width: 150, marginLeft: 0, height: 100 }}>
                  <InputLabel id="label">Publisher</InputLabel>
                  <Select
                    labelId="label"
                    id="standard"
                    value={publisher}
                    onChange={handleChangePublisher}
                    label="Publisher"
                  >
                    <MenuItem value="DC Comics">DC Comics</MenuItem>
                    <MenuItem value="Marvel Comics">Marvel Comics</MenuItem>
                  </Select>
                </FormControl>
                
                <FormControl variant="standard" sx={{ m: -2,  width: 100, marginLeft: 2, marginRight: 0 }}>
                  <InputLabel id="label">Alignment</InputLabel>
                  <Select
                    labelId="label"
                    id="standard"
                    value={alignment}
                    onChange={handleChangeAlignment}
                    label="Alignment"
                  >
                    <MenuItem value={"good"}>Good</MenuItem>
                    <MenuItem value={"bad"}>Bad</MenuItem>
                  </Select>
                </FormControl>
                
                <Input
                type="text"
                name="image"
                placeholder="Enter a hero's image URL..."
                className="Input-text"
                value={form.image}
                onChange={updateField}
                style = {{width: 350}}
                />
                <br/>
                <Button type="submit"variant="outlined" color="secondary">Submit</Button>
                <Button type="reset" onClick={() => setForm(() => "")} variant="outlined" color="secondary">Reset</Button>           
            </form>
        </div>
  );
}

export default HeroesForm;