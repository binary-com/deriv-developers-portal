import styles from './Navigator.module.scss';
export default function NavigatorContent({ nav_object }) {

    const GenerateLinks = () => {
        const navigation_data = Object.entries(nav_object);
        return (
            <>
                {
                    navigation_data.map((item) => {
                        const key = item[0]
                        const value = item[1];
                        const href_id = `#${key}`
                        const text = String(value);
                        return (
                            <a key={key} className={styles.navigatorLink} href={href_id}>
                                {text}
                            </a>
                        )
                    })
                }
            </>
        )
    }

    return (
        <GenerateLinks />
    )
}
