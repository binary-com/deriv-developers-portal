import { useSelector } from '@xstate/react';
import styles from './ApiGuide.module.scss';
import Navigator from './Navigator/Navigator';
import { DerivGuideContent } from './DerivGuideContent/DerivGuideContent';
import { RenderOfficialDomainContents } from '../../utility/RenderOfficialDomainContents/RenderOfficialDomainContents';

import { isMobileSelector } from '../../../state/selectors';
import { stateService } from '../../../state/stateSignal';

import howAPIWorksUrl from '../../../../img/how-api-works.png';

export default function ApiGuide() {
    const isMobile = useSelector(stateService, isMobileSelector);
    return (
        <div className={styles.apiGuide} data-id='api-guide'>
            {!isMobile && <RenderOfficialDomainContents Component={Navigator} />}
            <div className={styles.apiGuideContent}>
                <h1>API guide</h1>
                {isMobile && <RenderOfficialDomainContents Component={Navigator} />}
                <div className={styles.textBlock}>
                    <h2 id='what-is-api'>What is API?</h2>
                    <p>
                        API stands for Application Programming Interface - a software that allows 2 or more computer
                        programs to communicate with each other. These 2 programs are usually referred to as server and
                        client.
                    </p>
                    <ul>
                        <li>
                            <strong>Server</strong>
                            <p>
                                A server contains information required by a client, can grant access to this
                                information, and performs actions with it.
                            </p>
                            <p>
                                {' '}
                                The server defines how it should be spoken to, what actions it will perform, what
                                information it will give, and its format.{' '}
                            </p>
                            <p>
                                {' '}
                                All these details are usually determined in an API specification. For example, here is
                                the{' '}
                                <a href='https://developer.twitter.com/en/docs/twitter-api'>
                                    API specification for Twitter
                                </a>
                                .
                            </p>
                        </li>
                        <li>
                            <strong>Client</strong>
                            <p>
                                {' '}
                                A client is a software program that talks to the server to either obtain information or
                                ask the server to perform certain actions.{' '}
                            </p>
                            <p>
                                {' '}
                                Clients can be written in any programming language as long as that language can
                                implement the communication standards specified by the server.{' '}
                            </p>
                            <p>
                                {' '}
                                The communication between a server and a client happens with the help of API requests,
                                also known as API calls. The API calls are sent from a client to a server and back. The
                                client and server can be written in different programming languages.{' '}
                            </p>
                        </li>
                    </ul>
                    <p>Here is a representation of how an API works:</p>
                    <div className={styles.apiGuideImage}>
                        <img src={howAPIWorksUrl} alt='How API works' loading='lazy' />
                    </div>
                    <h3>Client libraries</h3>
                    <p>
                        {' '}
                        Client libraries are pre-written pieces of code that can be used to send API calls instead of
                        writing codes from scratch.{' '}
                    </p>
                    <p>
                        {' '}
                        Using a client library is optional but highly recommended, as it makes it much easier and
                        efficient to start working with the API.{' '}
                    </p>
                    <p>
                        {' '}
                        For example, configuring the correct protocol to talk to the server may require several steps
                        without the client library, but using a ready-made code can shorten the process to just one
                        step.{' '}
                    </p>
                    <p>
                        {' '}
                        A client library also makes it easier to adapt to API updates. In many cases, if the API has a
                        significant update, the client library is updated too. The developer of the client that uses API
                        won’t need to make any changes to their code and will just need to update the version of the
                        client library.{' '}
                    </p>
                </div>
                <RenderOfficialDomainContents Component={DerivGuideContent} />
            </div>
        </div>
    );
}
