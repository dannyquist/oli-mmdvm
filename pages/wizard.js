import useSWR from 'swr'
import Container from "@mui/material/Container";
import Tgif from "@components/Tgif"
import Dmr from "@components/Dmr"
import Box from "@mui/material/Box"
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField'
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
        ysf: false,
        callsign: ''
    })

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

    const { dstar, dmr, ysf } = state;
  
    return (
      <>
        <Typography variant="h5">Select your modes</Typography>
        <Box>
          <div>
            <FormGroup>
              <FormControlLabel control={
                <TextField variant="outlined"
                  placeholder="Enter your callsign"
                  onChange={handleChange}
                  name="callsign"
                />
              } />
              <FormControlLabel control={
                  <Checkbox 
                    checked={dstar} 
                    name="dstar" 
                    onChange={handleChange} /> 
                  } label="D-Star"/>
              <FormControlLabel control={
                  <Checkbox                     
                    checked={dmr} 
                    name="dmr" 
                    onChange={handleChange} /> 
                  } label="DMR" />
              <FormControlLabel control={
                  <Checkbox                      
                    checked={ysf} 
                    name="ysf" 
                    onChange={handleChange}  />                  
                  } 
                  label="Yaesu Fusion" />
            </FormGroup>
            </div>
            {sections}
        </Box>
        <Box>
          Boink
        </Box>
      </>
    );
  };