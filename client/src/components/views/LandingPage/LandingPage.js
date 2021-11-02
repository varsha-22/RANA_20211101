import React, { useEffect, useState } from 'react'
import { Card, Avatar, Col, Typography, Row } from 'antd';
import axios from 'axios';
import { VIDEO_SERVER, TARGET_URL } from '../../Config';

const { Title } = Typography;
const { Meta } = Card;
function LandingPage() {

    const [Videos, setVideos] = useState([])
    // const [Categories, setCategories] = useState([])

    useEffect(() => {
        axios.get(`${VIDEO_SERVER}/getVideos`)
            .then(response => {
                if (response.data.success) {
                    setVideos(response.data.videos)
                } else {
                    alert('Failed to get Videos')
                }
            })
    }, [])

    // useEffect(() => {
    //     axios.get(`${CATEGORY_SERVER}/getAllCategories`)
    //         .then(response => {
    //             if (response.data.success) {
    //                 console.log("--categories--", response.data.categories)
    //                 this.Categories = response.data.categories
    //                 setCategories(response.data.categories)
    //             } else {
    //                 addCategories()
    //             }
    //         })
    // }, [])

    // const addCategories = () => {
    //     const categories = [
    //         { value: 'excercise', label: "Exercise" },
    //         { value: 'education', label: "Education" },
    //         { value: 'recipe', label: "Recipe" }
    //     ]

    //     axios.post(`${CATEGORY_SERVER}/addCategories`, categories)
    //         .then(response => {
    //             if (response.data.success) {
    //                 console.log('categories added Successfully')
    //             } else {
    //                 alert('Failed to add categories')
    //             }
    //         })
    // }



    const renderCards = Videos.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);

        return <Col lg={6} md={8} xs={24}>
            <div style={{ position: 'relative' }}>
                <a href={`/video/${video._id}`} >
                <div class="img__wrap">
                    <img style={{ width: '100%' }} alt="thumbnail" src={`${TARGET_URL}/${video.thumbnail}`} />
                    <p class="img__description"> {video.title} </p>
                </div>
                <div className=" duration"
                    style={{ bottom: 0, right:0, position: 'absolute', margin: '4px', 
                    color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8, 
                    padding: '2px 4px', borderRadius:'2px', letterSpacing:'0.5px', fontSize:'12px',
                    fontWeight:'500', lineHeight:'12px' }}>
                    <span>{minutes} : {seconds}</span>
                </div>
                </a>
            </div><br />
            <Meta
                avatar={
                    <Avatar src={video.thumbnail} />
                }
                title={video.title}
            />
            <span> <b> Category:</b> {video.category}</span>
        </Col>

    })



    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2} > Video List </Title>
            <hr />

            <Row gutter={16}>
                {renderCards}
            </Row>
        </div>
    )
}

export default LandingPage
