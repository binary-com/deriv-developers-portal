import SandboxPage from "../components/global/SandboxPage/SandboxPage";
import { url_base } from "../components/utility/SandboxIframe/SandboxIframe";

let sandbox_routes : Object[] = [];
const implement_now_sandboxes = ["active_symbols", "keep_alive", "proposal", "ticks", "ticks_history", "website_status"];

const implementNowRoutes = () => {
    for (const sandbox of implement_now_sandboxes) {
        // prep variables
        const rest = sandbox.replace(/_/g, " ").slice(1);
        const uppercase_first_char = sandbox[0].toUpperCase();

        // main variables
        const route_name = sandbox.replace(/_/g, "-") // spaced route names use hyphens, not underscores.
        const sandbox_title = `${uppercase_first_char}${rest}`;

        // populate array with route objects
        sandbox_routes = [...sandbox_routes, { 
            path: route_name, 
            element: <SandboxPage
                        title={sandbox_title}
                        description={'this is just a test'}
                        sandbox={`${url_base}${sandbox}`}
                    />
        }];
    }
}

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