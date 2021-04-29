import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { ChannelContext } from "../contexts/ChannelContext";
import { UserContext } from "../contexts/UserContext"
import { FavoriteContext } from "../contexts/FavoriteContext";
import { Card, Container, Col, Row } from "react-bootstrap";
import { Heart } from 'react-bootstrap-icons';
import styles from "../css/Channels.module.css";

function Channels(props) {
  const { channels } = useContext(ChannelContext);
  const { addCahnnelToFavorites } = useContext( FavoriteContext );
  const { user } = useContext ( UserContext );
  const history = useHistory();

  const handleClick = (channelId) => {
    history.push(`/programs/${channelId}`);
  };

  const handleOnClickHeart= async (e, channelId)=>{
    e.stopPropagation()
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
          <Col  xs={1}  style={{paddingTop:"1.25rem"}} className={styles.heart}>
          <Heart className={styles.heartIcon} size={25} onClick={(e)=>{handleOnClickHeart(e,channel.id)}} / >
          </Col>}
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
