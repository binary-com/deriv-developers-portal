import React, { useState, useEffect } from 'react';
import CodeContent from './CodeContent';
import CopyButton from './CopyButton';
import styles from './CodeBlock.module.scss';

const CodeBlock = ({ id }) => {
    const [file_content, setFileContent] = useState(' ');
    useEffect(() => {
        const file_path = `/demos/demos/${id}-javascript.jscode`;
        fetch(file_path)
            .then(response => response.text())
            .then(data => {
                const formatted_code = data.replaceAll('&lt;', '<').replaceAll('&gt;', '>');
                setFileContent(formatted_code);
            });
    }, [id]);

    return (
        <div className={styles.codeBlock}>
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <p className={styles.cardTitle}>Javascript</p>
                    <CopyButton size='16' content_to_copy={file_content} />
                </div>
                <CodeContent lang='javascript' data={file_content} />
            </div>
        </div>
    );
};

export default CodeBlock;
