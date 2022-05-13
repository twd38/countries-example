import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,  
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const title = {
   marginTop: 2,
}

const population = {
    marginBottom: 4
}

const CountryDetail = ({country, handleClose}) => {
  return (
    <div>
      <Modal
        open={country ? true : false}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {country &&
            <Box sx={style}>
                <img src={country.flag} width="300px"/>

                <Typography id="modal-modal-title"  sx={title} variant="h5" component="h2">
                    {country.name}
                </Typography>
                <Typography id="modal-modal-description" sx={population} variant="subtitle1">
                    Population: {country && country.population}
                </Typography>
                <a href={country.map}>Location on Map</a>
            </Box>
        }
      </Modal>
    </div>
  );
}


export default CountryDetail;