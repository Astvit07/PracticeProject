import {Outlet} from 'react-router-dom';
import MainNavigation from '../components/Navigation/MainNavigation';
import {PlayerProvider} from "../components/Player/PlayerContext";
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
