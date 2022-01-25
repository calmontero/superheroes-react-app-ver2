import React, { useState } from 'react';
import "./HeroesCard.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


function HeroesCard({ heroes, onDeleteHero }) {
  const { id, name, publisher, isFavorite, realname, alignment, image } = heroes;
  const [isFav, setFav] = useState(isFavorite);

  function handleDeleteClick(e) {
    fetch(`https://json-server-pj-backend.herokuapp.com/heroes/${id}`, {
        method: "DELETE",
      });
      onDeleteHero(id);
  }

  function handleUpdateClick() {
    fetch(`https://json-server-pj-backend.herokuapp.com/heroes/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            isFavorite: !isFav
        }),
        })
    .then((response) => response.json())
    .then((updateHero) => {
    });
  }

    return (
      <div className="hero">
        <Card sx={{ maxWidth: 350 }}>
          <CardMedia
            component="img"
            height="300"
            image={image}
            alt=""
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Real name: {realname}</Typography>
            <Typography variant="body2" color="text.secondary">
              Alignment: {alignment}</Typography>
            <Typography variant="body2" color="text.secondary">
              Publisher: {publisher}</Typography>
          </CardContent>
          <CardActions>
            <IconButton aria-label="add to favorites">
              {isFav ? (
                <FavoriteIcon style={{ color: 'red' }} onClick={() => {handleUpdateClick(); setFav(false)}} />
                ) : (
                <FavoriteIcon style={{ color: 'gray' }} onClick={() => {handleUpdateClick(); setFav(true)}} />
              )}
            </IconButton>
            <IconButton aria-label="delete">
                  <DeleteForeverIcon onClick={handleDeleteClick} />
            </IconButton>
          </CardActions>
        </Card>
      </div>
    );
}

export  default HeroesCard;