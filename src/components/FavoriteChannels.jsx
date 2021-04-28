import { useContext, useEffect } from "react";
// import { useHistory } from "react-router-dom";
// import { UserContext } from "../contexts/UserContext"
import { FavoriteContext } from "../contexts/FavoriteContext";
// import { Card, Container, Col, Row } from "react-bootstrap";
// import { Heart } from 'react-bootstrap-icons';
// import styles from "../css/Channels.module.css";

function FavoriteChannels(props) {
  const { favoriteChannels, getAllFavoriteChannels} = useContext( FavoriteContext );

  return (
    <div>
    <h1>
      this is FavoriteChannels
    </h1>
      {favoriteChannels ? favoriteChannels.map((f)=>(<div key={f.channelId}>{f.channelId} </div>)

      ) : <p>No Favorite Channels</p>}
    </div> 

  );
}

export default FavoriteChannels;