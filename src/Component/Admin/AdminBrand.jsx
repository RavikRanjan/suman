import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LeftNav from './LeftNav'

import { deleteBrand, getBrand } from "../../Store/ActionCreatore/BrandActionCreatore"
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';


export default function AdminBrand() {
    var [flag, setflag] = useState(0)
    var brand = useSelector((state) => state.BrandStateData)
    var dispatch = useDispatch()
    var navigate = useNavigate()

    var columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 130 },
        {
            field: "edit",
            headerName: "Edit",
            sortable: false,
            renderCell: ({ row }) =>
                <Button onClick={() => {
                    navigate("/admin-update-brand/" + row.id)
                }}>
                    <span className='material-symbols-outlined'>edit</span>
                </Button>,
        },
        {
            field: "delete",
            headerName: "Delete",
            sortable: false,
            renderCell: ({ row }) =>
                <Button onClick={() => {
                    dispatch(deleteBrand({ id: row.id }))
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
    for (let item of brand) {
        rows.push(item)
    }

    useEffect(() => {
        dispatch(getBrand())
    }, [])
    return (
        <>
            <div className="container-fluid my-5">
                <div className="row">
                    <div className="col-lg-2 col-12">
                        <LeftNav />
                    </div>
                    <div className="col-lg-10">
                        <h5 className='bg-secondary text-center text-light p-1'>Brand <Link to="/admin-add-Brand" className="float-right"><span className="material-symbols-outlined text-light">
                            add
                        </span></Link></h5>
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
