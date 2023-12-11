// ----------------------------------------------------------------------

export default function Table(theme) {
  return {
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: theme.palette.background.paper,
          backgroundColor: theme.palette.maincolor.primary_light,
        },
      },
    },
  };
}
