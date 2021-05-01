import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { ChannelContext } from "../contexts/ChannelContext";
import { Card, Container, Col, Row } from "react-bootstrap";
import styles from "../css/Channels.module.css";

function Channels() {
  const { channels } = useContext(
    ChannelContext
  );
  
  const history = useHistory();

  const handleClick = (channelId) => {
    history.push(`/programs/${channelId}`);
  };

  const renderChannels = () => {
    return channels.map((channel) => (
      <Card
        key={channel.id}
        className={styles.card}
        onClick={() => handleClick(channel.id)}
      >
        <Row className={styles.row}>
          <Col xs={3} style={{ padding: "1.25rem" }}>
            <Card.Img src={channel.image} alt={"image"} />
          </Col>
          <Col xs={8}>
            <Card.Body>
              <Card.Title>{channel.name} </Card.Title>
              <Card.Text>{channel.tagline}</Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    ));
  };

  return (
    <Container className="d-flex justify-content-center flex-wrap">
      <Row lg={2}>{channels && renderChannels()}</Row>
    </Container>
  );
}

export default Channels;
