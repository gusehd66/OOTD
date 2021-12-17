import {
  Drawer,
  Button,
  Box,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Menu, SensorDoor } from "@mui/icons-material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { SelectContext } from "../context/context";

const MenuBar = () => {
  const [state, setState] = useState(false);
  const { nickname } = useContext(SelectContext);

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
      <Typography
        align="left"
        variant="h5"
        style={{ padding: "10px", color: "#222", fontFamily: "GmarketB" }}
      >
        {nickname ? (
          <div>
            {nickname} <span style={{ fontSize: "15px" }}>님</span>
          </div>
        ) : (
          <Link
            to="/signin"
            style={{
              textDecoration: "none",
              color: "#333",
              fontSize: "15px",
              fontWeight: "700",
            }}
          >
            로그인이 필요합니다.
          </Link>
        )}
      </Typography>
      <Divider />
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
