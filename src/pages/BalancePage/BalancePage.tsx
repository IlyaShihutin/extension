import { useWallet } from "../../store/WalletContext";
import { usePage } from "../../store/PageContext";

import { PageType } from "../../types/page.inteface";

import Button from "../../components/Button/Button";

import "./style.scss";

const BalancePage: React.FC = () => {
  const { wallet, setWallet } = useWallet();
  const { setActivePage } = usePage();

  const logout = () => {
    setWallet(null);
    setActivePage(PageType.WELCOME);
  }

  return (
    <div className='balance' >
      <p>Address:</p>
      <p className="balance_address">{String(wallet?.publicKey)}</p>
      <p>Balance SOL: {wallet?.balance}</p>
      <Button onClick={logout} text={"Logout"} />
    </div>
  );
}

export default BalancePage;
