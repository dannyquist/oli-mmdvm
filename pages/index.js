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
  const router = useRouter()
  const {data, error} = useSWR('/api/mmdvm?mode=json', fetcher)
  
  if (error) {
    return <Typography>Error communicating with the server. Is it up?</Typography>
  }

  if (!data) {
    return <Typography>Loading...</Typography>
  }

  console.log(data.config)

  if (data.status === "not configured") {
    router.push("/wizard?noob=1")
  } else {
    router.push("/dmr")
  }

  return <Typography>{JSON.stringify(data)}</Typography>

};

export default Homepage;
