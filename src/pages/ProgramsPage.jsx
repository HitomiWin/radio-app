import React, { useContext, useEffect, useState, Suspense } from "react";
import { UserContext } from "../contexts/UserContext";
import { ChannelContext } from "../contexts/ChannelContext";
import { FavoriteContext } from "../contexts/FavoriteContext";
import { Spinner } from "react-bootstrap";
import { Heart, HeartFill } from "react-bootstrap-icons";
import styles from "../css/ProgramsPage.module.css";
const ProgramsByChannelId = React.lazy(() =>
  import("../components/ProgramsByCannelId")
);
const ChannelSchedule = React.lazy(() =>
  import("../components/ChannelSchedule")
);

const ProgramsPage = (props) => {
  const { channelId } = props.match.params;
  const { singleChannel, getChannelById } = useContext(ChannelContext);
  const {
    deleteFavoriteChannel,
    addChannelToFavorites,
    favoriteChannelIds,
  } = useContext(FavoriteContext);
  const { user } = useContext(UserContext);
  const [showPrograms, setShowPrograms] = useState(true);
  const [isChannelFavorite, setIsChannelFavorite] = useState(false);

  useEffect(() => {
    getChannelById(channelId);
    // eslint-disable-next-line
  }, [user]);
  useEffect(() => {
    getFavoriteHeart();
    // eslint-disable-next-line
  }, [channelId, favoriteChannelIds]);

  const getFavoriteHeart = () => {
    if (favoriteChannelIds && singleChannel) {
      let result = favoriteChannelIds.find(
        (fci) => fci.channelId == singleChannel.id
      );
      if (result) {
        setIsChannelFavorite(true);
      } else {
        setIsChannelFavorite(false);
      }
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
        <li
          className={`${styles.listItem} ${
            showPrograms ? styles.inactive : styles.active
          }`}
          onClick={() => handleOnclickSchedule()}
        >
          Tablå
        </li>
        <li
          className={`${styles.listItem} ${
            showPrograms ? styles.active : styles.inactive
          }`}
          onClick={() => handleOnclickProgram()}
        >
          {singleChannel.name} Program
        </li>
        {user && (
          <li>
            {isChannelFavorite ? (
              <HeartFill
                color="IndianRed "
                size={25}
                onClick={(e) => {
                  handleOnClickRedHeart(e, singleChannel.id);
                }}
              />
            ) : (
              <Heart
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
