import SandboxPage from "../components/global/SandboxPage/SandboxPage";
import { url_base } from "../components/utility/SandboxIframe/SandboxIframe";

let sandbox_routes : Object[] = [];
const implement_now_sandboxes = {
    active_symbols: {
        description: {
            before: "something",
            after: "something"
        }
    }, 
    keep_alive: {
        description: {
            before: "something",
            after: "something"
        }
    },
    proposal: {
        description: {
            before: "something",
            after: "something"
        }
    },
    ticks: {
        description: {
            before: "something",
            after: "something"
        }
    },
    ticks_history: {
        description: {
            before: "something",
            after: "something"
        }
    },
    website_status: {
        description: {
            before: "something",
            after: "something"
        }
    }
};

export const sandboxRoutes = (type:string) => {
    if (type === "implement_now") {
        implementNowRoutes();
    }
    // if (type === "complex") {
    //     //implement complex sandboxes
    // }
    // if (type === "all") {
    //     // all sandboxes
    // }
    return sandbox_routes;
}

const implementNowRoutes = () => {
    for (const [key, sandbox] of Object.entries(implement_now_sandboxes)) {
        // prep variables
        const rest = key.replace(/_/g, " ").slice(1);
        const uppercase_first_char = key[0].toUpperCase();

        // main variables
        const route_name = key.replace(/_/g, "-") // spaced route names use hyphens, not underscores.
        const sandbox_title = `${uppercase_first_char}${rest}`;

        // populate array with route objects
        sandbox_routes = [...sandbox_routes, { 
            path: route_name, 
            element: <SandboxPage
                        title={sandbox_title}
                        description={{
                            before: sandbox.description.before,
                            after: sandbox.description.after
                        }}
                        sandbox={`${url_base}${key}`}
                    />
        }];
    }
}
