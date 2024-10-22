import { useState, FC } from 'react';
import { Stepper, Step, StepLabel, Box } from '@mui/material';
import { GeneralInformation } from '../../components/organisms/GeneralInformation';
import { DataTable } from '../../components/organisms/DataTable';

const steps = ['Información General', 'Productos'];

export const Checkout: FC = () => {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    return (
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', marginTop: "20px" }}>
            <Box sx={{ width: '100%', maxWidth: '600px', justifyContent: "center"}}>
                <Stepper activeStep={activeStep} alternativeLabel sx={{ width: '100%' }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Box sx={{ mt: 10, mb: 1, width: 'auto' }}>
                    {activeStep === 0 ? <GeneralInformation next={handleNext} /> : <DataTable back={handleBack}/>}
                </Box>
            </Box>
        </Box>
    )
}
