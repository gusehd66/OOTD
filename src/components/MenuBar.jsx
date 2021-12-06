import {
  Drawer,
  Button,
  Box,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Menu, SensorDoor } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";

const MenuBar = () => {
  const [state, setState] = useState(false);

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(!state);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        {["home", "random"].map((text, index) => (
          <div key={text}>
            <Link
              to={text === "home" ? "/" : `/${text}`}
              style={{
                color: "black",
                textDecoration: "none",
              }}
            >
              <ListItem button>
                <ListItemIcon>
                  <SensorDoor />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
            {index === 0 && <Divider />}
          </div>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Button onClick={toggleDrawer}>
        <Menu color="action" sx={{ fontSize: 30 }} />
      </Button>
      <Drawer anchor={"left"} open={state} onClose={toggleDrawer}>
        {list()}
      </Drawer>
    </>
  );
};

export default MenuBar;
