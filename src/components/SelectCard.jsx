import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

const SelectCard = ({ imgsrc }) => {
  return (
    <Card
      sx={{
        width: "28%",
        height: "100%",
        flex: "0 0 auto",
      }}
    >
      <CardMedia
        component="img"
        alt="title"
        src={imgsrc}
        height="100%"
        sx={{ objectFit: "contain" }}
      />
    </Card>
  );
};

export default SelectCard;
