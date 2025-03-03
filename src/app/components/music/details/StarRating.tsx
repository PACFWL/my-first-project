import React from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import styles from "../../../styles/music/MusicDetails.module.css";

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating); 
  const hasHalfStar = rating % 1 !== 0; 
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); 

  return (
    <span className={styles.starContainer}>
      {Array(fullStars).fill(null).map((_, i) => <FaStar key={i} className={styles.star} />)}
      {hasHalfStar && <FaStarHalfAlt className={styles.star} />} 
      {Array(emptyStars).fill(null).map((_, i) => <FaRegStar key={i + fullStars + 1} className={styles.star} />)}
    </span>
  );
};

export default StarRating;
