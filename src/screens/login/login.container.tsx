import React, { useContext, useState } from 'react';
import { LoginComponent } from './login.component';

import { Input, InputProps, PasswordInput, PhoneInput } from '@components/input';
import { Controller, RegisterOptions, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { AppScreenNavigationProp } from '@src/navigation/navigators/app.navigation';
import { StoreContext } from '@src/store/store';

const HELPER_TEXT = 'The name has to match your ID';

interface FormValues {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
}

export const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const navigation = useNavigation<AppScreenNavigationProp>()
  const store = useContext(StoreContext)
  const [isPasswordHidden, setIsPasswordHidden] = useState(false);

  const changePasswordVisibility = () => {
    setIsPasswordHidden(prev => !prev);
  };

  const renderDefaultInput = (
    name: keyof FormValues,
    text: Pick<InputProps, 'labelText' | 'helperText'>,
    rules?: RegisterOptions,
  ) => (
    <Controller
      control={control}
      rules={{
        ...rules,
      }}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Input
          onChangeText={onChange}
          error={errors[name]}
          value={value}
          labelText={text.labelText}
          helperText={text.helperText}
        />
      )}
    />
  );

  const renderForm = () => (
    <>
      {renderDefaultInput('id', { labelText: 'National ID number' })}
      {renderDefaultInput('firstName', { labelText: 'First name', helperText: HELPER_TEXT })}
      {renderDefaultInput('lastName', { labelText: 'Last name', helperText: HELPER_TEXT })}
      <Controller
        control={control}
        rules={{
          required: true,
          validate: (number: string) => number.length === 9
        }}
        name="phoneNumber"
        render={({ field: { onChange, value } }) => (
          <PhoneInput onChangeText={onChange} error={errors['phoneNumber']} value={value} labelText="Phone Number" />
        )}
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        name="password"
        render={({ field: { onChange, value } }) => (
          <PasswordInput
            onChangeText={onChange}
            labelText="Password"
            isHidden={isPasswordHidden}
            onIconPress={changePasswordVisibility}
            value={value}
          />
        )}
      />
    </>
  );

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    console.log(store)
    console.log(errors)
    if (store) {
      store.setPhoneNumber(data.phoneNumber)
      navigation.navigate('Validation')
    } 
  });

  return <LoginComponent renderForm={renderForm} onSubmit={onSubmit} />;
};
