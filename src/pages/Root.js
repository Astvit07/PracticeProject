import {Outlet} from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';
import {PlayerProvider} from "../components/PlayerContext";
import {GameProvider} from "../components/GameContext";
import {BoardProvider} from "../service/BoardContext";

function RootLayout() {
  return (
    <GameProvider>
      <BoardProvider>
        <PlayerProvider>
          <MainNavigation/>
          <main>
            <Outlet/>
          </main>
        </PlayerProvider>
      </BoardProvider>
    </GameProvider>
  );
}

export default RootLayout;
