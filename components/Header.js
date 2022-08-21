import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/system";
import useSWR from "swr";
import Typography from "@mui/material"
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import EngineeringIcon from '@mui/icons-material/Engineering';
import NextLink from 'next/link'
import MuiLink from '@mui/material/Link'
import MuiNextLink from '@components/MuiNextLink'

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const fetcher = (...args) => fetch(...args).then((res) => res.json())

function getEnabledNetworks(config) {

    var ret = {}

    Object.keys(config).map((key) => {
        if (config[key].Enable === '1' && !key.includes("Network"))
            ret[key] = config[key]
    })

    return ret
}

function NetworksHeader(props) {
    if (!props.config) {
        return <>-</>
    }

    const nets = getEnabledNetworks(props.config)

    return (
        <>
        {Object.keys(nets).map((key) => {
            return <div key={key} > {key} </div>
        })}
        </>
    )
}

function CallSignHeader(props) {
    if (!props.config) {
        return <>-</>
    }
    return <>{props.config.General.Callsign}</>
}


const Header = () => {
    const {data, error} = useSWR('/api/mmdvm?mode=json', fetcher)

    if (error) return <>Failed to load</>
    if (!data) return <>Loading...</>

    let config = null
    if (data.status === "not configured") {
        config = null
    } else {
        config = data.config
    }

    const txfreq = config ? parseFloat(config.Info.TXFrequency) / 1000000.0 : 0.0
    const rxfreq = config ? parseFloat(config.Info.RXFrequency) / 1000000.0 : 0.0

    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <Container
                        maxWidth="lg"
                        sx={{ display: `flex`, justifyContent: `space-between` }}
                    >
                        <MuiNextLink 
                            key="Home"
                            href="/"
                            sx={{color: `white`, opacity: 1.0}}
                        >
                            <HomeIcon />
                        </MuiNextLink>
                        <CallSignHeader config={config} />
                        <NetworksHeader config={config} /> 
                        <div>tx: { txfreq } rx: { rxfreq }</div>
                        <MuiNextLink 
                            key="Settings"
                            href="/wizard"
                            sx={{color: `white`, opacity: 1.0}}
                        >
                            <SettingsIcon />
                        </MuiNextLink>
                        <MuiNextLink 
                            key="Edit Ini"
                            href="/config"
                            sx={{color: `white`, opacity: 1.0}}
                        >
                            <EngineeringIcon />
                        </MuiNextLink>
                    </Container>
                </Toolbar>
            </AppBar>
            <Offset />
        </>
    );
};

export default Header;
