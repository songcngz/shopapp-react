import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { Fab, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import EditIcon from "@mui/icons-material/Edit";

function AuthorDetail({ author }) {
  return (
    <div className="card center mb-2" style={{ maxWidth: "540px" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <CardMedia
            component="img"
            alt={author.authorName}
            height="194"
            image={author.authorImage}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{author.authorName}</h5>
            <p className="card-text" style={{ textAlign: "justify" }}>
              {author.authorInfo.authorLife}
            </p>
            {author.authorInfo.authorDateOfBirth ? (
              <p className="card-text">
                <span>Birth: </span>
                <small className="text-muted">
                  {author.authorInfo.authorDateOfBirth}
                </small>
              </p>
            ) : (
              ""
            )}

            {author.authorInfo.authorDateOfDeath ? (
              <p className="card-text">
                <span>Death: </span>
                <small className="text-muted">
                  {author.authorInfo.authorDateOfDeath}
                </small>
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <div className="card-footer bg-transparent">
        {" "}
        <Link to={"/author"}>
          <Fab size="small" color="primary" sx={{ mr: 1 }}>
            <ArrowBackIosNewIcon />
          </Fab>
        </Link>
        <Link to={`/editauthor/${author.id}`}>
          <Fab size="small" color="secondary" aria-label="edit">
            <EditIcon />
          </Fab>
        </Link>
      </div>
    </div>
  );
}

export function getByIdAuthor(authors, authorId) {
  // eslint-disable-next-line eqeqeq
  let author = authors.find((author) => author.id == authorId) || null;
  return author;
}
function mapStateToProps(state) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let { authorId } = useParams();
  let author =
    authorId && state.authorListReducer
      ? getByIdAuthor(state.authorListReducer, authorId)
      : {};
  return { author, authors: state.authorListReducer };
}
export default connect(mapStateToProps)(AuthorDetail);
