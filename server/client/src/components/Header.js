import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import EditIcon from 'material-ui/svg-icons/content/create';
import {
  LIGHTEST_GREY,
  LIGHT_BLUE,
  ACCENT_BLUE,
  WHITE,
  LIGHT_GREY,
} from '../style/constants';

const HeaderStyles = () => ({
  header: {
    display: 'flex',
    padding: '24px 24px 24px 24px',
    backgroundColor: LIGHTEST_GREY,
    flexDirection: 'column',
    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.2)',
    position: 'relative',
  },
  headerTitle: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  fieldStyle: {
    marginLeft: 24,
    height: 'inherit',
  },
  hintStyle: {
    color: LIGHT_BLUE,
  },
  inputStyle: {
    color: LIGHT_BLUE,
  },
  underlineStyle: {
    borderColor: ACCENT_BLUE,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: 24,
    minWidth: 134,
  },
  sentStatus: {
    fontSize: 11,
    color: LIGHT_GREY,
  },
});

class Header extends Component {
  renderSearchField() {
    const {
      fieldStyle,
      hintStyle,
      inputStyle,
      underlineStyle,
    } = HeaderStyles();

    const { searchState, handleSearchInput, match } = this.props;
    if (match.path === '/all-orders') {
      return (
        <TextField
          name="search"
          style={fieldStyle}
          hintText="Search"
          hintStyle={hintStyle}
          inputStyle={inputStyle}
          underlineFocusStyle={underlineStyle}
          value={searchState}
          onChange={event => handleSearchInput(event)}
        />
      );
    }
    return null;
  }

  renderButton() {
    const { buttonContainer, blue, sentStatus } = HeaderStyles();
    const { match, dateSent } = this.props;
    if (match.path === '/orders') {
      return (
        <div className="button" style={buttonContainer}>
          <Link to="/edit-email">
            <RaisedButton
              label="Edit Email"
              labelColor={WHITE}
              backgroundColor={ACCENT_BLUE}
              icon={<EditIcon />}
            />
          </Link>
          <span style={sentStatus}>Last sent: {dateSent} </span>
        </div>
      );
    }
    return null;
  }

  renderDetails() {
    const { vendorName, showDate } = this.props;
    return (
      <div className="header__details">
        <h3>{showDate}</h3>
        <h3>{vendorName}</h3>
      </div>
    );
  }

  render() {
    console.log('header props', this.props);
    const { header, headerTitle } = HeaderStyles(this.props);
    const { pageTitle } = this.props;

    return (
      <div className="header" style={header}>
        <div className="header__title" style={headerTitle}>
          <h1>{pageTitle}</h1>
          {this.renderSearchField()}
          {this.renderButton()}
        </div>
        {this.renderDetails()}
      </div>
    );
  }
}

export default withRouter(Header);
