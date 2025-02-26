import React, { useState } from "react";
import styles from "../styles/MusicDetails.module.css";

const AlbumCover: React.FC<{ albumCoverImage: string; title: string }> = ({
  albumCoverImage,
  title,
}) => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  return (
    <>
      <img
        src={`data:image/jpeg;base64,${albumCoverImage}`}
        alt={title}
        className={styles.albumCover}
        onClick={toggleModal}
      />

      {showModal && (
        <div className={styles.modalOverlay} onClick={toggleModal}>
          <div className={styles.modalContent}>
            <img
              src={`data:image/jpeg;base64,${albumCoverImage}`}
              alt={title}
              className={styles.modalImage}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AlbumCover;
