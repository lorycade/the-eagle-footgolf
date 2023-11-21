// import { useTheme } from "@mui/material";

export const componentsTheme = (palette: any) => {
  // Extracts the palette object from the theme object

  return {
    components: {
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: palette.text.primary
          }
        }
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            borderRadius: "2px !important",
            input: {
              paddingLeft: "30px",
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: palette.text.primary
            }
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            '& svg': {
              fill: palette.text.primary
            }
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            '& svg': {
              fill: palette.text.primary
            }
          },
        },
      },
    },
  };
};
