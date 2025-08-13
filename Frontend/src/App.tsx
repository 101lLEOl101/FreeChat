import './App.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import {InputTooltip} from "./components/InputTooltip.tsx";

function App() {

  return <MantineProvider defaultColorScheme={'dark'}>
    <InputTooltip></InputTooltip>
  </MantineProvider>
}

export default App
