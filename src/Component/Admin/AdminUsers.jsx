import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LeftNav from './LeftNav'

import { deleteUser, getUser } from "../../Store/ActionCreatore/UserActionCreatore"
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';


export default function AdminUsers() {
    var [flag, setflag] = useState(0)
    var users = useSelector((state) => state.UserStateData)
    var dispatch = useDispatch()

    var columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'username', headerName: 'User Name', width: 130 },
        { field: 'email', headerName: 'Email', width: 300 },
        { field: 'phone', headerName: 'Phone', width: 130 },
        { field: 'role', headerName: 'Role', width: 130 },
        {
            field: "delete",
            headerName: "Delete",
            sortable: false,
            renderCell: ({ row }) =>
                <Button onClick={() => {
                    dispatch(deleteUser({ id: row.id }))
                    if (flag === 0)
                        setflag(1)
                    else
                        setflag(0)
                }
                }>
                    <span className='material-symbols-outlined'>delete_forever</span>
                </Button>,
        }
    ];

    var rows = []
    for (let item of users) {
        rows.push(item)
    }

    useEffect(() => {
        dispatch(getUser())
    }, [users.length])
    return (
        <>
            <div className="container-fluid my-5">
                <div className="row">
                    <div className="col-lg-2 col-12">
                        <LeftNav />
                    </div>
                    <div className="col-lg-10">
                        <h5 className='bg-secondary text-center text-light p-1'>Users</h5>
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                            // checkboxSelection
                            />
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
