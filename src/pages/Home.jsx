import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChannelContext } from "../contexts/ChannelContext";
import { Card, Button, Container, Col, Row } from "react-bootstrap";
import styles from "../css/Home.module.css";
function Home() {
  const { channels } = useContext(ChannelContext);
  const history = useHistory();

  const handleClick = (channelId) => {
    history.push(`/programs/${channelId}`);
  };
  const renderChannels = () => {
    return channels.map((channel) => (
        <Card key={channel.id} onClick={() => handleClick(channel.id) }>
         <Row className={styles.row}>
          <Col xs={3} sm={3} lg={3} style={{padding:"1.25rem"}}>
            <Card.Img src={channel.image} alt={"image"} />
          </Col>
          <Col xs={9} sm={9} lg={9}>
          <Card.Body>
            <Card.Title>{channel.name}</Card.Title>
            <Card.Text>{channel.tagline}</Card.Text>
            <Button variant="secondary" >
              Tablå
            </Button>
          </Card.Body>
          </Col>
          </Row>
        </Card>
    ))
 
  };
  return (
    <div className={styles.home}>
      <h1>This is the Homepage</h1>
      <Container className="d-flex justify-content-center flex-wrap"  >
      <Row lg={2}>      
      {channels && renderChannels()}
      </Row> 
      </Container>
    </div>
  );
}

export default Home;
