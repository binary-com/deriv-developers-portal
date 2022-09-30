import { Link } from "react-router-dom";

// Filter route objects with key + value pair (Object.entries);
export const getting_started = [
    {
        path: 'implement-now',
        element: <div>This is getting started</div>,
        label: "Implement Now",
        children: [
            {
                path: 'child',
                element: <div>This is a child of getting started</div>,
                label: "child",
                children: [
                   {
                    path: 'child-child',
                    element: <div>This is a child of getting started</div>,
                    label: "child-child1",
                   } 
                ]
            },
            {
                path: 'child2',
                element: <div>This is a child of getting started</div>,
                label: "child2",
            },
            {
                path: 'child3',
                element: <div>This is a child of getting started</div>,
                label: "child3",
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

function LinkComponent({route}) {
    return (
        <div key={route.label}>
            <Link to={route.path}>{route.label}</Link>
            { route.children && route.children.map(child => {
                return (
                    <div className="menu-child"> 
                        <LinkComponent route={child} /> 
                    </div>
                )})
            }
        </div>
    )
}

export const SidebarMenuItems = ({routes}) => {
    const routes_array = Object.values(routes);
    // console.log(...routes_array);
    const map_links = Object.entries(routes_array).map(items => {
        const route = items[1];
        return (
            <>
                <LinkComponent route={route} />
            </>
        )
    })
    return map_links;
}
