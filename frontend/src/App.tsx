import { CssBaseline } from '@mui/material';
import {
  createTheme, StyledEngineProvider, ThemeProvider
} from '@mui/material/styles';
import {
  Route, Switch
} from "react-router-dom";
import ManageImagePage from './pages/ManageImagePage';
import ShowImagePage from "./pages/ShowImagePage";
import UploadImagePage from "./pages/UploadImagePage";

function App(): JSX.Element {
  const theme = createTheme();


  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>

        <CssBaseline />
        <Switch>
          <Route exact path="/">
            <ShowImagePage />
          </Route>
          <Route path="/upload">
            <UploadImagePage />
          </Route>
          <Route path="/manage">
            <ManageImagePage />
          </Route>
        </Switch>
      </ThemeProvider>
    </StyledEngineProvider >
  );
}

export default App;
