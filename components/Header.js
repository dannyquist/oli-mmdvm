import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/system";
import useSWR from "swr";
import Typography from "@mui/material"
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import NextLink from 'next/link'
import MuiLink from '@mui/material/Link'
import MuiNextLink from '@components/MuiNextLink'

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const fetcher = (...args) => fetch(...args).then((res) => res.json())

function getEnabledNetworks(config) {

    var ret = {}

    Object.keys(config).map((key) => {
        if (config[key].Enable === '1')
            ret[key] = config[key]
    })

    return ret
}

function NetworksHeader(props) {
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
    return <>{props.config.General.Callsign}</>
}


const Header = () => {
    const {data, error} = useSWR('/api/mmdvm?mode=json', fetcher)

    if (error) return <>Failed to load</>
    if (!data) return <>Loading...</>

    if (data.status === "not configured") {
        return <>Not configured</>
    }

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
                        <CallSignHeader config={data.config} />
                        <NetworksHeader config={data.config} /> 
                        <div>tx: { parseFloat(data.config.Info.TXFrequency) / 1000000.0 } rx: { parseFloat(data.config.Info.RXFrequency) / 1000000.0 }</div>
                        <MuiNextLink 
                            key="Settings"
                            href="/config"
                            sx={{color: `white`, opacity: 1.0}}
                        >
                            <SettingsIcon />
                        </MuiNextLink>
                    </Container>
                </Toolbar>
            </AppBar>
            <Offset />
        </>
    );
};

export default Header;
