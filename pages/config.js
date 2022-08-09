import useSWR from 'swr'
import Container from "@mui/material/Container";
import Tgif from "@components/Tgif"
import Dmr from "@components/Dmr"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import {useState} from 'react'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const code =  `function add(a, b) {
    return a + b;
  }
  `;

const Config = () => {
    const [mmdvm, setMmdvm] = useState(0)
    const {data, error} = useSWR('/api/mmdvm?mode=ini', fetcher)

    if (error) return <>Failed to load</>
    if (!data) return <>Loading...</>

    return (
        <>
            <Typography variant="h3">mmdvm.ini</Typography>
            <Typography>Edit the files directly here. Click "Save" to make things permanent. No undo, no surrender.</Typography>
            <Container border="1">
                <Button 
                    onClick={() => {
                            const requestOptions = {
                                method: 'POST',
                                body: JSON.stringify(mmdvm),
                            }
                            fetch('/api/mmdvm?mode=ini', requestOptions)
                                .then(response => response.json())
                                .then(data => console.log("POST response:", data))
                        }
                    }
                    variant="contained">Save</Button>
            <Editor
                value={mmdvm ? mmdvm : data.config}
                onValueChange={code => setMmdvm(code)}
                highlight={code => highlight(code, languages.js)}
                padding={10}
                style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                    width: '100%',
                    height: '50%'
                }}
                />
            </Container>
        </>
    );
};

export default Config;
