import styles from './HomepageSlider.module.scss';

export const Slide = ({ content, author }) => {
  return (
    <div className={`${styles.slide}`}>
      <blockquote className="content">{content}</blockquote>
      <hr className={styles.blockquoteSeparator} />
      <p className={styles.blockquoteAuthor}>{author}</p>
    </div>
  );
}
