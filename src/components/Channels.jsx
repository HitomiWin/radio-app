import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChannelContext } from "../contexts/ChannelContext";
import { UserContext } from "../contexts/UserContext"
import { FavoriteContext } from "../contexts/FavoriteContext";
import { Card, Container, Col, Row, Button } from "react-bootstrap";
import { Heart , HeartFill} from 'react-bootstrap-icons';
import styles from "../css/Channels.module.css";

function Channels() {
  const { channels, setChannels, getFavoriteChannelIds  } = useContext(ChannelContext);
  const { addCahnnelToFavorites, favoriteChannelIds, deleteFavoriteChannel} = useContext( FavoriteContext );
  const { user } = useContext ( UserContext );
  const history = useHistory();

  const handleClick = (channelId) => {
    history.push(`/programs/${channelId}`);
  };
  
  const handleOnClickLike= async (e, channelId)=>{
    e.stopPropagation();
    let favoriteChannel ={
      userId:user.userId,
      channelId,
    }
    let result = await  addCahnnelToFavorites(favoriteChannel);
    if (result.success ) {
      console.log(result.success)
    } else {
      console.log(result.error)
    }
  };

 

  const renderChannels = () => {
    return channels.map((channel) => (
        <Card key={channel.id} className={styles.card} onClick={() => handleClick(channel.id) }>
         <Row className={styles.row}>
          <Col xs={3}  style={{padding:"1.25rem"}}>
            <Card.Img src={channel.image} alt={"image"} />
          </Col>
          <Col xs={7} >
          <Card.Body>
            <Card.Title>{channel.name} </Card.Title>
            <Card.Text>{channel.tagline}</Card.Text>
          </Card.Body>
          </Col>
          { user && 
          <Col xs={2}  style={{paddingTop:"1.25rem"}} >       
            <Button variant="secondary" onClick={(e)=>{ handleOnClickLike (e, channel.id)}}>Like</Button>
          </Col>
        }
          </Row>
        </Card>
    ))
  };

  return (

      <Container className="d-flex justify-content-center flex-wrap"  >
      <Row lg={2}>      
      {channels && renderChannels()}    
      </Row> 
      </Container>

  );
}

export default Channels;
