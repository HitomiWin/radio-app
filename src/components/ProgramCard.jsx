import  { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { FavoriteContext } from "../contexts/FavoriteContext"
import {useHistory} from "react-router-dom"
import { Card, Col, Row} from "react-bootstrap";
import { Tag, Heart, HeartFill } from 'react-bootstrap-icons';
import styles from "../css/ProgramsPage.module.css"

const ProgramCard=(props)=> {
  const { user } = useContext(UserContext);
  const history =useHistory();
  const {
    favoriteProgramIds,
    addProgramToFavorites,
    deleteFavoriteProgram,
  } = useContext(FavoriteContext);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    getFavoriteHeart();
  }, [props.program, favoriteProgramIds]);

  const handleClick=(programId)=>{
    history.push(`/programs/allprogram/${programId}`)
  }
  const getFavoriteHeart = () => {
    if (favoriteProgramIds && props.program) {
      let result = favoriteProgramIds.find((fpi) => fpi.programId == props.program.id);
      if (result) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
  };
  const handleOnClickGrayHeart = async (e, programId) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    let favoriteProgram = {
      programId,
    };
    let result = await addProgramToFavorites(favoriteProgram);
    if (result.success) {
      console.log(result.success);
    } else {
      console.log(result.error);
    }
  };
  const handleOnClickRedHeart = (e, programId) => {
    setIsFavorite(!isFavorite);
    deleteFavoriteProgram(e, programId);
  };

  return (
    <>
      {props.program && 
       <Col key={props.program.id} xs={12} md={12} lg={6}   onClick={() => handleClick(props.program.id) }>
       <Card className={styles.card} >
       <Row>
        <Col xs={3} style={{padding:"1.25rem"}}>
          <Card.Img src={props.program.programimagewide} alt={"program image"}/>
        </Col>
        <Col xs={7} >
        <Card.Body>
          <Card.Title>{props.program.name}</Card.Title>
          <div className ={styles.cardTag}>
            {props.program.channel&&
          <Card.Text>
           <Tag color="gray" size={25} />
            {props.program.channel["name"]} </Card.Text>}
            {props.program.programcategory&&
          <Card.Text>
           <Tag color="gray" size={25} />
            {props.program.programcategory["name"]} </Card.Text>}
          </div>
        </Card.Body>
        </Col>
        {user && (
          <Col style={{padding:"1.25rem"}}  xs={1}>
            {isFavorite ? (
              <HeartFill
                color="IndianRed"
                size={25}
                onClick={(e) => {
                  handleOnClickRedHeart(e, props.program.id);
                }}
              />
            ) : (
              <Heart
                color="gray"
                className={styles.heartIcon}
                size={25}
                onClick={(e) => {
                  handleOnClickGrayHeart(e, props.program.id);
                }}
              />
            )}
          </Col>
        )}  
        </Row>
      </Card>
       </Col>}
       </>
  )
}

export default ProgramCard
