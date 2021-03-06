import React, { useState, useEffect } from 'react'
import PostCreate from '../components/PostCreate'

export default function PostListPage() {
    const [postList, setPostList] = useState(null)

    useEffect(() => {
        fetchData()
    }, [])

    function fetchData() {
        const url = "https://lab.willandskill.eu/api/v1/forum/posts/"
        const token = localStorage.getItem("webb21-lesson5")
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        fetch(url, {
            headers: headers
        })
            .then(res => res.json())
            .then(data => setPostList(data.results))
    }

    return (
        <div>
            Post List
            <PostCreate onSuccess={fetchData} />
            <button onClick={fetchData}>Refresh</button>
            {postList && postList.map((item, index) => {
                return (
                    <p key={index}>{item.content} @ {item.title}</p>
                )
            })}
        </div>
    )
}