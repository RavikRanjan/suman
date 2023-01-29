import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LeftNav from './LeftNav'

import { deleteCheckout, getCheckout } from "../../Store/ActionCreatore/CheckoutActionCreatore"
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';

export default function AdminCheckout() {
    var Checkout = useSelector((state) => state.CheckoutStateData)
    var dispatch = useDispatch()
    var navigate = useNavigate()

    var columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'userid', headerName: 'User Id', width: 120 },
        { field: 'paymentmode', headerName: 'Payment Mode', width: 120 },
        { field: 'paymentstatus', headerName: 'Payment Status', width: 120 },
        { field: 'totalAmount', headerName: 'Total Amount', width: 120 },
        { field: 'shippingAmount', headerName: 'Shipping Amount', width: 120 },
        { field: 'finalAmount', headerName: 'Final Amount', width: 120 },
        { field: 'time', headerName: 'Date', width: 200 },
        // { field: 'finalAmount', headerName: 'Date', width: 200 },
        {
            field: "view",
            headerName: "View",
            sortable: false,
            renderCell: ({ row }) =>
                <Button onClick={() => {
                    navigate("/admin-single-checkout/" + row.id)
                }}>
                    <span className='material-symbols-outlined'>visibility</span>
                </Button>,
        },
        {
            field: "delete",
            headerName: "Delete",
            sortable: false,
            renderCell: ({ row }) =>{
                if(row.status==="Done"){
                    return <Button onClick={() => {
                        dispatch(deleteCheckout({ id: row.id }))
                    }}>
                        <span className="material-symbols-outlined">
                            delete_forever
                        </span>
                    </Button>
                }
            }
        }
    ];

    var rows = []
    for (let item of Checkout) {
        rows.push(item)
    }
    function getAPIData(){
         dispatch(getCheckout())
    }

    useEffect(() => {
       getAPIData()
    }, [Checkout.length])
    return (
        <>
            <div className="container-fluid my-5">
                <div className="row">
                    <div className="col-lg-2 col-12">
                        <LeftNav />
                    </div>
                    <div className="col-lg-10">
                        <h5 className='bg-secondary text-center text-light p-1'>Checkout</h5>
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
