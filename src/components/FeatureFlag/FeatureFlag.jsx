import React from 'react';

export default function FeatureFlag({children, feature_name, NewFeature}) {
    const [feature_hash, setFeatureHash] = React.useState('');
    React.useEffect(() => {
        setFeatureHash(window.location.hash.split("#")[1]);
    }, [window.location.hash]);

    const FeatureFlagComponent = () => {
        const toggle_string = feature_hash.split("_")[1];
        const feature_string = feature_hash.split("_")[0];
        if (feature_name === feature_string) {
            if (toggle_string.toLowerCase() === 'on') {
                return <>
                    <NewFeature />
                </>
            }
            if (toggle_string.toLowerCase() === 'off') {
                return <>
                    {children}
                </>
            }
        }
        return (
            <>
                { children }
            </>
        )
    }
    return <FeatureFlagComponent />
}