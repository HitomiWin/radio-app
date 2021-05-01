import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CategoryContext } from "../contexts/CategoryContext";
import { ProgramContext } from "../contexts/ProgramContext";
import { FavoriteContext } from "../contexts/FavoriteContext";
import { UserContext } from "../contexts/UserContext";
import { Card, Container, Col, Row } from "react-bootstrap";
import { Tag } from "react-bootstrap-icons";
import styles from "../css/ProgramsByCategory.module.css";

const ProgramsByCategory = (props) => {
  const { category, getCategoryById } = useContext(CategoryContext);
  const { programsByCategory, getProgramsByCategory } = useContext(
    ProgramContext
  );
  const { categoryId } = props.match.params;
  const { user } = useContext(UserContext);
  const { addProgramToFavorites } = useContext(FavoriteContext);
  const history = useHistory();
  useEffect(() => {
    getCategoryById(categoryId);
    getProgramsByCategory(categoryId);
    // eslint-disable-next-line
  }, [categoryId, programsByCategory]);

  const handleClick = (programId) => {
    history.push(`/programs/allprogram/${programId}`);
  };
  const handleOnClickLike = async (e, programId, channelId) => {
    e.stopPropagation();
    let favoriteProgram = {
      programId,
    };
    let result = await addProgramToFavorites(favoriteProgram, channelId);
    if (result.success) {
      console.log(result.success);
    } else {
      console.log(result.error);
    }
  };

  const renderMenuBar = () => {
    return (
      <ul className={styles.menuList}>
        <h2 className="title">{category}</h2>
      </ul>
    );
  };

  const renderPrograms = () => {
    return programsByCategory.map((program) => (
      <Col
        key={program.id}
        xs={12}
        md={12}
        lg={6}
        onClick={() => handleClick(program.id)}
      >
        <Card className={styles.card}>
          <Row>
            <Col xs={3} style={{ padding: "1.25rem" }}>
              <Card.Img src={program.programimagewide} alt={"program image"} />
            </Col>
            <Col xs={7}>
              <Card.Body>
                <Card.Title>{program.name}</Card.Title>
                <Card.Text>
                  <Tag color="gray" size={25} />
                  {program.programcategory["name"]}
                </Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Col>
    ));
  };
  return (
    <div className={styles.programsPage}>
      {renderMenuBar()}
      <hr />
      <Container>
        <Row>{programsByCategory && renderPrograms()}</Row>
      </Container>
    </div>
  );
};
export default ProgramsByCategory;
