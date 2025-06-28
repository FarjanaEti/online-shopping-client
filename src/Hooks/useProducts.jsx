
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';


const useProducts= () => {
  const axiosPublic = useAxiosPublic();

  const { data: product = [], isLoading: loading, refetch } = useQuery({
    queryKey: ['product'],
    queryFn: async () => {
      const res = await axiosPublic.get('/products');
      return res.data;
    },
  });

  return [product, loading, refetch];
};

export default useProducts;
