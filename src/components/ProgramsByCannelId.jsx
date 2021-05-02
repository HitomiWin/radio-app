import  { useContext, useEffect } from "react";
import { ProgramContext } from "../contexts/ProgramContext";
import Back from "./Back";
import ProgramCard from "./ProgramCard";
import {useHistory} from "react-router-dom"
import { Container, Row} from "react-bootstrap";
import styles from "../css/ProgramsPage.module.css"

const ProgramsByChannelId=(props)=> {
  const { programs, getProgramsByChannelId } = useContext( ProgramContext );
  const history =useHistory();

  useEffect(()=>{
    getProgramsByChannelId(props.channelId);
         // eslint-disable-next-line
  },[props.channelId, programs]);

  return (
    <div className={styles.programs}>
      <Back />      
      <h2 >Program A-Ö</h2>
      <hr />
      <Container >
      <Row >      
      {programs && 
      programs.map((program)=>(
        <ProgramCard key ={program.id} program={program} />
      ))
    }
      </Row> 
      </Container>
    </div>
  )
}

export default ProgramsByChannelId
