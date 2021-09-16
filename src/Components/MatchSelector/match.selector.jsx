import React from 'react'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "10px",
    marginBottom: "10px"
  }
}));
export default function MatchSelector(props) {
  const matches = props.matches
  const setMatchIndex = props.setMatchIndex
  const selectMatch = props.selectMatch
  const classes = useStyles();
  
  return (
    <Grid container className={classes.root} justifyContent="center">
      {matches.length ?
        matches.map((name, index) => <Button style={{marginLeft: "10px", marginRight: "10px", background: "white", fontWeight: "bolder"}} key={name.match + index} variant="outlined" color="primary" size="medium" onClick={() => {setMatchIndex(index); selectMatch(index)}}>{name.match}</Button>)
        :
        null}
    </Grid>

  )
}
