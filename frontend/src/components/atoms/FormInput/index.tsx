/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ChangeEvent } from 'react';
import { Controller, RegisterOptions, FieldValues, Control } from 'react-hook-form';
import { TextField } from '@mui/material';
import { SxProps } from '@mui/material';

type Props = {
    name: string
    control: Control<any>
    label?: string
    rules?: Omit<RegisterOptions<FieldValues, string>,"valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"> | undefined;
    multiline?: boolean
    rows?: number
    type?: string
    sx?: SxProps
    onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void 
}

export const FormInput: FC<Props> = ({ name, control, label, rules, multiline, rows, type, sx, onChange }) => { 
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    sx={sx}
                    {...field}
                    label={label}
                    multiline={multiline}
                    rows={rows}
                    type={type}
                    error={!!error}
                    helperText={error ? error.message : ''}
                    onChange={(e) => {
                        field.onChange(e);
                        if(onChange) onChange(e)
                    }} 
                />
            )}
        />
    );
}