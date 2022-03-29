import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Alert } from 'react-native';

import { StoreContext } from '@src/store/store';
import { ValidationComponent } from './validation.component';
import { generateRandomNumber } from './validation.helpers';
import { useNavigation } from '@react-navigation/native';
import { AppScreenNavigationProp } from '@src/navigation/navigators/app.navigation';

export const Validation = () => {
  const store = useContext(StoreContext);
  const navigation = useNavigation<AppScreenNavigationProp>();
  const [verificationCode, setVerificationCode] = useState('');
  const [remainingTime, setRemainingTime] = useState<number>(60);

  const showError = () => {
    Alert.alert('Error!', 'Something goes wrong', [{ text: 'OK', onPress: () => navigation.navigate('Form') }]);
  };

  const sendCode = async () => {
    if ((remainingTime === 60 || remainingTime === 0) && store?.phoneNumber) {
      try {
        const code = generateRandomNumber();
        const result = await axios.post(
          'https://app.dev.p2b.creativedock.cloud/dev/bootcamp/send-sms',
          {
            recipientId: 'd15a2046-5991-42a7-868e-5ec0fbcdafcd',
            number: `+48${store.phoneNumber}`,
            message: `<#> code: ${code}`,
          },
          { headers: { 'Content-Type': 'application/json' } },
        );
        console.log(result)
        if (result) {
          const timer = setInterval(() => {
            if (remainingTime >= 0) {
              setRemainingTime(prev => prev - 1);
            } else {
              setRemainingTime(0);
              clearInterval(timer);
            }
          }, 1000);
          setVerificationCode(code);
        } else {
          showError();
        }
      } catch (error) {
        showError();
      }
    }
  };

  const onSubmit = (code: string) => {
    if (code === verificationCode) {
      Alert.alert('WOW!', '', [{ text: 'cool', onPress: () => navigation.navigate('Form') }])
    }
  };

  useEffect(() => {
    sendCode();
  }, [store]);

  return store?.phoneNumber ? (
    <ValidationComponent
      sendCode={sendCode}
      remainingTime={remainingTime}
      phoneNumber={store.phoneNumber}
      onSubmit={onSubmit}
    />
  ) : null;
};
