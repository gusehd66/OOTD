import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuBar from "./MenuBar";
import { Person } from "@mui/icons-material";
import { useState } from "react";
import { Menu, MenuItem, MenuList } from "@mui/material";

const Appbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [login, setLogin] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    setLogin(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          height: "7vh",
          backgroundColor: Boolean(anchorEl) ? "#555555" : "#959595",
          justifyContent: "center",
        }}
      >
        <Toolbar>
          <MenuBar />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MY ROOM
          </Typography>
          <Button color="inherit">
            {login ? (
              <Person
                onClick={handleMenu}
                sx={{
                  border: "solid 1px",
                  borderRadius: "50%",
                  padding: "2px",
                }}
              />
            ) : (
              <p onClick={() => setLogin(true)}>Log-In</p>
            )}
          </Button>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            sx={{ mt: 0.6 }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuList>
              <MenuItem onClick={handleClose} divider>
                Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>LogOut</MenuItem>
            </MenuList>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Appbar;
