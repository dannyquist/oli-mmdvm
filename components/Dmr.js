import { Typography } from "@mui/material"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

export default function Dmr(props) {
    const theme = useTheme()

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
