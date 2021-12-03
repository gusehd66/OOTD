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
        {["menu1", "menu2", "menu3"].map((text, index) => (
          <div key={text}>
            <ListItem button>
              <ListItemIcon>
                <SensorDoor />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
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
