import './App.css';
import GlobalStyle from './assets/GlobalStyle';
import Header from './layout/Header';
import Router from './shared/Router';
import Footer from './layout/Footer';
import Main from './layout/Main';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <GlobalStyle />
            <Router />
        </QueryClientProvider>
    );
}

export default App;
