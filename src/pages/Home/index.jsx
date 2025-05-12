import React from 'react'
import {
    ByDressSection,
    MainSection,
    NewArrivalsSection,
    TopSellingSection
} from './components'
import { useCategories } from '../../hooks'

const HomePage = () => {

    const { data:categories, isLoading:categoryIsLoading } = useCategories()

    console.log(categories);


    return (
        <div>
            <MainSection />
            <NewArrivalsSection />
            <TopSellingSection />
            <ByDressSection />
        </div>
    )
}

export default HomePage