import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { orange } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Recipe({ recipe, index }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{ maxWidth: 345, backgroundColor: expanded ? orange[300] : "white" }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: orange[600] }} aria-label="recipe">
            {index + 1}
          </Avatar>
        }
        title={recipe.Name}
        titleTypographyProps={{ variant: "h6" }}
      />
      <CardMedia
        component="img"
        height="194"
        image={
          recipe.Image || "https://source.unsplash.com/random/345x194/?food"
        }
        alt="food"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {recipe.Description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="Add to favorites">
          <FavoriteIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Expand"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Ingredients : </Typography>
          <Typography paragraph>
            {recipe.Ingredients.map((Ingredient, index) => (
              <Typography key={index} paragraph>
                {"- " + Ingredient}
              </Typography>
            ))}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

Recipe.propTypes = {
  recipe: {
    Name: String,
    Description: String,
    Ingredients: Array,
    Method: Array,
  },
  index: Number,
};
