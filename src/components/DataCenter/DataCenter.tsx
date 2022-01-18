import {ChangeEvent, ChangeEventHandler, useEffect, useState} from 'react';
import './DataCenter.css';
import {
  Backdrop,
  Box, Button,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  TextField
} from "@mui/material";
import {dateTimeString,} from "../../helpers";


function DataCenter() {

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'black',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  const [timerInterval, setTimerInterval] = useState<number>(60);
  const [timer, setTimer] = useState<number>(timerInterval);
  const [open, setOpen] = useState<boolean>(true);
  const [manualRefresh, setManualRefresh] = useState<boolean>(false);
  const [lastUpdate, setLastUpdate] = useState<Date|null>(null);



  const handleTimerIntervalChange = (event: ChangeEvent<any>) => {
    let { value } = event.target;
    if (value <= 0) value = 1
    setTimerInterval(value);
  }

  useEffect(() => {
    updateData();
  }, [])

  useEffect(() => {
    handleTimer();
  }, [timer])

  const handleTimer = () => {
    if (manualRefresh){
      setTimer(timerInterval);
      setManualRefresh(false);
      updateData();
    }else{
      setTimeout(() => {
        let newTimer: number = timer - 1;
        if (newTimer <= 0) {
          setTimer(timerInterval);
          updateData();
        } else {
          setTimer(newTimer);
        }
      }, 1000)
    }
  }

  const updateData = () => {
      setLastUpdate(new Date());
  }

  return (
    <div>
      <Button
        variant="contained"
        component="span"
        onClick={() => setOpen(true)}
      >
        Open data center
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={()=>setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>

            <div className={"data-center-header text-01 header-text-01"}>Data center</div>

            <div className={"data-refresh-timer-container"}>
              <div>
                <div className={"text-01"}>Until data refresh: {timer} seconds</div>
                <br/>
                <Button
                  variant="contained"
                  component="span"
                  onClick={() => setManualRefresh(true)}
                  disabled={manualRefresh}
                >
                  Manual refresh
                </Button>
              </div>
              <TextField
                style={{width: 130}}
                label="Interval seconds"
                value={timerInterval}
                onChange={handleTimerIntervalChange}
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className={"data-center-divider"}></div>

            <div className={"text-01"}>Last update: {lastUpdate ? dateTimeString(lastUpdate) : '-'}</div>

            <div className={"data-center-divider"}></div>

          </Box>
        </Fade>
      </Modal>
    </div>

  );
}

export default DataCenter;
