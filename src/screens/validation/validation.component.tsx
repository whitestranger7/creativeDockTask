import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { StyleService, Text } from '@ui-kitten/components';

import { Header } from '@src/components/header';
import { CodeInput, CodeInputProps } from '@src/components/codeInput';

interface ValidationComponentProps extends CodeInputProps {
  phoneNumber: string;
  remainingTime: number;
  sendCode: () => void;
}

export const ValidationComponent = ({ phoneNumber, onSubmit, remainingTime, sendCode }: ValidationComponentProps) => (
  <SafeAreaView>
    <View style={styles.wrapper}>
      <Header title="Authentication" text={`We've sent a verification code to your phone number +48${phoneNumber}`} />
      <CodeInput onSubmit={onSubmit} />
      {remainingTime && (
        <Text style={styles.text}>
          The code will expire in {remainingTime} seconds. <Text onPress={sendCode}>Resend.</Text>
        </Text>
      )}
    </View>
  </SafeAreaView>
);

const styles = StyleService.create({
  wrapper: {
    paddingHorizontal: 16,
    marginTop: 100,
    alignItems: 'center',
  },
  text: {
    marginTop: 30,
  },
});
