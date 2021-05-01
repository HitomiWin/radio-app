import { useContext, useEffect, useState } from "react";
import { FavoriteContext } from "../contexts/FavoriteContext";
import { ChannelContext } from "../contexts/ChannelContext";
import ChannelSchedule from "./ChannelSchedule";
import { Card, Container, Col, Row } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import styles from "../css/Channels.module.css";

const FavoriteChannels = () => {
  const {
    favoriteChannelIds,
    deleteFavoriteChannel,
    showSchedule,
    setShowSchedule,
  } = useContext(FavoriteContext);
  const { channels } = useContext(ChannelContext);
  const [favoriteChannels, setFavoriteChannels] = useState(null);
  const [channelIdToSchedule, setChannelIdToSchedule] = useState(null);

  useEffect(() => {
    if (channels) {
      getChannelsByFavoriteChannelIds();
    }
  }, [favoriteChannelIds]);

  const getChannelsByFavoriteChannelIds = () => {
    let result = channels.filter((c) =>
      favoriteChannelIds.find((ci) => c.id === ci.channelId)
    );
    setFavoriteChannels(result);
  };

  const handleClick = (channelId) => {
    setChannelIdToSchedule(channelId);
    setShowSchedule(true);
  };

  const renderFavoriteChannels = () => {
    return favoriteChannels.map((channel) => (
      <Card key={channel.id} className={styles.card}>
        <Row className={styles.row}>
          <Col xs={3} style={{ padding: "1.25rem" }}>
            <Card.Img src={channel.image} alt={"image"} />
          </Col>
          <Col xs={7}>
            <Card.Body>
              <Card.Title>{channel.name} </Card.Title>
              <Card.Text>{channel.tagline}</Card.Text>
              <p
                className={styles.goToSchedule}
                onClick={() => handleClick(channel.id)}
              >
                {" "}
                Tablå &gt; &gt; &gt;
              </p>
            </Card.Body>
          </Col>
          <Col xs={1} style={{ paddingTop: "1.25rem" }}>
            <Trash
              onClick={(e) => {
                deleteFavoriteChannel(e, channel.id);
              }}
              color="Gray"
              size={25}
            />
          </Col>
        </Row>
      </Card>
    ));
  };

  return (
    <div>
      <h2 className="title">My Favorite Channels</h2>
      {showSchedule ? (
        <ChannelSchedule channelId={channelIdToSchedule} />
      ) : (
        <Container className="d-flex justify-content-center flex-wrap">
          {!favoriteChannels ? (
            <p>Loading...</p>
          ) : favoriteChannels.length == 0 ? (
            <p>Favorite Channels Not Found </p>
          ) : (
            <Row lg={2}>{renderFavoriteChannels()}</Row>
          )}
        </Container>
      )}
    </div>
  );
};

export default FavoriteChannels;
