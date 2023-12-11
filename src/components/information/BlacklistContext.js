import { Typography, Grid, Box, Paper, styled } from '@mui/material';
import * as MuiIcon from '@mui/icons-material';
// color

export default function BlacklistContext({ icon: Icon = MuiIcon.Email, title, context, md }) {
  const StyledPaper = styled(Paper)({
    height: '100%'
  });

  const StyledIcon = styled(Icon)({
    marginRight: '0.5rem', 
    color: 'grey'
  });

  const StyledTypography = styled(Typography)({
    color: 'grey'
  });

  return (
    <>
      <Grid item xs={12} md={md}>
        <StyledPaper elevation={3}>
          <Box padding="12px" display="flex">
            <StyledIcon fontSize="small" />
            <Box>
              <StyledTypography variant="body1">
                {title}
              </StyledTypography>
              <Typography variant="h6">{context}</Typography>
            </Box>
          </Box>
        </StyledPaper>
      </Grid>
    </>
  );
}
