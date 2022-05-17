import useSWR from 'swr'
import Container from "@mui/material/Container";
import Tgif from "@components/Tgif"
import Dmr from "@components/Dmr"
import Box from "@mui/material/Box"
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Input from "@mui/material/Input"
import Typography from "@mui/material/Typography"
import { Wizard, useWizard } from 'react-use-wizard';
import {useState} from 'react'

export default function WizardPage(props) {
    return (
        <Wizard>
            <BasicInfo />
        </Wizard>
    )
}

const ariaLabel = { 'aria-label': 'description' };

const BasicInfo = () => {
    const { handleStep, previousStep, nextStep } = useWizard();
    const [state, setState, onStateChange] = useState({
        dstar: false,
        dmr: false,
        ysf: false
    })

    // Attach an optional handler
    handleStep(() => {
      console.log('Going to step 2');
    });

    const handleChange = (event) => {
        setState({
          ...state,
          [event.target.name]: event.target.checked,
        });
      };

    const { dstar, dmr, ysf } = state;
  
    return (
      <>
        <Typography variant="h3">Select your modes</Typography>
        <Box
            component="FormGroup"
            sx={{
                '& > :not(style)': { m: 1 },
            }}
            autoComplete="off"
        >
            <FormControlLabel control={
                <Checkbox checked={dstar} name="dstar" onChange={handleChange} /> 
                } label="D-Star"/>
            <FormControlLabel control={
                <Checkbox />
                } label="DMR" />
            <FormControlLabel control={<Checkbox />} label="Yaesu Fusion" />
        </Box>
        {/* <button onClick={() => previousStep()}>Previous ⏮️</button> */}
        <br/>
        <button onClick={() => nextStep()}>Next ⏭</button>
      </>
    );
  };