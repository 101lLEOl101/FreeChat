import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {MantineProvider} from "@mantine/core";
import {Provider} from "react-redux";
import {store} from "../store.ts";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
          <MantineProvider defaultColorScheme={'dark'}>
              <BrowserRouter>
                <App/>
              </BrowserRouter>
          </MantineProvider>
      </Provider>
  </StrictMode>,
)
