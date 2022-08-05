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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function BasicInfo() {
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
        <Box
            component="form"
            sx={{
                '& > :not(style)': {m: 1, width: '25ch'},
            }}
            noValidate
            autoComplete="off"
            >
            
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            <TextField id="filled-basic" label="Filled" variant="filled" />
            <TextField id="standard-basic" label="Standard" variant="standard" />
        </Box>
    )

    return (
      <>
        <Grid container spacing={2} >

            <Grid item sm container xs={12}>
                <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h5">Callsign</Typography>
                        You had to take a test to get this.
                    </Grid>
                    <Grid item xs>
                        <TextField variant="outlined"
                                   placeholder=""
                                   onChange={handleChange}
                                   name="callsign"
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item sm container xs={12}>
                <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h5">Callsign</Typography>
                        You had to take a test to get this.
                    </Grid>
                    <Grid item xs>
                        <TextField variant="outlined"
                                   placeholder=""
                                   onChange={handleChange}
                                   name="callsign"
                        />
                    </Grid>
                </Grid>
            </Grid>
            {/*<div>*/}

            {/*  <FormControlLabel control={*/}
            {/*      <Checkbox */}
            {/*        checked={dstar} */}
            {/*        name="dstar" */}
            {/*        onChange={handleChange} /> */}
            {/*      } label="D-Star"/>*/}
            {/*  <FormControlLabel control={*/}
            {/*      <Checkbox                     */}
            {/*        checked={dmr} */}
            {/*        name="dmr" */}
            {/*        onChange={handleChange} /> */}
            {/*      } label="DMR" />*/}
            {/*  <FormControlLabel control={*/}
            {/*      <Checkbox                      */}
            {/*        checked={ysf} */}
            {/*        name="ysf" */}
            {/*        onChange={handleChange}  />                  */}
            {/*      } */}
            {/*      label="Yaesu Fusion" />*/}
            {/*</FormGroup>*/}
            {/*</div>*/}
            {sections}
        </Grid>
      </>
    );
  };
