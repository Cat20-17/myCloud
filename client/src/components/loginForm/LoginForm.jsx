import React, {useCallback} from 'react';
import Input from '../utils/input/Input';
import Button from '../utils/button/Button';
import Form from '../utils/form/Form';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/reducers/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();

    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      navigate(`/user/files`);
    }
  }, [email, password, dispatch, navigate]
  );

  return (
    <Form onSubmit={onSubmit} name={'Log In'}>
      <Input type={'email'} placeholder={'Enter your email...'} value={email} onChange={setEmail}></Input>
      <Input type={'password'} placeholder={'Enter your password...'} value={password} onChange={setPassword}></Input>
      <Button type={'submit'} variant={'primary'}>Log In</Button>
    </Form>
  );
};

export default LoginForm;