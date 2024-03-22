
import { useWallet } from "../../store/WalletContext";
import { usePage } from "../../store/PageContext";

import { WalletStatusType } from "../../types/wallet.interface";
import { PageType } from "../../types/page.inteface";

import Button from "../../components/Button/Button";

import "./style.scss";

const WelcomePage: React.FC = () => {
  const { setWallet } = useWallet();
  const { setActivePage } = usePage();

  const createPhrase = () => {
    setWallet({ status: WalletStatusType.CREATE })
    setActivePage(PageType.PHRASE)
  }
  const restorePhrase = () => {
    setWallet({ status: WalletStatusType.RESTORE })
    setActivePage(PageType.PHRASE)
  }

  return (
    <div className='welcome' >
      <h1 className="welcome_text">WELCOME</h1>
      <Button onClick={createPhrase} text={"CREATE"} />
      <Button onClick={restorePhrase} text={"RESTORE"} />
    </div>
  );
}

export default WelcomePage;
