import { Typography } from "@mui/material"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function Dmr(props) {
    const theme = useTheme()

    return (
        <>
            <Paper elevation={3}>
                <Grid container>
                    <Grid item xs={6}>
                        <Typography variant="h3">Network</Typography>
                        <Typography variant="h5">{props.network.from}</Typography>
                        <Typography variant="h6">{props.network.to}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h3">RF</Typography>
                        <Typography variant="h5">{props.rf.from}</Typography>
                        <Typography variant="h6">{props.rf.to}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {/* <Typography>Status: {props.status}</Typography> */}
                    </Grid>
                </Grid>
            </Paper>

            <TableContainer>
                <TableHead>
                    <TableRow>
                        <TableCell>Time</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Slot</TableCell>
                        <TableCell>From</TableCell>
                        <TableCell>To</TableCell>
                        <TableCell>Duration</TableCell>
                        <TableCell>Packet Loss</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.history.log.map((value, index) => {
                        return (
                            <TableRow>
                                <TableCell>{value.datetime}</TableCell>
                                <TableCell>{value.type}</TableCell>
                                <TableCell>{value.slot}</TableCell>
                                <TableCell>{value.from}</TableCell>
                                <TableCell>{value.to}</TableCell>
                                <TableCell>{value.duration}</TableCell>
                                <TableCell>{value.packet_loss}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </TableContainer>
            
        </>
    )

    return (
        <Card sx={{ display: 'flex', width: 400}}>
            <CardContent sx={{flex: '1 0 auto' }}>
                <Typography component='div' variant='h5'>
                    RX: {props.status.from}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    TX: {props.status.to ? props.status.to : "RF"}
                </Typography>
            </CardContent>
            <CardMedia >
                <Box>
                    <Typography variant='h5'>Slot: {props.status.slot}</Typography>
                    <Typography>BER: {props.status.ber}</Typography>
                    <Typography>Packet Loss: {props.status.packet_loss}</Typography>
                </Box>
            </CardMedia>
        </Card>

    )
}
