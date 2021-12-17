import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuBar from "./MenuBar";
import { Person } from "@mui/icons-material";
import { useContext, useState } from "react";
import { Menu, MenuItem, MenuList } from "@mui/material";
import { Link } from "react-router-dom";
import { SelectContext } from "../context/context";

const Appbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { nickname, setNickname } = useContext(SelectContext);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.removeItem("nickname");
    setNickname(null);
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
            {nickname ? (
              <>
                <Person
                  onClick={handleMenu}
                  sx={{
                    border: "solid 1px",
                    borderRadius: "50%",
                    padding: "2px",
                  }}
                />
              </>
            ) : (
              <Link
                to="/signin"
                style={{ textDecoration: "none", color: "#333" }}
              >
                Log-In
              </Link>
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
