import { React, useEffect, Component } from 'react';

const fetcher = (...args) => fetch(...args).then((res) => res.json())


export default class Tgif extends Component {
    constructor(props) {
        super(props)
        console.log("constructor")
    }

    componentDidMount() {
        console.log("componentDidMount")
    }

    render() {
        return <>TGIF</>
    }
}

