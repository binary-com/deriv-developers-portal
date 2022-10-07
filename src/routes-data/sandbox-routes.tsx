import React from "react";
import SandboxPage from "../components/global/SandboxPage/SandboxPage";
import { url_base } from "../components/utility/SandboxIframe/SandboxIframe";

let sandbox_routes : Object[] = [];

const implement_now_sandboxes = {
    active_symbols: {
        title: "Active Symbols",
        description: {
            before: <p>Retrieve a list of all currently active symbols (underlying markets upon which contracts are available for trading).</p>,
            after: <p>The data contains market and submarket information related to the symbol. In case you want to retrieve active symbols for a specific landing company, you can add landing_company to the request object.</p>
        }
    },
    contracts_for_symbol: {
        title: "Contracts for Symbol",
        description: {
            before: <p>For a given symbol, get the list of currently available contracts, and the latest barrier and duration limits for each contract.</p>,
            after: <></>
        }
    },
    keep_alive: {
        title: "Keep Alive",
        description: {
            before: <p>In this example you’ll see how to keep a connection alive when getting contract proposals via the Deriv API. This example keeps the connection alive by sending a ping every 30 seconds.</p>,
            after: <></>
        }
    },
    proposal: {
        title: "Price proposal",
        description: {
            before: <p>Gets the latest price for a specific contract.</p>,
            after: <p>This example is for getting a contract proposal. You'll be able to get the price, payout and spot value for your contract. To keep this connection alive in case of inactivity timeouts, see the example for Keep alive.</p>
        }
    },
    ticks: {
        title: "Ticks",
        description: {
            before: <p>A tick is a measure of minimum upward or downward movement in the price of a trading commodity. This example shows you how to collect ticks for your trading app using Deriv's API.</p>,
            after: <p>We start off with an example of ticks, because it is a fairly simple block of code to implement. But, if you plan to develop for example a trading application, it is fundamentally also an important feature.</p>
        }
    },
    ticks_history: {
        title: "Ticks History",
        description: {
            before: <p>With ticks history you are able to get a collection of past tick times and prices.</p>,
            after: 
            <React.Fragment>
                <p>We subscribe to the ticks functionality from the Deriv API websocket to keep track of current and past ticks.</p>
                <p>As an example you could create an interactive tick graph.</p>
            </React.Fragment>
        }
    },
    website_status: {
        title: "Website Status",
        description: {
            before: <p>Request the website status. From the API response you will be able to look into general settings like call limits, currencies information, supported languages and much more.</p>,
            after: <></>
        }
    }
};

export const sandboxRoutes = (type:string) => {
    if (type === "implement_now") {
        implementNowRoutes();
    }
    return sandbox_routes;
}

const implementNowRoutes = () => {
    for (const [key, sandbox] of Object.entries(implement_now_sandboxes)) {
        const route_name = key.replace(/_/g, "-") // spaced words in the URL path use hyphens, not underscores.
        // populate array with route objects
        sandbox_routes = [...sandbox_routes, {
            path: route_name, 
            element: <SandboxPage
                        title={sandbox.title}
                        description={{
                            before: sandbox.description.before,
                            after: sandbox.description.after
                        }}
                        sandbox={`${url_base}${key}`}
                    />
        }];
    }
}
