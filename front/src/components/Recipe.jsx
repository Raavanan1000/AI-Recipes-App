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
import useApi from "../hooks/useApi";
import toast, { Toaster } from "react-hot-toast";
import { useFavoriteContext } from "../context/favoriteContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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

  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = React.useState(false);

  const api = useApi();

  const notifyError = (msg) => toast.error(msg);
  const notifySuccess = (msg) => toast.success(msg);

  const { favorite, setFavorite } = useFavoriteContext();

  useEffect(() => {
    const alreadyFavorite = favorite.find((fav) => fav.recipeId === recipe.id);
    if (alreadyFavorite) {
      setIsFavorite(true);
    }

    if (!alreadyFavorite) {
      setIsFavorite(false);
    }
  }, [favorite, recipe.id]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const onClickFavorite = async () => {
    try {
      const data = {
        recipeId: recipe.id,
      };
      const response = await api.addFavorites(data);

      const newFavorite = {
        ...response.data,
        recipe: { ...recipe },
      };

      const newData = {
        ...favorite,
        ...newFavorite,
      };

      setFavorite([...favorite, newData]);
      setIsFavorite(true);

      console.log(response);
      if (response.status === 201) {
        notifySuccess("Recipe added to favorites");
      }
    } catch (error) {
      const { response } = error;
      if (response.status === 409) {
        notifyError("Recipe already in favorites");
        return;
      }
      notifyError("Could not add recipe to favorites");
    }
  };

  return (
    <Card
      sx={{
        width: 345,
        height: "auto",
        backgroundColor: expanded ? orange[300] : "white",
        cursor: "pointer",
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
        onClick={() => {
          navigate("/home/recipes/" + recipe.id, {
            state: { recipe: recipe },
          });
        }}
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
        <IconButton
          aria-label="Add to favorites"
          onClick={onClickFavorite}
          sx={
            recipe.favorite || isFavorite
              ? { color: orange[600] }
              : { color: "grey" }
          }
        >
          <FavoriteIcon />
        </IconButton>
        <div
          className="btn btn-ghost"
          onClick={() => {
            navigate("/home/recipes/" + recipe.id, {
              state: { recipe: recipe },
            });
          }}
        >
          View recipe
        </div>
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
    id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    favorite: PropTypes.bool,
    description: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.string),
    steps: PropTypes.arrayOf(PropTypes.string),
  }),
  index: PropTypes.number,
};
