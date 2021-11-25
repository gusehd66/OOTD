import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

const SelectCard = ({ imgsrc }) => {
  return (
    <Card sx={{ minWidth: "48%" }}>
      <CardActionArea>
        <CardMedia component="img" height="140" alt="title" src={imgsrc} />
      </CardActionArea>
    </Card>
  );
};

export default SelectCard;
