import React from 'react'
import { Navigation } from './navigation'
import * as eva from '@eva-design/eva'
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { StoreProvider } from './store/store';

const App = () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <StoreProvider>
      <ApplicationProvider {...eva} theme={eva.light}>
        <Navigation />
      </ApplicationProvider>
    </StoreProvider>
  </>
)

export default App
