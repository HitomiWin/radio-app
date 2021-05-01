import React, { useContext, useEffect, useState, Suspense } from "react";
import { UserContext } from "../contexts/UserContext";
import { ProgramContext } from "../contexts/ProgramContext";
import { FavoriteContext } from "../contexts/FavoriteContext";
import { Spinner } from "react-bootstrap";
import { Heart, HeartFill } from "react-bootstrap-icons";
import styles from "../css/ProgramsPage.module.css";
const ProgramInfo = React.lazy(() => import("../components/ProgramInfo"));

const ProgramPage = (props) => {
  const { program, getProgramByProgramId } = useContext(ProgramContext);
  const { programId } = props.match.params;
  const {
    favoriteProgramIds,
    addProgramToFavorites,
    deleteFavoriteProgram,
  } = useContext(FavoriteContext);
  const { user } = useContext(UserContext);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    getProgramByProgramId(programId);
    getFavoriteHeart();
    // eslint-disable-next-line
  }, [user]);
  useEffect(() => {
    getFavoriteHeart();
  }, [programId, favoriteProgramIds]);

  const getFavoriteHeart = () => {
    if (favoriteProgramIds && program) {
      let result = favoriteProgramIds.find((fpi) => fpi.programId == programId);
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

  const renderMenuBar = () => {
    return (
      <ul className={styles.menuList}>
        <li className={styles.listItem}>
          <img
            className={styles.channelImage}
            src={program.programimagewide}
            alt="program"
          />
        </li>
        <li className={styles.programName}>{program.name}</li>
        {user && (
          <li>
            {isFavorite ? (
              <HeartFill
                color="IndianRed"
                size={25}
                onClick={(e) => {
                  handleOnClickRedHeart(e, program.id);
                }}
              />
            ) : (
              <Heart
                color="gray"
                className={styles.heartIcon}
                size={25}
                onClick={(e) => {
                  handleOnClickGrayHeart(e, program.id);
                }}
              />
            )}
          </li>
        )}
      </ul>
    );
  };

  return (
    <Suspense
      className="text-center"
      fallback={<Spinner animation="border" variant="secondary" />}
    >
      {program && renderMenuBar()}
      {program && <ProgramInfo />}
    </Suspense>
  );
};

export default ProgramPage;
