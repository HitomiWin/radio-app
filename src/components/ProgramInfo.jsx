import { useContext } from "react";
import { ProgramContext } from "../contexts/ProgramContext";
import { Card } from "react-bootstrap";
import Back from "./Back"
// import { Tag } from "react-bootstrap-icons";
import styles from "../css/ProgramInfo.module.css";
const ProgramInfo = () => {
  const { program } = useContext(ProgramContext);
  const renderProgram = () => {
    return (
      <Card className={styles.card}>
        <Card.Header as="h5">Om Program</Card.Header>
        <Card.Body>
          <Card.Title>{program.name}</Card.Title>
          <Card.Text>{program.description}</Card.Text>
          <div className={styles.info}>
            <p>Broadcastinfo: {program.broadcastinfo}</p>
          </div>
          <div className={styles.info}>
            <span>Email: {program.email}</span>
          </div>
        </Card.Body>
      </Card>
    );
  };

  return ( 
    <div  >
    <Back /> 
    <div className={styles.programinfo}>
      {program && renderProgram()}
    </div>

    </div>
  ) 
};
export default ProgramInfo;
