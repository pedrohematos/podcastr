import format from "date-fns/format";
import enUS from "date-fns/locale/en-US";

import styles from "./styles.module.scss";

const Header = () => {
  const currentDate = format(new Date(), "E, d MMMM", {
    locale: enUS,
  });

  return (
    <header className={styles.headerContainer}>
      <img src="/logo.svg" alt="Podcaster" />

      <p>The best for you to hear, always!</p>

      <span>{currentDate}</span>
    </header>
  );
};

export default Header;
