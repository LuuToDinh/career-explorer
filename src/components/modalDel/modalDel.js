import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { styled, DialogActions, modalClasses } from '@mui/material';


// const emails = ['username@gmail.com', 'user02@gmail.com'];

export default function ModalDel(props) {
  const { onClose, selectedValue, open, title, action } = props;
  const ButtonCancel = styled(Button)({
    color: 'red'
  });

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{title} </DialogTitle>
      <DialogActions>
        <ButtonCancel onClick={handleClose}>Hủy</ButtonCancel>
        <Button onClick={() => handleListItemClick(true)}>{action}</Button>
      </DialogActions>
    </Dialog>
  );
}
// test modal
// import * as React from 'react';
// import { useState } from 'react';
// import PropTypes from 'prop-types';
// import Button from '@mui/material/Button';
// import SimpleDialog from '../../components/modalDel/modalDel'

// SimpleDialog.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
//   title: PropTypes.string.isRequired,
//   action: PropTypes.string.isRequired,
//   selectedValue: PropTypes.bool.isRequired,
// };

// export default function SimpleDialogDemo() {
//   const [open, setOpen] = useState(false);
//   const [selectedValue, setSelectedValue] = useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = (value) => {
//     setOpen(false);
//     setSelectedValue(value);
//   };

//   return (
//     <div>
//       <br />
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Open simple dialog
//       </Button>
//       <SimpleDialog
//         selectedValue={selectedValue}
//         open={open}
//         onClose={handleClose}
//         title={'Bạn có chắc chắn muốn xóa?'}
//         action={'xóa'}
//       />
//     </div>
//   );
// }