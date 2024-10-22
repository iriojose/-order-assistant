import { FC } from "react";
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const NotFound: FC = () => {

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            flexDirection="column"
            bgcolor="#f5f5f5" 
        >
            <Typography variant="h1" color="primary" gutterBottom>
                404
            </Typography>

            <Typography variant="h6" color="textSecondary">
                this page does not exist
            </Typography>
            
            <Button
                variant="contained"
                color="primary"
                onClick={handleGoBack}
                sx={{ mt: 2 }}
            >
                Go back to main page
            </Button>
        </Box>
    )
}
