import { useContext, useEffect ,useState } from "react";
import { FavoriteContext } from "../contexts/FavoriteContext";
import { ChannelContext } from "../contexts/ChannelContext";
import { useHistory } from "react-router-dom";
import { Card, Container, Col, Row } from "react-bootstrap";
import { Heart, HeartFill } from 'react-bootstrap-icons';
import styles from "../css/Channels.module.css";

 const FavoriteChannels=()=> {
  const { channelIds } = useContext( FavoriteContext );
  const { channels } = useContext( ChannelContext );
  const [favoriteChannels, setFavoriteChannels ] = useState(null);
  const history = useHistory();

  useEffect(() => {
    getChannelsByFavoriteChannelIds();
  }, [channelIds]);
  
  const getChannelsByFavoriteChannelIds=()=>{
    let result = channels.filter((c)=>(
      channelIds.find((ci)=>(
        c.id===ci.channelId
      ))
    ))
    setFavoriteChannels(result)
  }

  const handleClick = (channelId) => {
    history.push(`/programs/${channelId}`);
  };

  const renderFavoriteChannels=()=>{
    return favoriteChannels.map((channel) => (
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
        <Col  xs={1}  style={{paddingTop:"1.25rem"}} >
        <HeartFill color="red" size={25}  / >
        </Col>
        </Row>
      </Card>
  ))
  }

  return (
    <div>
    <h1>
      this is FavoriteChannels
    </h1>     
    <Container className="d-flex justify-content-center flex-wrap"  >
      <Row lg={2}>      
      {favoriteChannels ? renderFavoriteChannels() :<p>No result</p>}    
      </Row> 
      </Container>
    </div> 

  );
}

export default FavoriteChannels;