import React from 'react';
import SandboxPage from '../components/global/SandboxPage/SandboxPage';
import { url_base } from '../components/utility/SandboxIframe/SandboxIframe';

const implement_now_sandboxes = {
    ticks_history: {
        title: 'Ticks History',
        description: {
            before: <p>With ticks history you are able to get a collection of past tick times and prices.</p>,
            after: (
                <React.Fragment>
                    <p>
                        We subscribe to the ticks functionality from the Deriv API websocket to keep track of current
                        and past ticks.
                    </p>
                    <p>As an example you could create an interactive tick graph.</p>
                </React.Fragment>
            ),
        },
    },
    active_symbols: {
        title: 'Active Symbols',
        description: {
            before: (
                <p>
                    Retrieve a list of all currently active symbols (underlying markets upon which contracts are
                    available for trading).
                </p>
            ),
            after: (
                <p>
                    The data contains market and submarket information related to the symbol. In case you want to
                    retrieve active symbols for a specific landing company, you can add landing_company to the request
                    object.
                </p>
            ),
        },
    },
    contracts_for_symbol: {
        title: 'Contracts for Symbol',
        description: {
            before: (
                <p>
                    For a given symbol, get the list of currently available contracts, and the latest barrier and
                    duration limits for each contract.
                </p>
            ),
            after: null,
        },
    },
    website_status: {
        title: 'Website Status',
        description: {
            before: (
                <p>
                    Request the website status. From the API response you will be able to look into general settings
                    like call limits, currencies information, supported languages and much more.
                </p>
            ),
            after: null,
        },
    },
    proposal: {
        title: 'Proposal',
        description: {
            before: <p>Gets the latest price for a specific contract.</p>,
            after: (
                <p>
                    This example is for getting a contract proposal. You'll be able to get the price, payout and spot
                    value for your contract. To keep this connection alive in case of inactivity timeouts, see the
                    example for Keep alive.
                </p>
            ),
        },
    },
    keep_alive: {
        title: 'Keep Alive',
        description: {
            before: (
                <p>
                    In this example you'll see how to keep a connection alive when getting contract proposals via the
                    Deriv API. This example keeps the connection alive by sending a ping every 30 seconds.
                </p>
            ),
            after: null,
        },
    },
};

// future sandbox route objects can be added and filtered from this sandboxes object.
const sandboxes = {
    implement_now: implement_now_sandboxes,
};

// This function will return an object of selected (path parameter) sandbox page routes
export const sandboxRoutes = path => {
    let sandbox_routes = [];
    const path_converted_to_key = path.replace(/-/g, '_');
    const sandbox_keys = Object.keys(sandboxes);
    const path_is_sandbox_key = sandbox_keys.includes(path_converted_to_key);
    const sandbox_entries = Object.entries(sandboxes[path_converted_to_key]);
    if (path_is_sandbox_key) {
        for (const [key, sandbox] of sandbox_entries) {
            const path_name = key.replace(/_/g, '-'); // spaced words in the URL path use hyphens, not underscores.
            // populate array with route objects (array of objects)
            sandbox_routes = [
                ...sandbox_routes,
                {
                    path: path_name,
                    label: sandbox?.title,
                    element: (
                        <SandboxPage
                            title={sandbox?.title}
                            description={{
                                before: sandbox?.description?.before,
                                after: sandbox?.description?.after,
                            }}
                            sandbox={`${url_base}${key}`}
                        />
                    ),
                },
            ];
        }
    }
    return sandbox_routes;
};
