import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopDataContext } from '../Context/shopContext'
import { FaStar, FaStarHalfAlt, FaCheckCircle, FaMoneyBillWave, FaUndo } from 'react-icons/fa';
import RelatedProduct from '../component/RelatedProduct';
import Loading from '../component/Loading';

function ProductDetail() {
    let {productId} = useParams()
    let {products,currency ,addtoCart ,loading} = useContext(shopDataContext)
    let [productData,setProductData] = useState(false)
    const [image, setImage] = useState('')
    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [image4, setImage4] = useState('')
    const [size, setSize] = useState('')

   const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage1(item.image1)
        setImage2(item.image2)
        setImage3(item.image3)
        setImage4(item.image4)
        setImage(item.image1)
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductData()
  }, [productId, products])

  return productData ? (
    <div>
      <div className='min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] py-24 md:py-16'>
        <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
            <div className='flex flex-col sm:flex-row gap-6'>
              <div className='flex sm:flex-col gap-3 w-full sm:w-28 flex-shrink-0'>
                <div className='w-16 h-16 sm:w-full sm:h-auto sm:aspect-square bg-slate-300 border-2 border-transparent rounded-lg overflow-hidden cursor-pointer hover:border-[#3bcee8] transition-all' onClick={()=>setImage(image1)}>
                  <img src={image1} alt='' className='w-full h-full object-cover rounded-md'/>
                </div>
                <div className='w-16 h-16 sm:w-full sm:h-auto sm:aspect-square bg-slate-300 border-2 border-transparent rounded-lg overflow-hidden cursor-pointer hover:border-[#3bcee8] transition-all' onClick={()=>setImage(image2)}>
                  <img src={image2} alt='' className='w-full h-full object-cover rounded-md'/>
                </div>
                <div className='w-16 h-16 sm:w-full sm:h-auto sm:aspect-square bg-slate-300 border-2 border-transparent rounded-lg overflow-hidden cursor-pointer hover:border-[#3bcee8] transition-all' onClick={()=>setImage(image3)}>
                  <img src={image3} alt='' className='w-full h-full object-cover rounded-md'/>
                </div>
                <div className='w-16 h-16 sm:w-full sm:h-auto sm:aspect-square bg-slate-300 border-2 border-transparent rounded-lg overflow-hidden cursor-pointer hover:border-[#3bcee8] transition-all' onClick={()=>setImage(image4)}>
                  <img src={image4} alt='' className='w-full h-full object-cover rounded-md'/>
                </div>
              </div>
              <div className='flex-1 aspect-square lg:aspect-[4/5] border border-[#80808049] rounded-xl overflow-hidden bg-slate-300'>
                <img src={image} alt='' className='w-full h-full object-cover' />
              </div>
            </div>

            <div className='flex flex-col gap-6'>
              <div>
                <h1 className='text-3xl md:text-4xl font-semibold text-[aliceblue] uppercase'>{productData.name}</h1>
                <div className='flex items-center gap-1 mt-3'>
                  <FaStar className='text-xl fill-[#FFD700]' /><FaStar className='text-xl fill-[#FFD700]' /><FaStar className='text-xl fill-[#FFD700]' /><FaStar className='text-xl fill-[#FFD700]' /><FaStarHalfAlt className='text-xl fill-[#FFD700]' />
                  <p className='text-lg font-semibold pl-2 text-white'>(124)</p>
                </div>
                <p className='text-2xl md:text-3xl font-semibold text-white mt-2'>{currency} {productData.price}</p>
              </div>

              <div className='flex flex-col gap-3'>
                <p className='text-xl font-semibold text-white'>Select Size</p>
                <div className='flex flex-wrap gap-3'>
                  {productData.sizes.map((item, index) => (
                    <button key={index} className={`border-2 py-2 px-5 bg-slate-300 rounded-lg text-lg font-medium transition-all ${item === size ? 'bg-black text-[#2f97f1] border-[#3bcee8]' : 'hover:border-[#3bcee8]'}`} onClick={() => setSize(item)}>{item}</button>
                  ))}
                </div>
                <button className='text-base active:bg-slate-500 cursor-pointer bg-[#495b61c9] py-3 px-8 rounded-xl mt-4 border border-[#80808049] text-white shadow-md hover:bg-[#495b61] transition-all w-fit' onClick={()=>addtoCart(productData._id , size)}>
                  {loading ? <Loading/> : 'Add to Cart'}
                </button>
              </div>

              <div className='w-full h-px bg-slate-700'></div>

              <div className='flex flex-col gap-4 bg-[#1a1a2e]/80 p-6 rounded-xl border border-[#80808049]'>
                <p className='text-xl font-semibold text-white'>Product Features</p>
                <div className='flex flex-col gap-3'>
                  <div className='flex items-center gap-3 text-white'><FaCheckCircle className='text-xl text-green-500' /><span>100% Original Product</span></div>
                  <div className='flex items-center gap-3 text-white'><FaMoneyBillWave className='text-xl text-blue-500' /><span>Cash on Delivery Available</span></div>
                  <div className='flex items-center gap-3 text-white'><FaUndo className='text-xl text-orange-500' /><span>Easy Return and Exchange Policy within 7 Days</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full min-h-[70vh] bg-gradient-to-l from-[#141414] to-[#0c2025] pt-8 pb-16'>
        <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex gap-4 mb-8'>
            <p className='border px-6 py-3 text-sm text-white bg-[#1a1a2e]/80 rounded-lg'>Description</p>
            <p className='border px-6 py-3 text-sm text-white bg-[#1a1a2e]/80 rounded-lg'>Reviews (124)</p>
          </div>
          <div className='bg-[#3336397c] border text-white text-base md:text-lg p-6 md:p-8 rounded-xl mb-12'>
            <p>Upgrade your wardrobe with this stylish slim-fit cotton shirt, available now on OneCart. Crafted from breathable, high-quality fabric, it offers all-day comfort and effortless style. Easy to maintain and perfect for any setting, this shirt is a must-have essential for those who value both fashion and function.</p>
          </div>
          <RelatedProduct category={productData.category} subCategory={productData.subCategory} currentProductId={productData._id}/>
        </div>
      </div>
    </div>
  ) : <div className='opacity-0'></div>
}

export default ProductDetail




