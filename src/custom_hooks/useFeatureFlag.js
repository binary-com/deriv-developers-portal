import React from "react";

export function useFeatureFlag({feature_toggle, NewFeature, children}) {
    const [feature_hash, setFeatureHash] = React.useState('');
    React.useEffect(() => {
        setFeatureHash(window.location.hash);
    }, [window.location.hash]);

    const FeatureFlagComponent = () => {
        const toggle_string = feature_toggle.split("_")[1];
        const feature_string = feature_toggle.split("_")[0];
        if (feature_hash === feature_string) {
            if (toLowerCase(toggle_string) === 'on') {
                <>
                    { NewFeature }
                </>
            }
            if (toLowerCase(toggle_string) === 'off') {
                <>
                    { children }
                </>
            }
        }
        <>
            { children }
        </>
    }

    return <FeatureFlagComponent />

}
