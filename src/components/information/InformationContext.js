import React, { useState } from 'react';
import { Typography, Grid, Box, Paper, Button, styled, Modal } from '@mui/material';

import * as MuiIcon from '@mui/icons-material';
import Iframe from 'react-iframe';

import palette from '../../theme/palette';

const ButtonCV = styled(Button)({
  backgroundColor: `${palette.maincolor.shadow}`,
  width: '20rem',
  height: '2rem',
  textAlign: 'left',
  color: 'black',
});

export default function InformationContext({ icon = MuiIcon.Email, title, context, md }) {
  console.log(context);
  const Icon = icon;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const StyledPaper = styled(Paper)({
    height: '100%',
  });

  const StyledIcon = styled(Icon)({
    marginRight: '0.5rem',
    color: 'grey',
  });

  const StyledTypography = styled(Typography)({
    color: 'grey',
  });
  return (
    <>
      <Grid item xs={12} md={md}>
        <StyledPaper elevation={3}>
          <Box padding="12px" display="flex">
            <StyledIcon fontSize="small" />
            <Box>
              <StyledTypography variant="body1">{title}</StyledTypography>
              {title !== 'CV' ? (
                context.map((item) => <Typography variant="h6">{item}</Typography>)
              ) : (
                <>
                  <ButtonCV onClick={handleOpen} download>
                    <Typography variant="h6">Cv.pdf</Typography>
                  </ButtonCV>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Iframe url={context[0]} width="80%" height="100%" display="initial" position="absolute" />
                    </Box>
                  </Modal>
                </>
              )}
            </Box>
          </Box>
        </StyledPaper>
      </Grid>
    </>
  );
}
