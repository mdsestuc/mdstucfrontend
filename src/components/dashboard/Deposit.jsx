import { Grid, Link, Paper, Typography } from '@mui/material'
import React from 'react'

export const Deposit = () => {

    const  preventDefault = (event) => {
        event.preventDefault();
    }

  return (
    <>
        <Typography component="p" variant="h3" color= 'white'>
            $3,024.00
        </Typography>
        <Typography 
            //color="text.secondary" 
            color=  "white"
            sx={{ flex: 1 }}>
            on 15 March, 2019
        </Typography>
        <div>
            <Link 
            //color="primary" 
            color="inherit"
            href="#" onClick={preventDefault}>
            View balance
            </Link>
        </div>
    </>

  )
}
