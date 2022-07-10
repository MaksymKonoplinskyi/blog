import React from "react";
import { useDispatch } from 'react-redux';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from 'react-hook-form'
 
import styles from "./Login.module.scss";
import { fetchAuth } from "../../redux/slices/auth";

export const Login = (values) => {
  const dispatch = useDispatch(fetchAuth(values))
  const { register, handleSubmit, setError, formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      email: 'gran7777777@gmail.com',
      password: '123456',
    },
  })

  const onSubmit = (values) => {
    dispatch(fetchAuth(values))
  }


  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type= 'email'
          {...register('email', { required: 'Укажите почту' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Пароль"
          error={Boolean(errors.email?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Укажите пароль' })}
          fullWidth />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
