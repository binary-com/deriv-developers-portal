import { useSelector } from '@xstate/react';
import { stateService } from '../../../state/stateSignal';
import { isThirdPartyHostSelector } from '../../../state/selectors';

export const RenderOfficialDomainContents = ({ Component }) => {
    const is_third_party_host = useSelector(stateService, isThirdPartyHostSelector);

    return is_third_party_host ? <></> : <Component />;
};
