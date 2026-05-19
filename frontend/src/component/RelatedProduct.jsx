import React, { useContext, useEffect, useState } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Title from './Title'
import Card from './Card'

function RelatedProduct({category,subCategory,currentProductId }) {

    let {products} = useContext(shopDataContext)
    let [related,setRelated] = useState([])

    const relatedProducts = products
      .filter((item) => category === item.category)
      .filter((item) => subCategory === item.subCategory)
      .filter((item) => currentProductId !== item._id)
      .slice(0, 4)

    useEffect(() => {
      setRelated(relatedProducts)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, subCategory, currentProductId, products])
  return (
    <div className='my-[130px] md:my-[40px]  md:px-[60px] '>
        <div className='ml-[20px] lg:ml-[80px]'>
            <Title text1={'RELATED'} text2={'PRODUCTS'}/>
        </div>
        <div className='w-[100%]  mt-[30px] flex items-center justify-center flex-wrap gap-[50px]'>
            {
                related.map((item,index)=>(
                    <Card key={index} id={item._id} name={item.name } price={item.price} image={item.image1} />
                ))
            }
        </div>
      
    </div>
  )
}

export default RelatedProduct
