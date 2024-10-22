
import { FC, useEffect} from "react";
import { Box, Typography, Button} from '@mui/material';
import { useContextProvider } from "../../../store";
import { useForm } from 'react-hook-form'
import { FormInput } from "../../atoms/FormInput";
import { useNavigate } from "react-router-dom";

type Props = {
    next: () => void
}

type FormState = {
    client: string
    address: string
}

export const GeneralInformation: FC<Props> = ({ next }) => {
    const { actions, state } = useContextProvider()
    const navigate = useNavigate()

    const { control, formState: { isValid }, getValues, reset } = useForm<FormState>({
        defaultValues: {
            client: state.clientInformation?.client || "",
            address: state.clientInformation?.address || ""
        },
        mode: 'onChange'
    });

    useEffect(() => {
        if (state.clientInformation) {
            reset({
                client: state.clientInformation.client || '',
                address: state.clientInformation.address || ''
            });
        }
    }, [state.clientInformation, reset]);

    const currentDate = new Date().toLocaleDateString();

    const goHomeClick = () => navigate("/")

    const hanldleClick = () => {
        actions.setClientInformation({client: getValues("client"), address: getValues("address")})
        next()
    }
    
    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: "40px" }}>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography sx={{ width: '30%', textAlign: 'right', pr: 2 }}>Fecha:</Typography>
                    <Typography sx={{ width: '70%' }}>{currentDate}</Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'start', mb: 2 }}>
                    <Typography sx={{ width: '30%', textAlign: 'right', pr: 2  }}>Nombre del Cliente:</Typography>
                    <FormInput
                        sx={{width: "70%"}}
                        name="client"
                        control={control}
                        rules={{ required: 'El nombre es obligatorio', minLength: { value: 3, message: 'El nombre debe tener al menos 3 caracteres' } }}
                    />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'start', mb: 2 }}>
                    <Typography sx={{ width: '30%', textAlign: 'right', pr: 2  }}>Dirección:</Typography>
                    <FormInput
                        sx={{width: "70%"}}
                        name="address"
                        control={control}
                        multiline
                        rows={4}
                        rules={{ required: 'La dirección es obligatoria', minLength: { value: 3, message: 'La dirección debe tener al menos 3 caracteres' } }}
                    />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: "end", pt: 2 }}>
                    <Button
                        onClick={goHomeClick}
                        sx={{ mr: 1 }}
                        variant="outlined"
                    >
                        Home
                    </Button>

                    <Button
                        onClick={hanldleClick}
                        sx={{ mr: 1 }}
                        disabled={!isValid}
                        variant="contained"
                    >
                        Siguiente
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
