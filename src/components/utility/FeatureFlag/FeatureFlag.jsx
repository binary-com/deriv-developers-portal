import React from 'react';
import { useUrlParams } from '../../../custom-hooks/useUrlParams';

export default function FeatureFlag({ children, is_feature, feature_name }) {
    const [selected_child, setSelectedChild] = React.useState(0);
    const url_params = useUrlParams();

    const FeatureFlagComponent = () => {
        if (is_feature) setSelectedChild(1);
        url_params.forEach(param => {
            const param_name = param[0];
            const toggle = param[1];
            if (!is_feature && param_name === feature_name) {
                // The second child in the children array should always be the new feature component.
                if (toggle.toLowerCase() === 'on') {
                    setSelectedChild(1);
                }
                // The first child should be the default (current) component.
                if (toggle.toLowerCase() === 'off') {
                    setSelectedChild(0);
                }
            }
        });
        return <React.Fragment>{children[selected_child]}</React.Fragment>;
    };

    return <FeatureFlagComponent />;
}
