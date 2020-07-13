import React, { useState, useEffect } from "react";
import { useSelector, useDispatch} from 'react-redux';
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import * as qs from 'query-string'

import DraggableContainer from '../components/draggable/draggableContainer';
import Navbar from '../components/navbar';
import WebRTC from '../webrtc';
import Screen from '../components/screen';
import YoutubeUpload from '../components/youtubeupload';
import ImageUpload from '../components/imageupload';

import img_small from '../images/map-small@2x.0c2a372b.png';
import img_big from '../images/map-big@2x.44a3f15c.png';

import './index.css';

const Conference = React.memo(props => {
    useEffect(()=>{
        console.log('useEffect -------------')
        WebRTC.getInstance().startConference(dispatch, null, query.space, query.uname);
    },[])
    
    const dispatch = useDispatch()
    const query = qs.parse(props.location.search);
    const users = useSelector(state=>state.users);
    // const bgMoveObj = useSelector(state=>state.screens.bgMoving);
    const videoObj = useSelector(state=>state.screens.videos);
    const imageObj = useSelector(state=>state.screens.images);
    console.log(users)
    

    // const [wheelX, setWheelX] = useState(-1000)
    // const [wheelY, setWheelY] = useState(-1000)
    // const [wheelZ, setWheelZ] = useState(-1000)
    // const [curScale, setCurScale] = useState(1)
    // const [userClose, setUserClose] = useState(false);

    // const [wheelX, setWheelX] = useState(-1000)
    // const [wheelY, setWheelY] = useState(-1000)
    // const [wheelZ, setWheelZ] = useState(-1000)
    // const [curScale, setCurScale] = useState(1)
    const [userClose, setUserClose] = useState(false);
    const [wheelChange, setWheelChange] = useState(1);

    // const handleWheel = (event) => {
    //     var temp
    //     if (event.previousScale < event.scale)
    //         temp = 2
    //     else
    //         temp = -2

    //     if (event.scale === event.options.maxScale || event.scale === event.options.minScale)
    //         temp = 0

    //     setCurScale(event.scale)
    //     setWheelX(wheelX + event.scale * temp)
    //     setWheelY(wheelY + event.scale * temp)
    //     setWheelZ(wheelZ + event.scale * temp)
    // }
    // const handlePanning = (event) => {
    //     event.options.disabled = bgMoveObj.bgMoving
    // }
    
    const handleSetUserClose = (value) => {
        setUserClose(value)
    }
    const handleWheelChangeValue = (value) => {
        setWheelChange(value)
    }
    return (
    <div data-v-12a888fb="" className="space">
        <Navbar onSetUserClose={handleSetUserClose} videoObj={videoObj} imageObj={imageObj} query={query} /> 
        <div id='foreground_div' style={{position: 'relative', overflow: 'hidden', backgroundImage: `url(${img_small})`, width:'100%', height: '100%'}}>
            <DraggableContainer id='background_div' width={3000} height={3000} isZoom={true} background={img_big}
                onWheelChange={handleWheelChangeValue}
            >
                {
                    users.map((user) => <Screen key={user.id} cur={wheelChange} user={user} />)
                }
                {
                    videoObj.map((video) => <YoutubeUpload key={video.name} video={video} cur={wheelChange} userClose={userClose} room={query.space} />)
                }
                {
                    imageObj.map((image) => <ImageUpload key={image.value} image={image} cur={wheelChange} userClose={userClose} room={query.space} />)
                }
            </DraggableContainer>
        </div>
    // </div>
    );
})

export default Conference
