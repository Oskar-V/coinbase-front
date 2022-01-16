import {useEffect,  useState} from 'react';
import './ProductCandleChart.css';
import axios from "axios";
import ReactEcharts from 'echarts-for-react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField
} from "@mui/material";
import DateAdapter from '@mui/lab/AdapterMoment';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import {LocalizationProvider} from "@mui/lab";
import {useSnackbar} from "notistack";
import {getDateTimeString} from "../../helpers";


interface PropsInterface {
  productId: string
  dataUpdateCount: number
}

interface ProductCandleStick {
  time: number
  low: number
  high: number
  open: number
  close: number
  volume: number
}

function ProductCandleChart(props: PropsInterface) {
  const {enqueueSnackbar} = useSnackbar();
  const [productCandleSticks, setProductCandleSticks] = useState<ProductCandleStick[]>([]);
  const [granularity, setGranularity] = useState<number>(300);
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());


  useEffect(() => {
    axios.get(`https://api.exchange.coinbase.com/products/${props.productId}/candles?granularity=${granularity}&start=${getDateTimeString('start', startTime)}&end=${getDateTimeString('end', endTime)}`)
      .then(response => {
        const data: ProductCandleStick[] = [];
        response.data.forEach((it: number[]) => {
          data.push({
            time: it[0],
            low: it[1],
            high: it[2],
            open: it[3],
            close: it[4],
            volume: it[5]
          })
        })
        setProductCandleSticks(data.reverse());
        enqueueSnackbar(`Updated ${props.productId} data!`,
          {
            variant:'success',
            transitionDuration: {appear:4000},
            anchorOrigin:{horizontal:'right', vertical: 'bottom'}
          });
      }).catch(e => {
        //TODO undo select boxes if wrong config, granularity for example
      enqueueSnackbar(`Failed ${props.productId} data update! ${e.response.data.message}` ,
        {
          variant:'error',
          transitionDuration: {appear:15000},
          anchorOrigin:{horizontal:'right', vertical: 'bottom'}
        });
    });
  }, [granularity, startTime, endTime, props.dataUpdateCount])

  const getOption = () => {
    const dateTimes: string[] = [];
    const data: number[][] = [];
    let minVal: number = Number.MAX_VALUE;
    productCandleSticks.forEach(it => {
      dateTimes.push(new Date(it.time * 1000).toDateString());
      data.push([it.open, it.close, it.low, it.high]);
      if (minVal > it.low) minVal = it.low;
    })

    return {
      title: {
        text: props.productId
      },
      xAxis: {
        data: dateTimes
      },
      yAxis: {
        min: minVal,
      },
      dataZoom: {
        type: 'slider',
      },
      grid: {
        right: '220'
      },
      tooltip:{
        trigger: 'axis'
      },
      series: [
        {
          type: 'candlestick',
          data: data
        }
      ]
    }
  }

  const handleChangeGranularity = (event: SelectChangeEvent<unknown>) => {
    setGranularity(Number(event.target.value));
  }

  window.addEventListener('resize',function(){
    //TODO there is a resize() function on echarts that has to be called here. Dont know how to access echarts instance...
  })

  return (
    <div className={"product-candle-chart"}>

      <div className={"product-candle-chart-header"}>
        <FormControl >
          <InputLabel>Granularity</InputLabel>
          <Select
            label="Granularity"
            onChange={handleChangeGranularity}
            value={granularity}
          >
            <MenuItem value={60}>1 min</MenuItem>
            <MenuItem value={300}>5 min</MenuItem>
            <MenuItem value={900}>15 min</MenuItem>
            <MenuItem value={3600}>1h</MenuItem>
            <MenuItem value={21600}>6 h</MenuItem>
            <MenuItem value={86400}>1 d</MenuItem>
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DesktopDatePicker
            label="Start date"
            inputFormat="dd/MM/yyyy"
            disableMaskedInput={true}
            value={startTime}
            onChange={newDate => setStartTime(newDate ? newDate : new Date())}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DesktopDatePicker
            label="End date"
            inputFormat="dd/MM/yyyy"
            disableMaskedInput={true}
            value={endTime}
            onChange={newDate => setEndTime(newDate ? newDate : new Date())}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>

      <ReactEcharts
        option={getOption()}
        theme={"dark"}
      />
    </div>
  );
}

export default ProductCandleChart;
