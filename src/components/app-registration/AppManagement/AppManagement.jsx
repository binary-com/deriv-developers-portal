/* eslint-disable react/jsx-key */
import React from 'react';
import { useMemo, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import '../AppRegistration/AppRegistration.scss';
import styles from './AppManagement.module.scss';
import { useApps } from '../../../custom-hooks/useApps';
import SkeletonText from '../../global/SkeletonText/SkeletonText';
import AppManagementEmptyLazy from './AppManagementEmpty/AppManagementEmptyLazy';
import DeleteAppDialog from '../AppRegistration/AppRegistrationForm/DeleteAppDialog/DeleteAppDialog';
import { useDeleteApp } from '../../../custom-hooks/useDeleteApp';
import { setUpdatingRow, stateService } from '../../../state/stateSignal';

export default function AppManagement() {
    const [app_id, setAppId] = useState(null);
    const { deleteApp } = useDeleteApp(app_id);
    const { data, isLoading } = useApps();
    const table_data = useMemo(() => data?.app_list || [], [data]);
    const columns = useMemo(
        () => [
            {
                Header: 'Application Name',
                accessor: 'name',
            },
            {
                Header: 'Application ID',
                accessor: 'app_id',
            },
            {
                Header: 'Scopes',
                accessor: 'scopes',
                Cell: ({ cell: { value } }) => <Scopes values={value} />,
            },
            {
                Header: 'Redirect URL',
                accessor: 'redirect_uri',
            },
            {
                Header: '',
                accessor: 'actions',
                disableSortBy: true,
                Cell: ({ row }) => {
                    const app_id = row.original.app_id;
                    const triggerModal = () => {
                        setAppId(app_id);
                        stateService.send('DELETE_APP');
                    };
                    const updateAppTrigger = () => {
                        stateService.send('GO_UPDATE_MODE');
                        setUpdatingRow(row.original);
                    };
                    return (
                        <div className={styles.appActions}>
                            <div onClick={updateAppTrigger} className={`${styles.updateApp} ${styles.tooltip}`}>
                                <span className={styles.tooltipText}>Edit application details</span>
                            </div>
                            <div onClick={triggerModal} className={`${styles.deleteApp} ${styles.tooltip}`}>
                                <span className={styles.tooltipText}>Delete application</span>
                            </div>
                        </div>
                    );
                },
            },
        ],
        []
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
        {
            columns,
            data: table_data,
        },
        useSortBy
    );

    return (
        <React.Fragment>
            <div className={styles.manageApps}>
                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        <span>{column.isSorted ? (column.isSortedDesc ? '↓' : '↑') : ''}</span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {isLoading && <SkeletonRows />}
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <DeleteAppDialog deleteApp={deleteApp} />
            <AppManagementEmptyLazy />
        </React.Fragment>
    );
}

const Scopes = ({ values, idx }) => {
    return (
        <React.Fragment>
            {values.map(scopes => {
                return (
                    <span key={idx} className={`${styles.scope}  ${scopes === 'admin' ? styles.adminScope : ''}`}>
                        {scopes.charAt(0).toUpperCase() + scopes.slice(1).replace('_', ' ')}
                    </span>
                );
            })}
        </React.Fragment>
    );
};

const SkeletonRows = () => {
    const Skeleton = () => (
        <tr>
            <td>
                <SkeletonText />
            </td>
            <td>
                <SkeletonText />
            </td>
            <td>
                <SkeletonText />
            </td>
            <td>
                <SkeletonText />
            </td>
            <td>
                <SkeletonText />
            </td>
        </tr>
    );
    // return 5 skeletons
    return [...Array(5)].map((_, i) => <Skeleton key={i} />);
};
