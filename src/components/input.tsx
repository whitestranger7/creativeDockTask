import React from 'react';
import { View, TextInput, TextInputProps } from 'react-native';
import { FieldError } from 'react-hook-form';
import { StyleService, Text, Icon } from '@ui-kitten/components';

export interface InputProps extends TextInputProps {
  value: string;
  labelText: string;
  helperText?: string;
  error?: FieldError;
}

interface PasswordInput extends InputProps {
  isHidden: boolean;
  onIconPress: () => void;
}

const BORDER_RADIUS = 6;

export const Input = ({ value, labelText, helperText, ...props }: InputProps) => (
  <View style={styles.wrapper}>
    <Text style={styles.label}>{labelText}</Text>
    <TextInput {...props} style={styles.input} value={value} />
    {helperText && <Text style={styles.helperText}>{helperText}</Text>}
  </View>
);

export const PhoneInput = ({ value, labelText, error, ...props }: InputProps) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{labelText}</Text>
      <View style={!error ? styles.phoneInputWrapper : styles.errorPhoneInputWrapper}>
        <View style={styles.phoneInputCodeContainer}>
          <Text>+48</Text>
        </View>
        <TextInput
          {...props}
          style={[styles.input, styles.phoneNumberInput]}
          value={value}
          maxLength={9}
          keyboardType='number-pad'
        />
      </View>
    </View>
  )
};

export const PasswordInput = ({ value, labelText, isHidden, onIconPress, ...props }: PasswordInput) => (
  <View style={styles.wrapper}>
    <Text style={styles.label}>{labelText}</Text>
    <View>
      <TextInput {...props} style={[styles.input, styles.passwordInput]} value={value} secureTextEntry={!isHidden} />
      <Icon name={`eye${isHidden ? '-off' : ''}-outline`} style={styles.icon} fill="#2C2E30" onPress={onIconPress} />
    </View>
  </View>
);

const styles = StyleService.create({
  wrapper: {
    width: '100%',
    marginBottom: 24,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: '#fff',
    borderRadius: BORDER_RADIUS,
    paddingLeft: 12,
  },
  errorInput: {
    borderWidth: 1,
    borderColor: 'red',
  },
  phoneNumberInput: {
    flex: 1,
    border: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  passwordInput: {
    paddingRight: 45,
  },
  helperText: {
    fontSize: 10,
    color: '#9A9A9A',
    marginTop: 3,
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    width: '100%',
  },
  errorPhoneInputWrapper: {
    borderWidth: 1,
    borderColor: 'red',
    flexDirection: 'row',
    width: '100%',
  },
  phoneInputCodeContainer: {
    backgroundColor: '#F6F6F6',
    flex: 0,
    borderTopLeftRadius: BORDER_RADIUS,
    borderBottomLeftRadius: BORDER_RADIUS,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  icon: {
    position: 'absolute',
    right: 12,
    top: -34,
    width: 25,
    height: 20,
  },
});
