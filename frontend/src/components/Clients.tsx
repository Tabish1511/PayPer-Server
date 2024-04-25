import React from "react";
import { useState, useEffect } from "react";
import { ButtonCombo } from "./ButtonCombo";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTable, Column, usePagination, TableInstance, UsePaginationInstanceProps, UseSortByInstanceProps, UsePaginationState } from "react-table";

export type TableInstanceWithHooks<T extends object> = TableInstance<T> &
  UsePaginationInstanceProps<T> &
  UseSortByInstanceProps<T> & {
    state: UsePaginationState<T>;
  };

interface ClientInterface {
    id: number;
    name: string;
    itemDescription: string;
    phone: string;
    total: number;
    deposit: number;
    months: number;
    dueDate: string;
    userId: number;
}

export function Clients() {
    const [clients, setClients] = useState<ClientInterface[]>([]);
    const [filter, setFilter] = useState<string>("");
    const [loading, setLoading] = useState(true);   // <<== THIS IS LOADING FEATURE
    const [buttonSuccess, setButtonSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://payper-server.khaqantabish.workers.dev/api/v1/client/bulk?filter=" + filter, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(response => {
            setClients(response.data.client);
            setLoading(false);
            setButtonSuccess(false);
        })
        .catch(error => {
            console.error("Error fetching clients (frontend): ", error);
        });
    }, [buttonSuccess ,filter]);

    function handleClickSuccess() {
        setButtonSuccess(true);
    }

    const data = React.useMemo(() => clients, [clients]);

    const columns: Array<Column<ClientInterface>> = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Item Description',
                accessor: 'itemDescription',
            },
            {
                Header: 'Phone',
                accessor: 'phone',
            },
            {
                Header: 'Total Amount',
                accessor: 'total',
            },
            {
                Header: 'Deposit',
                accessor: 'deposit',
            },
            {
                Header: 'Installment Months',
                accessor: 'months',
            },
            {
                Header: 'Due Date',
                accessor: 'dueDate',
                Cell: ({ value }: { value: string }) => value.split('T')[0],
            },
            {
                Header: 'Actions',
                accessor: 'id',
                Cell: ({ value }: { value: number }) => <ButtonCombo id={value} onSuccess={handleClickSuccess} />,
            },
        ],
        []
    );
    

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        nextPage,
        previousPage,
        state: {pageIndex},
        pageCount,
    } = useTable(
        { 
            columns, 
            data,
            //@ts-ignore 
            initialState: { pageSize: 9 }
        }, usePagination) as TableInstanceWithHooks<ClientInterface>; 

    if(loading){    // <<== THIS IS LOADING FEATURE
        return <div>
            Loading...
        </div>
    }
    
    return (
        <div className="rounded-lg w-11/12 h-5/6 bg-white px-5 pb-5">
            <div className="grid grid-cols-6 gap-4">
                <div className="col-span-5 mt-4 flex justify-center rounded-lg">
                    <input
                        onChange={e => {
                            setFilter(e.target.value);
                        }}
                        type="text"
                        placeholder="Search clients by name or phone..."
                        className="w-full px-2 py-1 border rounded-lg border-gray-300"
                    ></input>
                </div>
                <Button label="New Client" className="mx-0" onClick={() => { navigate("/createClient") }} />
            </div>
            <div>
                <table className="table-auto w-full" {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()} className="h-10 text-center">
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} className="h-14 text-center odd:bg-cream-main even:bg-white">
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div className="flex justify-center mt-3">
                    <div className="pb-4">
                        <Button label="Prev" className="mt-0" onClick={previousPage} />
                    </div>
                        <span className="flex flex-col justify-center"> {pageIndex+1} of {pageCount} </span>
                    <div className="pb-4">
                        <Button label="Next" className="mt-0" onClick={nextPage} />
                    </div>
                </div>            
            </div>
        </div>
    );
}
