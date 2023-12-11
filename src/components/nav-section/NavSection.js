import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { NavLink as RouterLink } from 'react-router-dom';

import { Box, List, ListItemText, Collapse } from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { StyledNavItem, StyledNavItemIcon, StyledSubItem } from './styles';

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item, index) => (
          <NavItem key={index} item={item} />
        ))}
      </List>
    </Box>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => {
    const newOpen = !open;
    setOpen(newOpen);
  }, [open]);
  if (item.sublinks) {
    return (
      <>
        <StyledNavItem
          onClick={handleOpen}
          sx={{
            '&.active': {
              color: 'text.primary',
              bgcolor: 'action.selected',
              fontWeight: 'fontWeightBold',
            },
          }}
        >
          <StyledNavItemIcon>{item.icon && item.icon}</StyledNavItemIcon>

          <ListItemText disableTypography primary={t(item.title)} />

          <span>{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</span>
        </StyledNavItem>

        <Collapse in={open} timeout="auto" unmountOnExit>
          {item.sublinks.map((subitem, index) => (
            <StyledSubItem key={index} to={subitem.path}>
              <StyledNavItemIcon>{subitem.icon && subitem.icon}</StyledNavItemIcon>
              <ListItemText disableTypography primary={t(subitem.title)} />
            </StyledSubItem>
          ))}
        </Collapse>
      </>
    );
  }
  return (
    <StyledNavItem
      component={RouterLink}
      to={item.path}
      onClick={handleOpen}
      sx={{
        '&.active': {
          color: 'background.paper',
          bgcolor: 'maincolor.primary',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <StyledNavItemIcon>{item.icon && item.icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={t(item.title)} />
    </StyledNavItem>
  );
}
