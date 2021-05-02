import { useContext, useEffect } from "react";
import { CategoryContext } from "../contexts/CategoryContext";
import { ProgramContext } from "../contexts/ProgramContext";
import ProgramCard from "../components/ProgramCard";
import { Container, Row } from "react-bootstrap";
import styles from "../css/ProgramsByCategory.module.css";

const ProgramsByCategory = (props) => {
  const { category, getCategoryById } = useContext(CategoryContext);
  const { programsByCategory, getProgramsByCategory } = useContext(
    ProgramContext
  );
  const { categoryId } = props.match.params;

  useEffect(() => {
    getCategoryById(categoryId);
    getProgramsByCategory(categoryId);
    // eslint-disable-next-line
  }, [categoryId, programsByCategory]);

  const renderMenuBar = () => {
    return <h2 className="title">{category}</h2>;
  };
  return (
    <div className={styles.programsPage}>
      {renderMenuBar()}
      <hr />
      <Container>
        <Row>
          {programsByCategory &&
            programsByCategory.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
        </Row>
      </Container>
    </div>
  );
};
export default ProgramsByCategory;
