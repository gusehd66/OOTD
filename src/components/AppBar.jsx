import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuBar from "./MenuBar";
import { Person } from "@mui/icons-material";

const Appbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          height: "7vh",
          backgroundColor: "#959595",
          justifyContent: "center",
        }}
      >
        <Toolbar>
          <MenuBar />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MY ROOM
          </Typography>
          <Button color="inherit">
            <Person
              sx={{
                border: "solid 1px",
                borderRadius: "50%",
                padding: "2px",
              }}
            />
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Appbar;
