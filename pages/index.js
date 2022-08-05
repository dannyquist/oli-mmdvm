import useSWR from 'swr'
import {useRef, useEffect, useState} from 'react'
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import { Typography } from '@mui/material';
import Tgif from "@components/Tgif"
import Dmr from "@components/Dmr"
import Logs from "@components/Logs"
import Box from "@mui/material/Box"
import io from 'socket.io-client'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const Homepage = () => {
  const {data, error} = useSWR('/api/logs?mode=json', fetcher)
  const [dmrStatus, setDmrStatus] = useState({})
  const [socket, setSocket] = useState(null)
  let configOk = false

  useEffect(() => {
    async function fetchData() {
      await fetch('/api/socket')
    }

    if (!configOk)
      return

    fetchData()
    if (socket === null) {
      setSocket(io())
    }

    if (socket) {
      socket.on('connect', () => {
        console.log("Socket connected")
      })

      socket.on('dmr-status', msg => {
        console.log("dmr-status", msg)
        switch(msg.type) {
          case 'start':
          case 'rf-end':
          case 'transmit':
          case 'network-end':
              setDmrStatus({...msg})
            break
          default:
            console.log("unhandled message:", msg)
        }
      })

      socket.on('log', msg => {
        // console.log("log received", msg)
      })
    }
  }, [socket])

  if (error) {
    return <Typography>Error: {error}</Typography>
  }

  if (!data) {
    return <Typography>Loading</Typography>
  }

  return (
    <>
      <Dmr status={dmrStatus} />
      {/* <Logs logs={data} last={20} /> */}
      {/* <Typography>Logs: {JSON.stringify(data)}</Typography> */}
      </>
  );
};

export default Homepage;
