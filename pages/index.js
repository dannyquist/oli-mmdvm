import useSWR from 'swr'
import {useRef, useEffect, useState} from 'react'
import Container from "@mui/material/Container";
import { Typography } from '@mui/material';
import Tgif from "@components/Tgif"
import Dmr from "@components/Dmr"
import Logs from "@components/Logs"
import Box from "@mui/material/Box"
import io from 'socket.io-client'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

let socket

const Homepage = () => {
  const {data, error} = useSWR('/api/logs?mode=json', fetcher)
  const [dmrStatus, setDmrStatus] = useState({})
  const logsRef = useRef()

  useEffect(() => {
    async function fetchData() {
      await fetch('/api/socket')
    }
    fetchData()
    socket = io()

    socket.on('connect', () => {
      console.log("Socket connected")
    })

    socket.on('dmr-status', msg => {
      console.log("web socket message received", msg)
    })

    socket.on('log', msg => {
      console.log("log received", msg)
    })
  }, [])

  if (error) {
    return <Typography>Error: {error}</Typography>
  }

  if (!data) {
    return <Typography>Loading</Typography>
  }

  return (
    <>
      <Dmr status={dmrStatus} />
      <Logs ref={logsRef} logs={data} last={20} />
      {/* <Typography>Logs: {JSON.stringify(data)}</Typography> */}
      </>
  );
};

export default Homepage;
