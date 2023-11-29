import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { orange } from "@mui/material/colors";
import PropTypes from "prop-types";
import { MdSend } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import useApi from "../hooks/useApi";
import { useEffect } from "react";
import { useRef } from "react";
import toast from "react-hot-toast";

export default function Comments({ recipeId }) {
  const [comments, setComments] = React.useState([]);

  const [comment, setComment] = React.useState("");

  const api = useApi();

  const inputRef = useRef();

  const notify = (msg) => toast.error(msg);

  const getComments = async () => {
    try {
      const response = await api.getComments(recipeId);
      setComments(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const postComment = async () => {
    try {
      const data = {
        comment,
        recipeId,
      };
      await api.addComment(data);
      setComment("");
      setComments([...comments, { comment }]);
    } catch (err) {
      notify("Error while posting comment");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      postComment();
    }
  };

  const onClickDelete = async (id) => {
    try {
      const response = await api.deleteComment(id);

      if (response.status === 200) {
        setComments(comments.filter((comment) => comment.id !== id));
      }
    } catch (err) {
      notify("Error while deleting comment");
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <Card
      sx={{
        padding: "1rem",
        height: "auto",
        cursor: "pointer",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: orange[500] }} aria-label="recipe"></Avatar>
        }
        title="Comments"
      />
      <div className="flex items-stretch justify-between w-full">
        <textarea
          ref={inputRef}
          className="w-full grow input input-bordered join-item max-h-[20rem] min-h-[3rem]"
          value={comment}
          onKeyDown={handleKeyDown}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit" className="join-item btn">
          <MdSend size={30} />
        </button>
      </div>

      <CardContent>
        {comments.map((comment) => (
          <p
            className="flex w-full items-center justify-between text-base mt-5 shadow-sm"
            key={comment.id}
          >
            {comment.comment}
            <div
              className="hover: btn-ghost p-6"
              onClick={(e) => {
                e.stopPropagation();
                onClickDelete(comment.id);
              }}
            >
              <MdDelete size={15} />
            </div>
          </p>
        ))}
      </CardContent>
    </Card>
  );
}

Comments.propTypes = {
  recipeId: PropTypes.string,
};
