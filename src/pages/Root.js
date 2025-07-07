import {Outlet} from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';
import {PlayerProvider} from "../components/PlayerContext";
import {GameProvider} from "../components/GameContext";

function RootLayout() {
  return (
    <GameProvider>
      <PlayerProvider>
        <MainNavigation/>
        <main>
          <Outlet/>
        </main>
      </PlayerProvider>
    </GameProvider>
  );
}

export default RootLayout;
