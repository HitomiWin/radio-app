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
        <Card key={channel.id} onClick={() => handleClick(channel.id) } style={{marginTop:".5rem"}}>
         <Row className={styles.row}>
          <Col xs={12} sm={2} lg={2} style={{padding:"1.25rem"}}>
            <Card.Img src={channel.image} alt={"image"}/>
          </Col>
          <Col xs={12} sm={8} lg={8}>
          <Card.Body>
            <Card.Title>{channel.name}</Card.Title>
            <Card.Text>{channel.tagline}</Card.Text>
            <Button variant="primary" >
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
      <Container  fluid className="d-flex justify-content-center flex-wrap" style={{paddingLeft:" 0px",paddingRight:" 0px"}}>
      <Row xs={1} md={1} lg={2}>      
      {channels && renderChannels()}
      </Row> 
      </Container>
    </div>
  );
}

export default Home;
