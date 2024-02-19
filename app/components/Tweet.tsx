import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileImage,
  faMapMarkerAlt,
  faGrin,
  faUser,
  faGlobeAsia,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import styles from "./tweet.module.css";

type Props = {
  tweet: string;
  imageSrc?: string;
};

const Tweet: React.FC<Props> = ({ tweet, imageSrc }) => {
  const postTweet = () => {
    window.open(`https://twitter.com/compose/post?text=${tweet}`, "_blank");
  };

  return (
    <div className={styles.tweetWrapper}>
      <div className={styles.inputBox}>
        <textarea className={styles.tweetArea} value={tweet} readOnly />
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={tweet}
            width={475}
            height={475}
            className={styles.image}
          />
        )}
        <div className={styles.privacy}>
          <FontAwesomeIcon icon={faGlobeAsia} />
          <span>Everyone can reply</span>
        </div>
      </div>
      <div className={styles.bottom}>
        <ul className={styles.icons}>
          <li>
            <FontAwesomeIcon icon={faFileImage} />
          </li>
          <li>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </li>
          <li>
            <FontAwesomeIcon icon={faGrin} />
          </li>
          <li>
            <FontAwesomeIcon icon={faUser} />
          </li>
        </ul>
        <div className={styles.content}>
          <span className={styles.counter}>{tweet.length}</span>
          <button className={styles.tweetButton} onClick={() => postTweet()}>
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
