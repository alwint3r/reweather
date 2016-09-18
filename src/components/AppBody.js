import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';

export const AppBody = props => {
  return (
    <div className="App-body">
      {props.children}

      <Snackbar open={props.snackbarState}
        message={props.snackbarMessage}
        autoHideDuration={2000}
        onRequestClose={props.handleSnackbarClose} />

    </div>
  );
};

const mapStateToProps = state => {
  return {
    snackbarState: state.snackbar.state,
    snackbarMessage: state.snackbar.message,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleSnackbarClose() {
      dispatch({ type: 'SNACKBAR_CLOSE' });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppBody);
