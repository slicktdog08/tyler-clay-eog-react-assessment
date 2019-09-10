import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { useSelector } from "react-redux";


const useStyles = makeStyles({
    root: {
        //flexGrow: 1,
    },
    card: {
      background: '#FFFFFF',
      marginTop: 15
    },
    title: {
      fontSize: 20,
      color: '#273142'
    },
    value: {
        color: 'black',
        fontSize: 30
    },
    unit: {
        fontSize: 12
    }
});

const getSelectedOptions = state => {
    const {selectedOptions} = state.dataOptions;
    return {
        selectedOptions
    }
}

const getLiveData = state => {
    return{
        ...state.subscriptionData
    }
}

export default () => {
    const classes = useStyles();
    const {selectedOptions} = useSelector(
        getSelectedOptions
    );
    const subscriptionData = useSelector(
        getLiveData
    )
    
    return(
        <div className={classes.root}>
            <Grid container spacing={0}>
                {selectedOptions.map(o=>{
                    return(
                        <Grid item md={2} key={o.value}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        {o.name}
                                    </Typography>
                                    
                                    <Typography variant="body2" component="p" className={classes.value}>
                                        {subscriptionData[o.value].value} <small className={classes.unit}>{o.unit}</small>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                })}
                
                
            </Grid>
        </div>
    )
}