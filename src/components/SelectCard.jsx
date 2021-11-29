import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

const SelectCard = ({ imgsrc }) => {
  return (
    <Card sx={{ minWidth: "48%", height: "140px" }}>
      <CardActionArea>
        <CardMedia component="img" alt="title" src={imgsrc} height="140px" />
      </CardActionArea>
    </Card>
  );
};

export default SelectCard;
