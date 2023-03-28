import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Fab,
  Card,
  CardActions,
  CardContent,
  Box,
  Typography,
  CardHeader,
} from "@mui/material";

import { NavLink } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import EditIcon from "@mui/icons-material/Edit";

function PublisherDetail({ publisher }) {
  return (
    <Box
      sx={{
        "& > :not(style)": { m: 3 },
      }}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar
              alt={publisher.publisherName}
              src={publisher.publisherLogo}
              sx={{ width: 56, height: 56 }}
            />
          }
          title={publisher.publisherName}
          subheader={
            <a href={publisher.publisherWebsite}>
              {publisher.publisherWebsite}
            </a>
          }
        />
        <CardContent>
          <Typography variant="body2" sx={{ textAlign: "justify" }}>
            {publisher.publisherInfo}
          </Typography>
          <Typography variant="subtitle2" component="div">
            <span>Phone Number:</span>

            <a href={publisher.publisherWebsite}>{publisher.publisherPhone}</a>
          </Typography>
          <Typography variant="subtitle2" component="div">
            <span>Email:</span>
            <a href={publisher.publisherWebsite}>{publisher.publisherEmail}</a>
          </Typography>
        </CardContent>
        <CardActions>
          <NavLink to={"/publisher"}>
            <Fab size="small" color="primary" sx={{ mr: 1 }}>
              <ArrowBackIosNewIcon />
            </Fab>
          </NavLink>
          <NavLink to={`/editpublisher/${publisher.id}`}>
            <Fab size="small" color="secondary" aria-label="edit">
              <EditIcon />
            </Fab>
          </NavLink>
        </CardActions>
      </Card>
    </Box>
    //
  );
}

export function getByIdPublisher(publishers, publisherId) {
  // eslint-disable-next-line eqeqeq
  let publisher =
    // eslint-disable-next-line eqeqeq
    publishers.find((publisher) => publisher.id == publisherId) || null;
  return publisher;
}
function mapStateToProps(state) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let { publisherId } = useParams();
  let publisher =
    publisherId && state.publisherListReducer
      ? getByIdPublisher(state.publisherListReducer, publisherId)
      : {};
  return { publisher, publishers: state.publisherListReducer };
}
export default connect(mapStateToProps)(PublisherDetail);
