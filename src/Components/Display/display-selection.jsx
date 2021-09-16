import React from "react";
import Slider from "@material-ui/core/Slider";
import { Container } from "@material-ui/core";
import { withStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300 + theme.spacing(3) * 2,
  },
  margin: {
    height: theme.spacing(3),
  },
}));
const marks = [
  {
    value: 0,
    label: "Overview"
  },
  {
    value: 25,
    label: "Offense"
  },
  {
    value: 50,
    label: "Defense"
  },
  {
    value: 75,
    label: "Spikes"
  },
  {
    value: 100,
    label: "Support"
  }
];
const SelectSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);
export default function DisplaySelection(props) {
  const { disp, setDisp } = props
  const handleChange = (event, newValue) => {
    setDisp(newValue)
  }
  return (
    <Container>

      <form>
        <SelectSlider step={null} marks={marks} valueLabelDisplay="off" onChange={handleChange} />
      </form>
    </Container>
  );
}