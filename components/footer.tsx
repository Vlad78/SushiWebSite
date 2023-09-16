import styles from "./styles/footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <p>Legal information line 1</p>
        <p>Legal information line 2</p>
        <p>Legal information line 3</p>
        <p>Legal information line 4</p>
        <p>Legal information line 5</p>
        <p>&copy; 2023 LLC Timas, Poland. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
