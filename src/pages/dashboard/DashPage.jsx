import React from 'react'
import { Chart } from '../../components/dashboard/Chart'
import { Grid, Paper } from '@mui/material'
import { Deposit } from '../../components/dashboard/Deposit'
import Orders from '../../components/dashboard/Orders'
import Atpinfo from '../../components/dashboard/Atpinfo'

export const DashPage = () => {
  return (
    <Grid container spacing={3}>

{/*         <Grid item xs={12} md={8} lg={9}>
            <Paper
                sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
                }}
            >
                <Chart />
            </Paper>
        </Grid> */}

        <Grid item xs={12} md={4} lg={3}>
            <Paper
                sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
                background: "info.main",
                //background: "#1976d2",                
                }}
                elevation={6}

            >
                <Deposit />
            </Paper>
        </Grid>

        <Grid item xs={12} md={4} lg={3}>
            <Paper
                sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
                background: "info.main",
                //background: "#1976d2",                
                }}
                elevation={6}

            >
                <Atpinfo />
            </Paper>
        </Grid>

        <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Orders />
            </Paper>
        </Grid>
    </Grid>
  )
}
