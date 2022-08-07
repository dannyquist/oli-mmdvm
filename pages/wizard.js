import useSWR from 'swr'
import Container from "@mui/material/Container";
import Tgif from "@components/Tgif"
import Dmr from "@components/Dmr"
import Box from "@mui/material/Box"
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import {Grid} from "@mui/material";
import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Input from "@mui/material/Input"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button";
import { Wizard, useWizard } from 'react-use-wizard';
import {useState, useEffect} from 'react'
import Link from 'next/link'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function WizardPage() {
    const {data, error} = useSWR('/api/mmdvm?mode=json', fetcher)
    let initialState
    if (error) {
        console.log("Could not fetch config", error)
    }

    if (!data) {
        initialState = {}
    }

    const [state, setState] = useState({})

    const {sections, setSections} = useState()

    const handleChange = (event) => {
        switch (event.target.type) {
          case "checkbox":
            setState({
              ...state,
              [event.target.name]: event.target.checked,
            });
            break
          case "text":
            setState({
              ...state,
              [event.target.name]: event.target.value,
            })
            break
          default:
            break
        }
      };

    function onSave() {
        fetch("/api/wizard", {
            method: 'POST',
            body: JSON.stringify(state)
        })
            .then(response => response.json())
            .then(data => console.log("Received response from save event", data))
    }

    useEffect(function() {
        if (!data)
            return

        if (!data.config)
             return

        if (Object.keys(data.config).length === 0)
            return

        setState({...state,
            callsign: data.config.General.Callsign,
            dmrid: data.config.DMR.Id,
            dmrnetwork: data.config["DMR Network"].Address,
            dmrnetworkport: data.config["DMR Network"].Port,
            dmrpassword: data.config["DMR Network"].Password,
            txfreq: data.config.Info.TXFrequency,
            rxfreq: data.config.Info.RXFrequency,
            lat: data.config.Info.Latitude,
            lon: data.config.Info.Longitude,
            location: data.config.Info.Location,
            country: data.config.Info.Description
        })

        console.log("Current State", state)
    }, [data])

    return (
        <>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': {m: 1, width: '25ch'},
                }}
                noValidate
                autoComplete="off"
                >
                <Button onClick={onSave}>Save</Button>
                <Typography variant="h5">Callsign</Typography>
                <Typography gutterBottom>This is your government issued amateur radio callsign</Typography>
                <TextField name="callsign" onChange={handleChange} value={state.callsign} variant="outlined" />

                <Typography variant="h5">DMR ID</Typography>
                <Typography gutterBottom>Brandmeister issued ID. Register at <a target="_blank" href="https://radioid.net">RadioID</a></Typography>
                <TextField name="dmrid" onChange={handleChange} value={state.dmrid} variant="outlined" />

                <Typography variant="h5">DMR Network</Typography>
                <TextField name="dmrnetwork" onChange={handleChange} value={state.dmrnetwork} variant="outlined" />

                <Typography variant="h5">DMR Network Port</Typography>
                <TextField name="dmrnetworkport" onChange={handleChange}  value={state.dmrnetworkport} variant="outlined" />

                <Typography variant="h5">DMR Network Password</Typography>
                <TextField name="dmrpassword" onChange={handleChange} value={state.dmrpassword} variant="outlined" />

                <Typography variant="h5">TX Frequency</Typography>
                <TextField name="txfreq" onChange={handleChange}  value={state.txfreq} variant="outlined" />

                <Typography variant="h5">RX Frequency</Typography>
                <TextField name="rxfreq" onChange={handleChange} value={state.rxfreq} variant="outlined" />

                <Typography variant="h5">Latitude</Typography>
                <TextField name="lat" onChange={handleChange}  value={state.lat} variant="outlined" />

                <Typography variant="h5">Longitude</Typography>
                <TextField name="lon" onChange={handleChange} value={state.lon} variant="outlined" />

                <Typography variant="h5">Location</Typography>
                <TextField name="location" onChange={handleChange} value={state.location} variant="outlined" />

                <Typography variant="h5">Country</Typography>
                <TextField name="country" onChange={handleChange}  value={state.country} variant="outlined" />


            </Box>
            <Typography>{JSON.stringify(state)}</Typography>
        </>
    )

  };
