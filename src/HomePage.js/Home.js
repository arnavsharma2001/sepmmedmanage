import React from 'react'
import Header from './HomePageComponent/Header/Header'
import PageContent from './HomePageComponent/pageContent/PageContent'
import './Home.css'

function Home() {
    return (
        <div className="home">
            <Header />
            <PageContent />
        </div>
    )
}

export default Home
