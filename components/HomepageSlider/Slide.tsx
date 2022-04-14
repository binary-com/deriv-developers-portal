import styles from "./HomepageSlider.module.scss";

export default function Slide({ content, author }) {
    return (
        <div className={`${styles.slide}`}>
            <blockquote className="content">
                {content}
            </blockquote>
            <hr className="blockquote-separator" />
            <p className="blockquote-author">{author}</p>
        </div>
    );
}
