import { Card, Col, Row } from "react-bootstrap";
import { card, time } from "../css/ChannelSchedule.module.css";

const Schedule = (props) => {
  return (
    <div>
      {props.schedule.map((episode, i) => (
        <Col key={i} xs={12}>
          <Card className={card}>
            <Row>
              <Col xs={12} md={2}>
                <div className={`${time}`}>
                  {episode.starttimeutc.slice(11, 16)}
                </div>
              </Col>
              <Col xs={12} md={2} style={{ padding: "1.25rem" }}>
                <Card.Img src={episode.imageurl} alt={"episode image"} />
              </Col>
              <Col xs={12} md={8}>
                <Card.Body>
                  <Card.Title>{episode.title}</Card.Title>
                  <Card.Text>{episode.description}</Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      ))}
    </div>
  );
};

export default Schedule;
