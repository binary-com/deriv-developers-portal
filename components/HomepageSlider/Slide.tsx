export default function Slide({content, author}) {
    return (
        <div className="slide">
            <blockquote className="content">
                {content} adsfadadfadfadsfadsf
            </blockquote>
            <hr className="blockquote-separator" />
            <p className="blockquote-author">{author}</p>
        </div>
    );
}