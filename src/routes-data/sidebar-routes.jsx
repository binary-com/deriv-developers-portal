import { Link } from "react-router-dom";

// Filter route objects with key + value pair (Object.entries);
export const getting_started = [
    {
        path: 'implement-now',
        label: 'Implement Now',
        children: [
            {
                path: 'child',
                label: 'Child Nest',
                children: [
                    {
                        path: 'child-child',
                        element: <div>This is a child of getting starteeeeeeeeed</div>,
                        label: "child-child1",
                    },
                    {
                        path: 'child',
                        label: 'Child Nest',
                        children: [
                            {
                                path: 'child-child',
                                element: <div>This is a child of getting starteeeeeeeeed</div>,
                                label: "child-child1",
                            },
                            {
                                path: 'child-child',
                                element: <div>This is a child of getting starteeeeeeeeed</div>,
                                label: "child-child1",
                            }
                        ],
                    }
                ]
            },
        ]
    },
    {
        path: 'something',
        label: 'Something',
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
const rest = [
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

// Stitching all the arrays together to one route object for the Router.
export const sidebar_routes = [...getting_started, ...what_can_you_do, ...resources, ...rest];

function LinkComponent({route, path}) {
    return (
        <div key={route.label}>
            { route.children ? (
                <div className=''>{route.label}</div>
            ) : (
                <Link to={path} className="menu-item">{route.label}</Link>
            )
            }
            { route.children && route.children.map(child => {
                // If there are children, recursively go over the nested children 
                // till there are none anymore.
                return (
                    <div> 
                        <LinkComponent route={child} path={`${path}/${child.path}`} /> 
                    </div>
                )})
            }
        </div>
    )
}

export const SidebarMenuItems = ({routes}) => {
    const routes_array = Object.values(routes);
    const map_links = Object.entries(routes_array).map(items => {
        const route = items[1];
        return (
            <>
                <LinkComponent route={route} path={route.path} />
            </>
        )
    })
    return map_links;
}
