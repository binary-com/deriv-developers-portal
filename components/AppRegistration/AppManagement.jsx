/* eslint-disable react/jsx-key */ 

import { useMemo, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import '../../AppRegistration.scss';
import styles from './AppManagement.module.scss';
import { useApps } from '../../custom_hooks/useApps';
import SkeletonText from '../SkeletonText/SkeletonText';
import AppManagementEmptyLazy from './AppManagementEmptyLazy';
import DeleteAppDialog from './DeleteAppDialog';
import { useDeleteApp } from '../../custom_hooks/useDeleteApp';
import { setUpdatingRow, stateService } from '../../stateSignal';

export default function AppManagement() {
    const [app_id, setAppId] = useState(null);
    const { deleteApp } = useDeleteApp(app_id);
    const { data, isLoading } = useApps();
    const table_data = useMemo(() => data?.app_list || [], [data]);
    const columns = useMemo(() => ([
        {
            Header: "Users",
            accessor: "name",
        },
        {
            Header: "Application ID",
            accessor: "app_id",
        },
        {
            Header: "Scopes",
            accessor: "scopes",
            Cell: ({ cell: { value } }) => (value.join(', '))
        },
        {
            Header: "Redirect URL",
            accessor: "redirect_uri",
        },
        {
            Header: "",
            accessor: "actions",
            disableSortBy: true,
            Cell: ({ row }) => {
                const app_id = row.original.app_id;
                const triggerModal = () => {
                    setAppId(app_id);
                    stateService.send('DELETE_APP');
                }
                const updateAppTrigger = () => {
                    stateService.send('GO_UPDATE_MODE');
                    setUpdatingRow(row.original);
                };
                return (<div className={styles.appActions}>
                    <div onClick={updateAppTrigger} className={styles.updateApp} />
                    <div onClick={triggerModal} className={styles.deleteApp} />
                </div>)
            }
        },
    ]), []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data: table_data,
    }, useSortBy);

    return (
        <>
    <div className={styles.manageApps}>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render("Header")}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? '↓'
                                                : '↑'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {isLoading && <SkeletonRows />}
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
        <DeleteAppDialog deleteApp={deleteApp} />
        <AppManagementEmptyLazy />
        </>
    );
}

const SkeletonRows = () => {
    const Skeleton = () => (<tr>
        <td><SkeletonText /></td>
        <td><SkeletonText /></td>
        <td><SkeletonText /></td>
        <td><SkeletonText /></td>
        <td><SkeletonText /></td>
    </tr>);
    // return 5 skeletons
    return [...Array(5)].map((_, i) => <Skeleton key={i} />);
}

