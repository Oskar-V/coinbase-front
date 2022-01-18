import {useEffect, useState} from 'react';
import './Header.css';
import {dateTimeString} from "../../helpers";
import '../../assets/coin.PNG';
import DataCenter from "../DataCenter/DataCenter";

interface PropsInterface {
  dataUpdateCountHandler: () => void
}

function Header(props: PropsInterface) {
  const refreshTimer = 60;
  const [timer, setTimer] = useState<number>(refreshTimer);

  useEffect(() => {
    handleTimer();
  }, [timer])

  const handleTimer = () => {
    setTimeout(() => {
      let newTimer: number = timer - 1;
      if (newTimer === 0) {
        setTimer(refreshTimer);
        props.dataUpdateCountHandler();
      } else {
        setTimer(newTimer);
      }
    }, 1000)
  }

  return (
    <div className={"header"}>
      <div className={"header-left-container"}>
        <img
          src={require('../../assets/coin.PNG')}
          alt={"coin"}
          width={100}
          height={100}
        />
      </div>


      <div className={"header-middle-container"}>
        <DataCenter />
      </div>


      <div className={"time-container"}>
        <div className={"text-01"}>Date time: {dateTimeString(new Date())}</div>
        <br/>
        <div className={"text-01"}>Until data refresh: {timer} seconds</div>
      </div>
    </div>
  );
}

export default Header;
