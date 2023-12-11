import * as React from 'react';
import { Box, Autocomplete, TextField, styled } from '@mui/material';

export default function CountrySelect(props) {

  const WidthAutocomplete = styled(Autocomplete)({
    width: '100%',
  });

  return (
    <WidthAutocomplete
      id="country-select-demo"
      options={props.data}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          
          {option.label}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.title}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}
