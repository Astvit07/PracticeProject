import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';
import {PlayerProvider} from "../components/PlayerContext";

function RootLayout() {
  return (
    <PlayerProvider>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </PlayerProvider>
  );
}

export default RootLayout;
