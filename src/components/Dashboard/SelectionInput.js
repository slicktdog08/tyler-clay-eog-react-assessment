import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../store/actions'


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  },
}));

const getOptions = state => {
  const {options, selectedOptions} = state.dataOptions;
  return {
    options,
    selectedOptions
  };
};

export default function SelectionInput(props) {
  const classes = useStyles();
  const dispatch = useDispatch()
  

  

  const {options, selectedOptions} = useSelector(
    getOptions
  )

  const handleDelete = chipToDelete => () => {
    dispatch({type:actions.REMOVE_DATA_OPTION, removed: chipToDelete})
  };

  const handleChange = event => {
      var newOptionSelected = JSON.parse(event.target.value);
      dispatch({type: actions.SET_NEW_DATA_OPTION, selected: newOptionSelected})
  }

  return (
    <Paper className={classes.root}>
      {selectedOptions != 'undefined' && selectedOptions.length != 6 ?
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="data-point">
          {typeof(selectedOptions) != 'undefined' && selectedOptions.length === 0 ? 'Select Data Point to Add' : 'Add Another Data Point'}</InputLabel>
        <Select
          onChange={handleChange}
          value={``}
        >
          {typeof(options) != 'undefined' && options.map(o=>{
            return(
              <MenuItem value={JSON.stringify(o)} key={o.value} name={o.name}>
                {o.name}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl> : <span/>
      }
      {selectedOptions.map(data => {
        return (
          <Chip
            key={data.value}
            label={data.name}
            onDelete={handleDelete(data)}
            className={classes.chip}
          />
        );
      })}
    </Paper>
  );
}