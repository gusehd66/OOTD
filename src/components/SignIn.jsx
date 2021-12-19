import { Box, Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SelectContext } from "../context/context";

const SignIn = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { setNickname } = useContext(SelectContext);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const onSignin = (event) => {
    event.preventDefault();
    if (name.trim() !== "") {
      window.localStorage.setItem("nickname", name);
      setNickname(name);
      navigate("/");
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <form onSubmit={onSignin}>
        <Box
          sx={{
            width: 300,
            height: 300,
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "20px",
          }}
        >
          <TextField
            id="outlined-basic"
            label="NickName"
            variant="outlined"
            onChange={handleChange}
          />
          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={onSignin}
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default SignIn;
