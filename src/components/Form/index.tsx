import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { LoadingButton } from '@mui/lab';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from "react";
import ButtonCmp from "@components/ButtonCmp/ButtonCmp";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";

interface FormCmpInterface {
  title?: string;
  formInputs?: any;
  formSchema?: any;
  onFormSubmit?: (formObject: any) => void;
  resetButton?: boolean;
  submitLabel: string;
}

const FormCmp: React.FC<FormCmpInterface> = ({ title, submitLabel, formInputs, formSchema, resetButton, onFormSubmit }) => {
  const [object, setObject] = useState<any>('');

  const handleChange = (id: string, event: SelectChangeEvent) => {
    // console.log('target', event);

    const value = event.target ? event.target.value : event;

    setValue(id, value, { shouldValidate: true })
  };

  type formInput = TypeOf<typeof formSchema>;

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    watch,
    reset,
    handleSubmit,
    setValue
  } = useForm<formInput>({
    resolver: zodResolver(formSchema),
  });


  watch((object) => {
    // console.log('oggetto in costruzione -->', object);
    setObject(object)
  })


  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<formInput> = (values) => {
    onFormSubmit && onFormSubmit(values)
  };
  // console.log('errors -->', errors);

  return (
    <Box>
      {title &&
        <Typography variant='h4' component='h1' sx={{ mb: '2rem' }}>{title}</Typography>
      }
      <Box
        component='form'
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <Grid container spacing={2} sx={{ mt: 0, mb: 3 }}>
          {formInputs.map((input: any) => {
            switch (input.component) {
              case 'input':
                return <Grid key={input.key} item xs={input.fullWidth ? 12 : 4}>
                  <TextField
                    sx={{ mb: 2 }}
                    label={input.label}
                    placeholder={input.placeholder}
                    fullWidth
                    required={input.required}
                    multiline={input.multiline}
                    rows={input.rows}
                    type={input.inputType}
                    error={!!errors[input.key]}
                    helperText={`${errors[input.key] ? errors[input.key]?.message : ''}`}
                    {...register(input.key)}
                  />
                </Grid>
              case 'select':
                return <Grid key={input.key} item xs={input.fullWidth ? 12 : 4}>
                  <FormControl required={input.required} fullWidth sx={{ mb: 2 }} error={!!errors[input.key]} {...register(input.key)}>
                    <InputLabel id="demo-simple-select-label">{input.label}</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={object && object[input.key]}
                      label={input.label}
                      onChange={(event) => handleChange(input.key, event)}
                    >
                      {input.options.map((option: { value: string, label: string }) => (
                        <MenuItem value={option.value}>{option.label}</MenuItem>
                      ))}
                    </Select>
                    {errors && errors[input.key] && <FormHelperText>{`${errors[input.key]?.message}`}</FormHelperText>}
                  </FormControl>
                </Grid>
              case 'radio':
                return <Grid key={input.key} item xs={input.fullWidth ? 12 : 4}>
                  <FormControl required={input.required} sx={{ mb: 2 }} error={!!errors[input.key]}>
                    <FormLabel id="demo-radio-buttons-group-label" sx={{ color: 'white' }}>{input.label}</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      onChange={(event) => handleChange(input.key, event)}
                      row
                    >
                      {input.options.map((option: { value: string, label: string }) => (
                        <FormControlLabel {...register(input.key)} value={option.value} control={<Radio checked={object && object[input.key] === option.value} />} label={option.label} />
                      ))}
                    </RadioGroup>
                    {errors && errors[input.key] && <FormHelperText>{`${errors[input.key]?.message}`}</FormHelperText>}
                  </FormControl>
                </Grid>
              case 'checkbox':
                return <Grid key={input.key} item xs={input.fullWidth ? 12 : 4}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox required={input.required} checked={object && object[input.key]} />}
                      {...register(input.key)}
                      label={
                        <Typography color={errors[input.key] ? 'error' : 'inherit'}>
                          {input.label}
                        </Typography>
                      }
                    />
                    <FormHelperText error={!!errors[input.key]}>
                      {`${errors[input.key] ? errors[input.key]?.message : ''}`}
                    </FormHelperText>
                  </FormGroup>
                </Grid>
              case 'single-date':
                return <Grid key={input.key} item xs={input.fullWidth ? 12 : 4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs} {...register(input.key)}>
                    <DatePicker
                      label={input.label}
                      format="DD/MM/YYYY"
                      minDate={input.minDate ? input.minDate === "" ? dayjs() : dayjs(input.minDate) : null}
                      onChange={(value: any) => handleChange(input.key, value.valueOf())}
                    />
                    <FormHelperText error={!!errors[input.key]}>
                      {`${errors[input.key] ? errors[input.key]?.message : ''}`}
                    </FormHelperText>
                  </LocalizationProvider>
                </Grid>

              default:
                break;
            }
          })}
        </Grid>

        {resetButton &&
          <ButtonCmp title="reset" onClick={() => reset()} />
        }
        <ButtonCmp title={submitLabel} type="submit" />
      </Box>
    </Box>
  );
};

export default FormCmp;
