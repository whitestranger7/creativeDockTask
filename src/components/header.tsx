import React from 'react'
import { View } from 'react-native'
import { Text, StyleService } from '@ui-kitten/components'

interface HeaderProps {
  title: string
  text: string
}

export const Header = ({ title, text }: HeaderProps) => (
  <View style={styles.headerWrapper}>
    <Text style={styles.headerTitle}>{title}</Text>
    <Text style={styles.headerText}>{text}</Text>
  </View>
)

const styles = StyleService.create({
  headerWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#000',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerText: {
    textAlign: 'center',
    marginBottom: 32,
  }
})