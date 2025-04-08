import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router-dom';
import instance from '../../../../configs/axios';



const ProductDetail = () => {

  const { id } = useParams();
  const { data: Products, isLoading, isError } = useQuery({
    queryKey: ['products', id],
    queryFn: async () => {
      const response = await instance.get(`/products/${id}`);
      return response.data;
    },
  })

  const { data: Categories } = useQuery({
    queryKey: ['categories', id],
    queryFn: async () => {
      const response = await instance.get(`/categories/${id}`)
      return response.data;
    }
  })

  console.log(Products);
  console.log(Categories);

  if(isLoading) return <div>Loading ...</div>
  if(isError) return <div>Error ...</div>


  return (
    <div>ProductDetail</div>
  )
}

export default ProductDetail