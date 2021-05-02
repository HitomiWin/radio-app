import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { Card, Col, Row } from "react-bootstrap";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { FavoriteContext } from "../contexts/FavoriteContext";
import styles from "../css/Channels.module.css";

const  ChannelCard =(props)=> {
  const { user } = useContext(UserContext);
  const [isChannelFavorite, setIsChannelFavorite] = useState(false);
  const {
    deleteFavoriteChannel,
    addChannelToFavorites,
    favoriteChannelIds,
  } = useContext(FavoriteContext);
  // const { channel } = props.channel 
  const history = useHistory();
  
  useEffect(() => {
    if(user){
    getFavoriteHeart();
    }
    // eslint-disable-next-line
  }, [props.channel, favoriteChannelIds]);
  
  const getFavoriteHeart = () => {
    if (favoriteChannelIds && props.channel) {
      let result = favoriteChannelIds.find(
        (fci) => fci.channelId == props.channel.id
        );
        if (result) {
          setIsChannelFavorite(true);
        } else {
          setIsChannelFavorite(false);
        }
      }
    };
    
      const handleClick = (channelId) => {
        history.push(`/programs/${channelId}`);
      };

      const handleOnClickGrayHeart = async (e, channelId) => {
        e.stopPropagation();
        setIsChannelFavorite(!isChannelFavorite);
        let favoriteChannel = {
          channelId,
        };
        let result = await addChannelToFavorites(favoriteChannel);
        if (result.success) {
          console.log(result.success);
        } else {
          console.log(result.error);
        }
      };
      const handleOnClickRedHeart = (e, channelId) => {
        setIsChannelFavorite(!isChannelFavorite);
        deleteFavoriteChannel(e, channelId);
      };

 

  return (
     <div> {props.channel && 
      <Card
        key={props.channel.id}
        className={styles.card}
        onClick={() => handleClick(props.channel.id)}
      >
        <Row >
          <Col xs={3} style={{ padding: "1.25rem" }}>
            <Card.Img src={props.channel.image} alt={"image"} />
          </Col>
          <Col xs={7}>
            <Card.Body>
              <Card.Title>{props.channel.name} </Card.Title>
              <Card.Text>{props.channel.tagline}</Card.Text>
            </Card.Body>
          </Col>
          {user && (
            <Col xs={1}  style={{ padding: "1.25rem" }}>
              {isChannelFavorite ?
              (
                <HeartFill
                  color="IndianRed "
                  size={25}
                  onClick={(e) => {
                    handleOnClickRedHeart(e, props.channel.id);
                  }}
                 />
              ) : (
                  <Heart
                    color="gray"
                    className={styles.heartIcon}
                    size={25}
                    onClick={(e) => {
                      handleOnClickGrayHeart(e, props.channel.id);
                     }}
                  />
                  )}
              </Col>
            )}
        </Row>
      </Card>}</div>

  );
}

export default ChannelCard;
