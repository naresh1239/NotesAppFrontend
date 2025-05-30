import React from 'react'

const Navbar = () => {
  return (
    <AppBar position="fixed"  sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    <Toolbar sx={{ justifyContent: 'space-between' }}>
       <Button variant="contained" onClick={()=>dispatch(Toggle())}>
          ----
        </Button>
      <Typography variant="h6" noWrap component="div">
        Navbar
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Button variant="contained" endIcon={<PublishIcon />} onClick={()=>navigate('/CreateNotes')}>
          Create
        </Button>


 <Avatar alt="User" sx={{cursor : 'pointer'}}  onClick={handleClick}/>

<Menu
  id="demo-positioned-menu"
  aria-labelledby="demo-positioned-button"
  anchorEl={anchorEl}
  open={open}
  onClose={handleClose}
  anchorOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }}
  transformOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }}
>
  <MenuItem onClick={handleClose}>Profile</MenuItem>
  <MenuItem onClick={handleClose}>My account</MenuItem>
  <MenuItem id='Logout' onClick={handleClose}>Logout</MenuItem>
</Menu>

        
      </Box>
    </Toolbar>
  
  </AppBar>
  )
}

export default Navbar