import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/system";
import useSWR from "swr";
import Typography from "@mui/material"


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
    const {data, error} = useSWR('/api/mmdvm?mode=json', fetcher)

    if (error) return <>Failed to load</>
    if (!data) return <>Loading...</>

    const nets = getEnabledNetworks(data.config)

    return (
        <>
        {Object.keys(nets).map((key) => {
            return <div key={key} > {key} </div>
        })}
        </>
    )
}

function CallSignHeader() {
    const {data, error} = useSWR('/api/mmdvm?mode=json', fetcher)

    if (error) return <>Failed to load</>
    if (!data) return <>Loading...</>
    
    console.log(data.config.General.Callsign)

    return <>{data.config.General.Callsign}</>
    
}


const Header = () => {
    const {data, error} = useSWR('/api/mmdvm?mode=json', fetcher)

    if (error) return <>Failed to load</>
    if (!data) return <>Loading...</>

    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <Container
                        maxWidth="lg"
                        sx={{ display: `flex`, justifyContent: `space-between` }}
                    >
                        <CallSignHeader />
                        <NetworksHeader /> 
                        <div>tx: { parseFloat(data.config.Info.TXFrequency) / 1000000.0 } rx: { parseFloat(data.config.Info.RXFrequency) / 1000000.0 }</div>
                    </Container>
                </Toolbar>
            </AppBar>
            <Offset />
        </>
    );
};

export default Header;
