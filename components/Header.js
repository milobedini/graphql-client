import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { List, ListItem } from '@mui/material'
import Link from 'next/link'

const pages = ['Products', 'Pricing', 'Blog']
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbarMain: {
    boxShadow: '0 1px 2px 0 #28d79a',
    borderBottomWidth: '1px',
    backgroundColor: '#0c1527',
    color: '#eef6ff',
  },
  toolbarMain: {
    padding: '0px',
    minHeight: 60,
  },
  appbarDesktop: {
    backgroundColor: '#eef6ff',
    color: '#fff',
  },
  toolbarDesktop: {
    padding: '0px',
    minHeight: 30,
  },
  logo: {
    width: '40px',
    height: '40px',
  },
  appbarSecondary: {
    backgroundColor: '#a6adbb',
    color: '#18cdba',
  },
  toolbarSecondary: {
    padding: '0px',
    minHeight: 50,
  },
  menuList: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
  },
  appbarPromotion: {
    backgroundColor: '#e0e9f3',
    margin: theme.spacing(0, 0, 8),
    ['@media (max-width:600px)']: {
      margin: theme.spacing(0, 0, 2),
    },
  },
  toolbarPromotion: {
    padding: '0px',
    minHeight: 50,
  },
  menuListItem: {
    padding: 0,
    paddingRight: 20,
    textTransform: 'capitalize',
  },
  listItemLink: {
    fontSize: 13,
    color: '#0c1527',
    textDecoration: 'none',
  },
}))

const Header = ({ categories }) => {
  const classes = useStyles()
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <nav>
      {console.log(categories)}
      <AppBar position="relative" className={classes.appbarDesktop}>
        <Container max-width="lg">
          <Toolbar className={classes.toolbarDesktop}></Toolbar>
        </Container>
      </AppBar>

      <AppBar position="static" className={classes.appbarMain}>
        <Container maxWidth="lg">
          <Toolbar disableGutters className={classes.toolbarMain}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            ></Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Link href={'/'}>
              <a>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                >
                  <img
                    src="https://res.cloudinary.com/dvgbdioec/image/upload/v1644768223/peacock_yevwhu.png"
                    className={classes.logo}
                  />
                </Typography>
              </a>
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <AppBar
        position="relative"
        elevation={0}
        className={classes.appbarSecondary}
      >
        <Container maxWidth="lg">
          <Toolbar className={classes.toolbarSecondary}>
            <List className={classes.menuList}>
              {categories.map((category) => (
                <ListItem key={category.name} className={classes.menuListItem}>
                  <Link href={`/category/${encodeURIComponent(category.slug)}`}>
                    <a className={classes.listItemLink}>{category.name}</a>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Toolbar>
        </Container>
      </AppBar>
      <AppBar
        position="relative"
        elevation={0}
        className={classes.appbarPromotion}
      >
        <Container maxWidth="lg">
          <Toolbar className={classes.toolbarPromotion}></Toolbar>
        </Container>
      </AppBar>
    </nav>
  )
}

export default Header
