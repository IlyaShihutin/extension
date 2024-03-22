
import BalancePage from "../pages/BalancePage/BalancePage";
import PassphrasePage from "../pages/PassphrasePage/PassphrasePage";
import WelcomePage from "../pages/WelcomePage/WelcomePage";
import { PageType } from "../types/page.inteface";

export const pageComponents = {
  [PageType.WELCOME]: () => <WelcomePage />,
  [PageType.PHRASE]: () => <PassphrasePage />,
  [PageType.BALANCE]: () => <BalancePage />,
};