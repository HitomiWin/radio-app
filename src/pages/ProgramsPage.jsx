import React, { useContext, useEffect, useState, Suspense } from "react";
import { UserContext } from "../contexts/UserContext";
import { ChannelContext } from "../contexts/ChannelContext";
import { FavoriteContext } from "../contexts/FavoriteContext";
import { Spinner } from "react-bootstrap";
import { HeartFill } from "react-bootstrap-icons";
import styles from "../css/ProgramsPage.module.css";
const ProgramsByChannelId = React.lazy(() =>
  import("../components/ProgramsByCannelId")
);
const ChannelSchedule = React.lazy(() =>
  import("../components/ChannelSchedule")
);

const ProgramsPage = (props) => {
  const { singleChannel, getChannelById } = useContext(ChannelContext);
  const { channelId } = props.match.params;
  const {
    deleteFavoriteChannel,
    addChannelToFavorites,
    favoriteChannelIds,
  } = useContext(FavoriteContext);
  const { user } = useContext(UserContext);
  const [showPrograms, setShowPrograms] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    getChannelById(channelId);
    getFavoriteHeart();
    // eslint-disable-next-line
  }, [favoriteChannelIds, user]);

  const getFavoriteHeart = () => {
    if (favoriteChannelIds && singleChannel) {
      favoriteChannelIds.forEach((channel) => {
        let result = favoriteChannelIds.find(
          (fci) => singleChannel.id === fci.channelId
        );
        if (result) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
      });
    }
  };

  const handleOnclickSchedule = () => {
    setShowPrograms(false);
  };
  const handleOnclickProgram = () => {
    setShowPrograms(true);
  };
  const handleOnClickGrayHeart = async (e, channelId) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
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
    setIsFavorite(!isFavorite);
    deleteFavoriteChannel(e, channelId);
  };

  const renderMenuBar = () => {
    return (
      <ul className={styles.menuList}>
        <li className={styles.listItem}>
          <img
            className={styles.channelImage}
            src={singleChannel.image}
            alt="channel"
          />
        </li>
        <li className={styles.listItem} onClick={() => handleOnclickSchedule()}>
          Tablå
        </li>
        <li className={styles.listItem} onClick={() => handleOnclickProgram()}>
          {singleChannel.name} Program
        </li>
        {user && (
          <li>
            {isFavorite ? (
              <HeartFill
                color="IndianRed "
                size={25}
                onClick={(e) => {
                  handleOnClickRedHeart(e, singleChannel.id);
                }}
              />
            ) : (
              <HeartFill
                color="gray"
                className={styles.heartIcon}
                size={25}
                onClick={(e) => {
                  handleOnClickGrayHeart(e, singleChannel.id);
                }}
              />
            )}       
          </li>
        )}
      </ul>
    );
  };

  return (
    <div className={styles.programPage}>
        {singleChannel && renderMenuBar()}
      <Suspense
        className="text-center"
        fallback={<Spinner animation="border" variant="secondary" />}
      >
        {showPrograms ? (
          <ProgramsByChannelId channelId={channelId} />
        ) : (
          <ChannelSchedule channelId={channelId} />
        )}
      </Suspense>
    </div>
  );
};

export default ProgramsPage;
