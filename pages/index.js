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
  return <>Boink</>
};

export default Homepage;
