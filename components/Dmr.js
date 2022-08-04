import { Typography } from "@mui/material"

export default function Dmr(props) {
    return (
        <>
            <Typography>DMR: {JSON.stringify(props.status)} </Typography>
            <Typography>History: <br/> {JSON.stringify(props.history)}</Typography>
            
        </>
    )
}