import React from 'react'
import { Typography } from '@mui/material';

export default class Logs extends React.Component {
    constructor(props) {
        super(props)

        this.logs = props.logs.logs
        this.last = props.last ? props.last : 5
    }

    render() {

        return (
            <>
            {
                this.logs.slice(-(this.last+1), -1).map((value, idx) => {
                    return <Typography key={idx}>{value}</Typography>
                })
            }
            </>
        )
        
    }
}