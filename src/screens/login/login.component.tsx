import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Button, StyleService } from '@ui-kitten/components';
import { Header } from '@src/components/header';

interface LoginComponentProps {
  renderForm: () => JSX.Element;
  onSubmit: () => void;
}

export const LoginComponent = ({ renderForm, onSubmit }: LoginComponentProps) => (
  <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.avoidingView}>
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
        <TouchableWithoutFeedback style={styles.wrapper} onPress={Keyboard.dismiss}>
          <>
            <Header
              title="Welcome"
              text="Great to have you on board. Please start by providing us with the following info."
            />
            {renderForm()}
            <Button onPress={onSubmit}>Create an account</Button>
          </>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  </KeyboardAvoidingView>
);

const styles = StyleService.create({
  avoidingView: {
    flex: 1,
  },
  wrapper: {
    height: 'auto',
    justifyContent: 'flex-end',
  },
  scrollView: {
    paddingHorizontal: 16,
  },
});
