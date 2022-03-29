import React, { useState } from 'react';

interface StoreInterface {
  phoneNumber: string
  setPhoneNumber: (number: string) => void
}

interface StoreProviderProps {
  children: React.ReactNode
}

export const StoreContext = React.createContext<StoreInterface | null>(null);

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [phoneNumber, setPhoneNumber] = useState('')

  return (
    <StoreContext.Provider value={{ phoneNumber, setPhoneNumber }}>
      {children}
    </StoreContext.Provider>
  )
}
