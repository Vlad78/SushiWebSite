import { ResponseWrapper, Story } from "@/types";
import styles from "./styles/stories.module.scss";
import Image from "next/image";

const Stories: React.FC<ResponseWrapper<Story>> = ({ data }) => {
  const size = {
    width: 135,
    height: 155,
  };

  return (
    <div className={`${styles["stories-container"] + " " + styles.mask}`}>
      {data.map((e) => {
        const imgPromt = e.attributes.img.data[0].attributes;
        return (
          <div
            className={styles["story-content"]}
            key={e.id}
            style={{ ...size, minWidth: size.width }}
          >
            <div className={styles["story-img"]}>
              <Image src={imgPromt.formats.small.url} alt={e.attributes.title} {...size} />
              <div
                className={`${styles["story-text"]} sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs`}
              >
                {/* {e.attributes.title} */}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stories;
