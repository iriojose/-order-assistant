import { FC } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";

export const Navbar: FC = () => {
    const navigate = useNavigate()

    const hanlderGoCheckout = () => {
        navigate("/checkout")
    }

    return (
        <AppBar 
            position="static"
            sx={{ backgroundColor: 'white', boxShadow: 'none', color: '#000' }}
        >
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Generardor de Ordenes
                </Typography>

                <Box>
                    <Button 
                        onClick={hanlderGoCheckout}
                        variant="contained"
                        sx={{ backgroundColor: '#90caf9', color: '#fff', '&:hover': { backgroundColor: '#64b5f6' } }}
                    >
                        ¿Quieres crear una orden?
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}