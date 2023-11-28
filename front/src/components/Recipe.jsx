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
import PropTypes from "prop-types";

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
      sx={{
        width: expanded ? "85%" : 345,
        height: expanded ? "100%" : "34rem",
        backgroundColor: expanded ? orange[300] : "white",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: orange[600] }} aria-label="recipe">
            {index + 1}
          </Avatar>
        }
        title={
          recipe?.name?.slice(0, 20) + (recipe?.name?.length > 20 ? "..." : "")
        }
        titleTypographyProps={{ variant: "h6" }}
      />
      <CardMedia
        component="img"
        sx={{
          height: 345,
          objectFit: "cover",
        }}
        image={
          recipe.image || "https://source.unsplash.com/random/345x194/?food"
        }
        alt="food"
      />
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
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {expanded
            ? recipe?.description
            : recipe?.description?.slice(0, 92) + "..."}
        </Typography>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Ingredients : </Typography>
          <Typography paragraph>
            {recipe?.ingredients?.map((ingredient, index) => (
              <Typography key={index} paragraph>
                {"- " + ingredient}
              </Typography>
            ))}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

Recipe.propTypes = {
  recipe: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.string),
    steps: PropTypes.arrayOf(PropTypes.string),
  }),
  index: PropTypes.number,
};
