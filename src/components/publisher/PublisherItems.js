import React, { useEffect,useState} from "react";
import { connect } from "react-redux";
import { FixedSizeList } from "react-window";
import {
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Box,
  ListItem,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import {
  getPublishers,
  changePublisher,
} from "../../redux/action/publisherActions";
import { getProductsWithPublisher } from "../../redux/action/productActions";
import SnackbarComponent from "../common/Snackbar";
import "../../css/HomePage.css";


function PublisherItems({
  publishers,
  getPublishers,
  currentPublisher,
  getProductsWithPublisher,
  changePublisher,
  ...props
}) {
  const [isOpenSnackbar, setisOpenSnackbar] = useState(false);
  useEffect(() => {
    if (!props.publishers) {
      getPublishers();
    }
  }, [getPublishers, props.publishers]);

  function handleChangePublisher(publisher) {
    changePublisher(publisher);
    getProductsWithPublisher(publisher.id);
    setisOpenSnackbar(true);
  }
  function renderPublishers() {
    return (
      <List>
        {publishers.map((publisher) => (
          <ListItem key={publisher.id} divider>
            <ListItemButton onClick={() => handleChangePublisher(publisher)}>
              <ListItemAvatar>
                <Avatar
                  alt={publisher.publisherName}
                  src={publisher.publisherLogo}
                />
              </ListItemAvatar>
              <ListItemText primary={publisher.publisherName} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
  }
  return (
    <Paper
      className="Box"
      elevation={4}
      style={{
        margin: "1rem 0",
        padding: "0 1rem",
        lineHeight: "60px",
        textAlign: "center",
      }}
    >
      <Box>
        <h3>Publishers</h3>

        <SnackbarComponent
          open={isOpenSnackbar}
          setOpen={setisOpenSnackbar}
          message={currentPublisher.publisherName}
          severity="info"
        />

        <FixedSizeList
          height={300}
          itemSize={46}
          itemCount={publishers.length}
          overscanCount={1}
        >
          {renderPublishers}
        </FixedSizeList>
      </Box>
    </Paper>
  );
}

function mapStateToProps(state) {
  return {
    publishers: state.publisherListReducer,
    currentPublisher: state.changePublisherReducer,
  };
}

const mapDispatchToProps = {
  getProductsWithPublisher,
  getPublishers,
  changePublisher,
};

export default connect(mapStateToProps, mapDispatchToProps)(PublisherItems);
