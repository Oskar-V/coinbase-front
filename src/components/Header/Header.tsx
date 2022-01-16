import  {useEffect, useState} from 'react';
import './Header.css';
import {dateTimeString} from "../../helpers";
import '../../assets/coin.PNG';

interface PropsInterface {
  dataUpdateCountHandler: () => void
}

function Header(props : PropsInterface) {
  const [timer, setTimer] = useState<number>(15);

  useEffect(() => {
   handleTimer();
  }, [timer])

  const handleTimer = () => {
    setTimeout(()=> {
      let newTimer:number = timer - 1;
      if (newTimer === 0){
        setTimer(15);
        props.dataUpdateCountHandler();
      }else{
        setTimer(newTimer);
      }
    }, 1000)
  }

  return (
    <div className={"header"}>
      <img
        src={require('../../assets/coin.PNG')}
        alt={"coin"}
        width={100}
        height={100}
      />
      <div className={"time-container"}>
        <div className={"text-01"}>Date time: {dateTimeString(new Date())}</div>
        <br/>
        <div className={"text-01"}>Until data refresh: {timer} seconds</div>
      </div>
    </div>
  );
}

export default Header;
