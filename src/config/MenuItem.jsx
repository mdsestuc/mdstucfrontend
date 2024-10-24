import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsSharpIcon from '@mui/icons-material/GroupsSharp';
import PeopleIcon from '@mui/icons-material/People';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton LinkComponent={Link} to='/dashboard'>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard"  />
    </ListItemButton>
    <ListItemButton LinkComponent={Link} to={'/Beneficiarios'}>
      <ListItemIcon>
        <GroupsSharpIcon />
        {/* <ShoppingCartIcon /> */}
      </ListItemIcon>
      <ListItemText primary="Beneficiarios" />
    </ListItemButton>
    <ListItemButton LinkComponent={Link} to={'/usuarios'}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Usuarios" />
    </ListItemButton>
    <ListItemButton LinkComponent={Link} to={'/atencionpublico'}>
      <ListItemIcon>
        <BorderColorIcon />
      </ListItemIcon>
      <ListItemText primary="Atencion Publico" />
    </ListItemButton>
    <ListItemButton LinkComponent={Link} to={'/estadisticas'}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Estadisticas" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    {/* <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton> */}
  </React.Fragment>
);