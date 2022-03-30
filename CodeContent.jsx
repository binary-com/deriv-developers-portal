import React,{ useState, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-markup-templating.js";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-php";
import "prismjs/components/prism-json";
import "prismjs/plugins/custom-class/prism-custom-class.js";
import styles from "./Quickstart.module.scss";

const CodeContent = ({ lang, data }) => {
    const useIsMounted = () => {
      const is_mounted = React.useRef(false);
    
      React.useEffect(() => {
          is_mounted.current = true;
    
          return () => {
              is_mounted.current = false;
          };
      }, []);
      return () => is_mounted.current;
    };
  
    const [showdata, setshowdata] = useState(false)
    const isMounted = useIsMounted()
    useEffect(() => {
      if (isMounted()) {
        setshowdata(true)
        Prism.highlightAll()
      }
    }, [lang, data, isMounted])
  
    Prism.plugins.customClass.add(({ content, language }) => {
      if (content === "function") {
        return "storage-function"
      }
      if (content === "&lt;?php") {
        return "operator-php"
      }
      if (language === "json") {
        return "json"
      }
    })
  
    return (
      <>
        {showdata && (
          <pre className={styles.pre}>
            <code className={`language-${lang}`}>{data}</code>
          </pre>
        )}
      </>
    )
  }
  
  export default CodeContent



