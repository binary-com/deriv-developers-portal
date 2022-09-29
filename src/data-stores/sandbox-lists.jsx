const implement_now_sandboxes = ["active_symbols", "keep_alive", "proposal", "ticks", "ticks_history", "website_status"];

export const sandboxRoutes = (type) => {
    let sandbox_list = {};
    if (type === "implement_now") {
        for (const sandbox of implement_now_sandboxes) {
            // spaced route names (values) use hyphens, not underscores.
            const route_name = sandbox.replace(/_/g, "-")
            sandbox_list[sandbox] = { 
                path: route_name, 
                element: <div>{sandbox}</div>
            };
        }
    }
    // if (type === "complex") {
    //     //implement complex sandboxes
    // }
    // if (type === "all") {
    //     // all sandboxes
    // }
    return sandbox_list;
}