import { Link } from "react-router-dom";

// Filter route objects with key + value pair (Object.entries);
export const getting_started = [
    {
        path: 'implement-now',
        element: <div>This is getting started</div>,
        label: "Implement Now",
        children: [
            {
                path: 'ticks',
                element: <div>This is a child of getting started</div>,
                label: "Ticks",
            }
        ]
    },
    {
        path: 'something',
        element: <div>This is a test</div>,
        label: "random menu item",
        children: [
            {
                path: 'bla',
                element: <div>This is a child of random</div>,
                label: "blabla",
            }
        ]
    }
];
const what_can_you_do = [];
const resources = [];
const rest = [];

function LinkComponent({route, children}) {
    const child_links = Object.entries(children).map(items => {
        const has_children = items.children;
        const route = items[1];
            return (
                <div key={route.label}>
                    <Link to={route.path}>{route.label}</Link>
                    { has_children && <LinkComponent route={children} children={has_children} /> }
                </div>
            )
    })
    return child_links;
}

export const SidebarMenuItems = ({routes}) => {
    let menu_items = [];
    const routes_array = Object.values(routes);
    // console.log(...routes_array);
    const map_links = Object.entries(routes_array).map(items => {
        const route = items[1];
        const has_children = route.children;
        return (
            <>
                <LinkComponent route={route} children={has_children} />
            </>
        )
    })
    return map_links;
}
