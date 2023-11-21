import Container from '@mui/material/Container';
import { Link, Box, useTheme, Typography, Menu, MenuItem, Divider, ListItemIcon, Avatar, Tooltip, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from "../../context/userContext";
import { AccountCircle, Logout, PersonAdd, Settings } from '@mui/icons-material';

function HeaderCmp() {
  const navigate = useNavigate()
  const theme = useTheme()
  const { user, setUser } = useContext<any>(UserContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    let { error } = await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <Box component="header" sx={{ height: '65px', display: 'flex', alignItems: 'center', background: theme.palette.background.paper, width: '100%', p: 2 }}>
      <Container maxWidth="xl" sx={{ display: 'flex', gap: 2 }}>
        <Link
          component="button"
          variant="body2"
          onClick={() => {
            navigate('/')
          }}
          sx={{
            color: theme.palette.text.primary, textDecoration: 'none', '&:hover': {
              textDecoration: 'underline'
            }
          }}
        >
          Home
        </Link>
        <Link
          component="button"
          variant="body2"
          onClick={() => {
            navigate('/contacts')
          }}
          sx={{
            color: theme.palette.text.primary, textDecoration: 'none', '&:hover': {
              textDecoration: 'underline'
            }
          }}
        >
          Contatti
        </Link>
        {!user &&
          <Link
            component="button"
            variant="body2"
            onClick={() => {
              navigate('/login')
            }}
            sx={{
              ml: 'auto', color: theme.palette.text.primary, textDecoration: 'none', '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            Login
          </Link>
        }
        {!!user &&
          <>
            <Tooltip title="Impostazioni account">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 'auto' }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleClose}>
                <Avatar /> Mio account
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" sx={{color: '#fff'}} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </>
        }

      </Container>
    </Box>
  );
}
export default HeaderCmp;
