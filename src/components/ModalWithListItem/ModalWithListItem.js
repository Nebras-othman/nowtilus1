import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

class ModalWithListItem extends React.Component {
    handleClose = () => {
      this.props.onClose(this.props.selectedValue);
    };
  
    handleListItemClick = value => {
      this.props.onClose(value);
    };
  
    render() {
      const { onClose, selectedValue, ...other } = this.props;
  
      return (
        <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
          <DialogTitle id="simple-dialog-title">Which movie you meant?</DialogTitle>
          <div>
            <List>
              {this.props.items.map((item,index) => (
                <ListItem button onClick={() => this.handleListItemClick(item)} key={index}>
                  <ListItemAvatar>
                    <Avatar src={item.Poster}>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.Title} /><small style={{color:"red"}}> {item.Year}</small>
                </ListItem>
              ))}
            </List>
          </div>
        </Dialog>
      );
    }
  }

  export default ModalWithListItem;