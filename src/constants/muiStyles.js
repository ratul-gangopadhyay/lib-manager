export const loginTextFieldStyles = {
  '& .MuiInputLabel-root': {
    color: '#070f1c',
    fontWeight: 'bold',
    '&.MuiInputLabel-shrink': {
      color: '#070f1c',
    },
    '&.Mui-focused': {
      color: '#070f1c',
    },
    '&.Mui-error': {
      color: 'red',
    },
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#070f1c',
      borderWidth: '2px',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#070f1c',
    },
    '&.Mui-error fieldset': {
      borderColor: 'red',
    },
    '& input': {
      fontWeight: 'bold',
      color: 'inherit',
    },
  },
  '& .MuiFormHelperText-root': {
    color: '#070f1c',
    fontWeight: 'bold',
  },
  '& .Mui-error': {
    '& .MuiInputLabel-root': {
      color: 'red',
      fontWeight: 'bold',
      '&.MuiInputLabel-shrink': {
        color: 'red',
      },
      '&.Mui-focused': {
        color: 'red',
      },
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: 'red',
      },
    },
    '& .MuiFormHelperText-root': {
      color: 'red',
      fontWeight: 'bold',
    },
    '& input': {
      color: 'red',
    },
  },
};

export const buttonStyles = {
  margin: '17px',
  backgroundColor: 'rgb(5, 9, 24)',
  '&:hover': {
    backgroundColor: 'rgba(5, 9, 24, 0.606)',
    boxShadow: 'none',
  },
};
