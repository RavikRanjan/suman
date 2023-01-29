import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LeftNav from './LeftNav'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

import { deleteProduct, getProduct } from "../../Store/ActionCreatore/ProductActionCreatore"
import { useSelector, useDispatch } from 'react-redux';



export default function AdminProduct() {
    var [flag, setflag] = useState(0)
    var product = useSelector((state) => state.ProductStateData)
    var dispatch = useDispatch()
    var navigate = useNavigate()

    var columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'maincategory', headerName: 'Maincategory', width: 100 },
        { field: 'subcategory', headerName: 'Subcategory', width: 100 },
        { field: 'brand', headerName: 'Brand', width: 100 },
        { field: 'stock', headerName: 'Stock', width: 100 },
        { field: 'color', headerName: 'Color', width: 100 },
        { field: 'size', headerName: 'Size', width: 100 },
        { field: 'baseprice', headerName: 'Base Price', width: 100, renderCell: ({ row }) => <p>&#8377;{row.baseprice}</p>  },
        { field: 'discount', headerName: 'Discount', width: 100, renderCell: ({ row }) => <p>{row.discount} %</p> },
        { field: 'finalprice', headerName: 'Final Price', width: 100, renderCell: ({ row }) => <p>&#8377;{row.finalprice}</p> },
        { field: 'pic1', headerName: 'Pic 1', width: 70, renderCell: ({ row }) => <img src={`/assets/productimages/${row.pic1}`} height="50px" width="100%" className='rounded' alt='' />},        
        { field: 'pic2', headerName: 'Pic 2', width: 70, renderCell: ({ row }) => <img src={`/assets/productimages/${row.pic2}`} height="50px" width="100%" className='rounded' alt='' />},         
        { field: 'pic3', headerName: 'Pic 3', width: 70, renderCell: ({ row }) => <img src={`/assets/productimages/${row.pic3}`} height="50px" width="100%" className='rounded' alt='' />},         
        { field: 'pic4', headerName: 'Pic 4', width: 70, renderCell: ({ row }) => <img src={`/assets/productimages/${row.pic4}`} height="50px" width="100%" className='rounded' alt='' />},       
        { field: 'pic5', headerName: 'Pic 5', width: 70, renderCell: ({ row }) => <img src={`/assets/productimages/${row.pic5}`} height="50px" width="100%" className='rounded' alt='' />},       
        {
            field: "edit",
            headerName: "Edit",
            sortable: false,
            renderCell: ({ row }) =>
                <Button onClick={() => {
                    navigate("/admin-update-product/" + row.id)
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
                    dispatch(deleteProduct({ id: row.id }))
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
    for (let item of product) {
        rows.push(item)
    }
    function getAPIData(){
        dispatch(getProduct())
    }
    useEffect(() => {
       getAPIData()
    }, [])
    return (
        <>
            <div className="container-fluid my-5">
                <div className="row">
                    <div className="col-lg-2 col-12">
                        <LeftNav />
                    </div>
                    <div className="col-lg-10">
                        <h5 className='bg-secondary text-center text-light p-1'>Product <Link to="/admin-add-Product" className="float-right"><span className="material-symbols-outlined text-light">
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
