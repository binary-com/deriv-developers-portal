import React from "react";

export function useFeatureFlag({feature_toggle, NewFeature, children}) {
    const [feature_hash, setFeatureHash] = React.useState('');
    React.useEffect(() => {
        setFeatureHash(window.location.hash);
    }, [window.location.hash]);

    const FeatureFlagComponent = () => {
        if (feature_hash === feature_toggle) {
            const toggle_string = text.split("_")[1];
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
    }

    return (
        <>
            <FeatureFlagComponent />
        </>
    )

}
